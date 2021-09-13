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
        Assertions.assertTrue(approxMatch(TimeHelper.getMillis(), System.currentTimeMillis()));
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

    /**
     * Used to compensate for system lag between calls to get system time. This only allows for a miniscule difference
     * so it shouldn't invalidate any of the tests.
     * 
     * @param o1 first long value in comparison
     * @param o2 second long value in comparison
     * @return true if the numbers are within 3 of each other, false otherwise
     */
    private boolean approxMatch(long o1, long o2) {
        return Math.abs(o1 - o2) < 3;
    }
}
