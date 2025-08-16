


// Client-side: only sends city, use_case, and days. Server uses API key.

export const WeatherAPI_post = async function (use_case, days) {
    try {
        const params = new URLSearchParams({
            use_case,
            days: String(days)
        });

        const response = await fetch(`/api/weather?${params.toString()}`);

        if (!response.ok) {
            // Try to get error message from response
            const errorData = await response.json().catch(() => null);
            const errorMsg = errorData?.error || `Status code: ${response.status}`;
            throw new Error(`Wetterdaten nicht gefunden: ${errorMsg}`);
        }

        const data = await response.json();
        return data; // Either forecast or current weather data
    } catch (err) {
        console.error("Fehler beim Abrufen der Wetterdaten:", err);
        throw err;  // rethrow so calling code knows
    }
};




