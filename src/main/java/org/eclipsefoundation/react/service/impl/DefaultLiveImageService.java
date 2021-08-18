package org.eclipsefoundation.react.service.impl;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.DirectoryStream.Filter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributeView;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;
import java.util.function.Supplier;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.ServerErrorException;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.react.helper.ImageFileHelper;
import org.eclipsefoundation.react.service.LiveImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.runtime.Startup;
import io.quarkus.runtime.annotations.ConvertWith;
import io.quarkus.runtime.configuration.DurationConverter;

/**
 * Default implementation of the live image service. Writes images to a file system location then provides a web-mounted
 * path for external consumption.
 * 
 * @author Martin Lowe
 *
 */
@Startup
@ApplicationScoped
public class DefaultLiveImageService implements LiveImageService {
    public static final Logger LOGGER = LoggerFactory.getLogger(DefaultLiveImageService.class);

    @ConfigProperty(name = "eclipse.image-store.file-path")
    String fileStoreLocation;
    @ConfigProperty(name = "eclipse.image-store.web-root")
    String webRoot;
    @ConvertWith(DurationConverter.class)
    @ConfigProperty(name = "eclipse.image-store.max-age", defaultValue = "P60d")
    Duration maxAge;
    // default to 1mb in size, but allow for override
    @ConfigProperty(name = "eclipse.image-store.max-size-in-bytes", defaultValue = "1000000")
    long maxSize;

    // local copy of image store location
    private Path imageStoreRoot;

    @PostConstruct
    public void start() throws IOException {
        // get a path object using config prop
        this.imageStoreRoot = Path.of(fileStoreLocation);

        // store the exists boolean to save some ops
        boolean storeExists = Files.exists(imageStoreRoot);
        // check state of path target (is it a file, does it exist, etc)
        if (!Files.exists(imageStoreRoot)) {
            // dir does not exist (just create it)
            Files.createDirectory(imageStoreRoot);
        } else if (storeExists && !Files.isDirectory(imageStoreRoot)) {
            // dir exists but isn't a dir
            throw new IllegalArgumentException(
                    "Image service is misconfigured, image root cannot be a non-directory file");
        } else if (storeExists && !Files.isWritable(imageStoreRoot)) {
            // dir exists but is not writable
            throw new IllegalStateException(
                    "Image service cannot write data to the filesystem, please check permissions of dir at "
                            + imageStoreRoot.toAbsolutePath());
        } else {
            LOGGER.info("The live image service is live and mounted on path '{}'", fileStoreLocation);
        }
    }

    @Override
    public String retrieveImageUrl(Supplier<byte[]> imageBytes, String fileName, String mimeType,
            Optional<String> format) {
        // get File name, path, and attributes
        String fullFileName = ImageFileHelper.getFileNameWithExtension(fileName, format, mimeType);
        // gets an absolute filepath for file name from the store root
        Path absFilePath = imageStoreRoot.resolve(fullFileName);
        BasicFileAttributeView attrView = Files.getFileAttributeView(absFilePath, BasicFileAttributeView.class);
        // check if we should rebuild the image file (age or does not exist)
        try {
            if (!Files.exists(absFilePath) || (Files.exists(absFilePath)
                    && getFileMaxAge(attrView).minus(maxAge).isBefore(LocalDateTime.now()))) {
                return writeImage(imageBytes, fileName, mimeType, format);
            }
        } catch (IOException e) {
            LOGGER.warn("Error while checking image presence for file '{}', may indicate broken file", fullFileName, e);
        }
        // return the path to the image
        return getWebUrl(absFilePath);
    }

    @Override
    public String writeImage(Supplier<byte[]> imageBytes, String fileName, String mimeType, Optional<String> format) {
        // get file metadata
        Path p = imageStoreRoot.resolve(ImageFileHelper.getFileNameWithExtension(fileName, format, mimeType));
        BasicFileAttributeView attrView = Files.getFileAttributeView(p, BasicFileAttributeView.class);
        try {
            // for images bigger than the current max that don't already exist, refuse to write them
            byte[] bytes = imageBytes.get();
            if (bytes.length > maxSize
                    && !approximatelyMatch((long) bytes.length, attrView.readAttributes().size(), 1000)) {
                throw new BadRequestException("Passed image is larger than allowed size of '" + maxSize + "' bytes");
            }
            // write will create and overwrite file by default if it exists
            return getWebUrl(Files.write(p, bytes));
        } catch (IOException e) {
            throw new ServerErrorException("Could not write image for organization " + fileName,
                    Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), e);
        }
    }

    @Override
    public void removeImages(String fileName, Optional<String> format) {
        String santizedName = ImageFileHelper.sanitizeFileName(fileName, format);
        // for images whos file name starts with `<sanitized org name>.`, delete them
        try (DirectoryStream<Path> ds = Files.newDirectoryStream(imageStoreRoot, new Filter<>() {
            @Override
            public boolean accept(Path arg0) throws IOException {
                return arg0.getFileName().startsWith(santizedName + '.');
            }
        })) {
            ds.forEach(path -> {
                try {
                    Files.delete(path);
                } catch (IOException e) {
                    throw new ServerErrorException("Could not clean out old images for organization " + fileName,
                            Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), e);
                }
            });
        } catch (IOException e) {
            throw new ServerErrorException("Could not clean out old images for organization " + fileName,
                    Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), e);
        }
    }

    private boolean approximatelyMatch(long arg0, long arg1, int maxDiff) {
        return Math.abs(arg0 - arg1) < maxDiff;
    }

    private String getWebUrl(Path imagePath) {
        return webRoot + imagePath.getFileName();
    }

    private LocalDateTime getFileMaxAge(BasicFileAttributeView attrView) throws IOException {
        return LocalDateTime.ofInstant(attrView.readAttributes().creationTime().toInstant(), ZoneOffset.UTC);
    }

}
