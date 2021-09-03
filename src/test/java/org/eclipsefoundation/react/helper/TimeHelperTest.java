package org.eclipsefoundation.react.helper;

import java.time.Duration;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

/**
 * Basic tests to assure proper function of TimeHelper.
 * 
 * @author Martin Lowe
 *
 */
@QuarkusTest
class TimeHelperTest {

    @Test
    void getMillis_currentMillis() {
        Assertions.assertEquals(TimeHelper.getMillis(), System.currentTimeMillis());
    }

    @Test
    void now_inUTC() {
        Assertions.assertEquals(ZoneOffset.UTC, TimeHelper.now().getOffset());
    }

    @Test
    void getMillisWithDate() {
        long millis = System.currentTimeMillis();
        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime nowOtherOffset = ZonedDateTime.now(ZoneOffset.ofHours(4));
        Assertions.assertEquals(millis, TimeHelper.getMillis(now));
        Assertions.assertEquals(millis, TimeHelper.getMillis(nowOtherOffset));
        nowOtherOffset = nowOtherOffset.plusHours(1);
        Assertions.assertEquals(millis + Duration.ofHours(1).toMillis(), TimeHelper.getMillis(nowOtherOffset));
    }
}
