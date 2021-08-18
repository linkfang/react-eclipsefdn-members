package org.eclipsefoundation.react.helper;

import java.util.Optional;

import org.eclipsefoundation.react.exception.UnsupportedImageFormatException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
class ImageFileHelperTest {
    private static final String SEPARATOR = "-";

    @Test
    void sanitizeFileName_lowerCase() {
        String testString = "WOWWHATATEST";
        Assertions.assertEquals(testString.toLowerCase(),
                ImageFileHelper.sanitizeFileName(testString, Optional.empty()));

        String format = "SomeFormat";
        Assertions.assertEquals(testString.toLowerCase() + SEPARATOR + format.toLowerCase(),
                ImageFileHelper.sanitizeFileName(testString, Optional.of(format)));
    }

    @Test
    void sanitizeFileName_separator() {
        String testString = "wowwhatatest";
        String format = "someformat";
        Assertions.assertEquals(testString + SEPARATOR + format,
                ImageFileHelper.sanitizeFileName(testString, Optional.of(format)));
    }

    @Test
    void sanitizeFileName_specialCharactersReplaced() {
        String testString = "wow@what;a:test";
        // build rather than type it so we can use variable separator for easier maint
        StringBuilder sb = new StringBuilder();
        sb.append("wow").append(SEPARATOR);
        sb.append("what").append(SEPARATOR);
        sb.append("a").append(SEPARATOR);
        sb.append("test");
        Assertions.assertEquals(sb.toString(), ImageFileHelper.sanitizeFileName(testString, Optional.empty()));
    }

    @Test
    void sanitizeFileName_specialCharactersReplaced_format() {
        String testString = "wow@what;a:test";
        String format = "some@format";
        // build rather than type it so we can use variable separator for easier maint
        StringBuilder sb = new StringBuilder();
        sb.append("wow").append(SEPARATOR);
        sb.append("what").append(SEPARATOR);
        sb.append("a").append(SEPARATOR);
        sb.append("test").append(SEPARATOR);
        sb.append("some").append(SEPARATOR);
        sb.append("format");
        Assertions.assertEquals(sb.toString(), ImageFileHelper.sanitizeFileName(testString, Optional.of(format)));
    }

    @Test
    void sanitizeFileName_specialCharactersReplaced_trimLeadingTrailing() {
        String testString = "@wow@test!";
        String format = "@some@format!";
        // build rather than type it so we can use variable separator for easier maint
        StringBuilder sb = new StringBuilder();
        sb.append("wow").append(SEPARATOR);
        sb.append("test").append(SEPARATOR);
        sb.append("some").append(SEPARATOR);
        sb.append("format");
        Assertions.assertEquals(sb.toString(), ImageFileHelper.sanitizeFileName(testString, Optional.of(format)));
    }

    @Test
    void convertMimeType_gif() {
        Assertions.assertEquals(".gif", ImageFileHelper.convertMimeType("image/gif"));
    }

    @Test
    void convertMimeType_png() {
        Assertions.assertEquals(".png", ImageFileHelper.convertMimeType("image/png"));
        Assertions.assertEquals(".png", ImageFileHelper.convertMimeType("image/x-png"));
    }

    @Test
    void convertMimeType_bmp() {
        Assertions.assertEquals(".bmp", ImageFileHelper.convertMimeType("image/bmp"));
    }

    @Test
    void convertMimeType_jpg() {
        Assertions.assertEquals(".jpg", ImageFileHelper.convertMimeType("image/jpeg"));
        Assertions.assertEquals(".jpg", ImageFileHelper.convertMimeType("image/pjpeg"));
    }

    @Test
    void convertMimeType_default() {
        Assertions.assertThrows(UnsupportedImageFormatException.class,
                () -> ImageFileHelper.convertMimeType("image/unknown-type"));
    }
}
