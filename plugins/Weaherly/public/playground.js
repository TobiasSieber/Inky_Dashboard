// Requires Luxon (make sure to load it if using in browser)
const { DateTime } = luxon;

function getLocalTimeFromUTC(utcSeconds, timeZone) {
    return DateTime
        .fromSeconds(utcSeconds, { zone: 'utc' })      // Parse as UTC
        .setZone(timeZone)                             // Convert to target time zone
        .toFormat('cccc, LLLL dd, h:mm a');            // e.g., "Friday, August 01, 3:22 PM"
}
const utc = 1754049720; // Example timestamp (Aug 1, 2025, 13:22 UTC)
const berlinTime = getLocalTimeFromUTC(utc, 'Europe/Berlin');
const nyTime = getLocalTimeFromUTC(utc, 'America/New_York');

console.log("Berlin:", berlinTime);  // ➜ "Friday, August 01, 3:22 PM"
console.log("New York:", nyTime);    // ➜ "Friday, August 01, 9:22 AM"
