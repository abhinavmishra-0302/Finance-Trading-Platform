const basePath = "https://finnhub.io/api/v1";

/**
 * Searches best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<Object[]>} Response array of best stock matches
 */
const searchSymbol = async (query) => {
    const url = `${basePath}/search?q=${query}&token=cnr7kdpr01qs2jr5l1tgcnr7kdpr01qs2jr5l1u0`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};

module.exports = searchSymbol