/**
 * Simulates an API call with a mock delay.
 * @param {Object} data - The validated form data to submit
 * @returns {Promise<Object>} Resolves with the same data after 1500ms
 */
export const mockSubmit = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1500);
    });
};
