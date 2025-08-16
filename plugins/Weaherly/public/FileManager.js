


// Client-side: only sends city, use_case, and days. Server uses API key.

export const SetDashBoardConfig = async function (Lat, Lng, apiKey,dashboardtitle) {
    try {

        const response = await fetch('http://localhost:30080/api/save-settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                latitude: Lat,
                longitude: Lng,
                apiKey: apiKey,
                dashboardtitle:dashboardtitle
            })
        });

        if (!response.ok) {
            throw new Error("Failed to save settings");
        }

        const result = await response.json();
        return result; // Return the response from the server if needed
    } catch (err) {
        console.error("Error saving dashboard config:", err);
    }
};
export const GetDashBoardConfig = async function () {
    try {
        const response = await fetch('/api/save-settings');

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMsg = errorData?.error || `Status code: ${response.status}`;
            throw new Error(`Failed to load dashboard config: ${errorMsg}`);
        }

        const config = await response.json();
        return config;
    } catch (err) {
        console.error("Error fetching dashboard config:", err);
        throw err;
    }
};




