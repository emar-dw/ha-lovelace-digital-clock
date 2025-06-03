import {DateTimeFormatOptions} from 'luxon';
import {LocaleOptions} from 'luxon/src/datetime';

export default interface IDigitalClockConfig {
    interval?: number;
    timeFormat?: (LocaleOptions & DateTimeFormatOptions) | string;
    dateFormat?: (LocaleOptions & DateTimeFormatOptions) | string;
    timeZone?: string;
    locale?: string;
    firstLineFormat?: (LocaleOptions & DateTimeFormatOptions) | string;
    secondLineFormat?: (LocaleOptions & DateTimeFormatOptions) | string;
    // Add these:
    firstLineFontSize?: string;   // e.g. "2.8em", "32px"
    firstLineFontWeight?: string; // e.g. "bold", "400"
    secondLineFontSize?: string;
    secondLineFontWeight?: string;
}
