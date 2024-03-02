
export function isDateLessThanCurrent(dateISO: string) {
    // Convert the ISO date to a Date object
    const date = new Date(dateISO);

    // Get the current date in UTC
    const currentDate = new Date();
    const currentUTCDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));

    // Compare the dates (ignoring time)
    return date < currentUTCDate;
}