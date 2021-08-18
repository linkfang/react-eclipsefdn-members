package org.eclipsefoundation.react.helper;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
class ImageFileHelperTest {
    private static final String SEPARATOR = "-";

    void sanitizeFileName_lowerCase() {
        String testString = "WOWWHATATEST";
        Assertions.assertEquals(testString.toLowerCase(),
                ImageFileHelper.sanitizeFileName(testString, Optional.empty()));

        String format = "SomeFormat";
        Assertions.assertEquals(testString.toLowerCase() + SEPARATOR + format.toLowerCase(),
                ImageFileHelper.sanitizeFileName(testString, Optional.of(format)));
    }

    void sanitizeFileName_separator() {
        String testString = "wowwhatatest";
        String format = "someformat";
        Assertions.assertEquals(testString + SEPARATOR + format,
                ImageFileHelper.sanitizeFileName(testString, Optional.of(format)));
    }

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
}
