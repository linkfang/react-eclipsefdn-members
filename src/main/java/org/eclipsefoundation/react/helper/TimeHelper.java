package org.eclipsefoundation.react.helper;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;

/**
 * Centralize the retrieval of date/time objects to synchronize usage of timezones across potentially varied
 * environments.
 * 
 * @author Martin Lowe
 *
 */
public final class TimeHelper {

    /**
     * Return the current instant as a datetime object zoned to UTC.
     * 
     * @return the current localdatetime in UTC
     */
    public static ZonedDateTime now() {
        return ZonedDateTime.now(ZoneOffset.UTC);
    }

    /**
     * Gets the current epoch milli according to UTC
     * 
     * @return the current epoch milli in UTC
     */
    public static long getMillis() {
        return now().toInstant().toEpochMilli();
    }

    /**
     * Returns the epoch milli of the time passed with UTC assumed.
     * 
     * @param time the time object to retrieve epoch millis from
     * @return the epoch millis of the passed time object in UTC
     */
    public static long getMillis(ZonedDateTime time) {
        return time.toInstant().toEpochMilli();
    }

    private TimeHelper() {
    }
}
