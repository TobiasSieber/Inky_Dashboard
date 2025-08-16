export const GetMoonSign = async function () {
    try {
        const response = await fetch('/api/moon-sign');
        if (!response.ok) throw new Error("Failed to fetch moon sign");

        const data = await response.json();
        console.log(`🌙 The Moon is in ${data.sign} at ${data.degrees}°`);
        return data.sign;
    } catch (err) {
        console.error("Moon sign error:", err);
    }
};

export const getLuckyColor =function (birthday, mode = 'daily') {
    const colors = [
        "Red", "Green", "Blue", "Yellow", "Purple",

        "Orange"
    ];

    const date = new Date();
    let timeFactor;

    switch (mode) {
        case 'daily':
            timeFactor = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            break;
        case 'weekly':
            const week = Math.ceil(date.getDate() / 7);
            timeFactor = `${date.getFullYear()}-${date.getMonth()}-W${week}`;
            break;
        case 'monthly':
            timeFactor = `${date.getFullYear()}-${date.getMonth()}`;
            break;
        default:
            timeFactor = '';
    }

    const seedString = birthday + '-' + timeFactor;

    // Hashing the string to a number
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
}
