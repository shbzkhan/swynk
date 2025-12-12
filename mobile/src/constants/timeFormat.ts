
export const timeFormat = (isoDateString: string, locale: string = 'en-IN'): string => {

    const dateObject = new Date(isoDateString);
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        hourCycle: 'h12',
    };
    return dateObject.toLocaleTimeString(locale, options).toUpperCase();
};
