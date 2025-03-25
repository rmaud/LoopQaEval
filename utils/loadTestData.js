const fs = require('fs');
const path = require('path');
require('dotenv').config();

function loadTestData() {
    const testDataPath = process.env.TEST_DATA_PATH;
    if (!testDataPath) {
        throw new Error('TEST_DATA_PATH environment variable is not set.');
    }
    const fullPath = path.resolve(__dirname, '../', testDataPath);
    let fileData = {};
    if (fs.existsSync(fullPath)) {
        fileData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    } else {
        console.warn(`Test data file not found: ${fullPath}`);
    }
    return {
        ...fileData,
        adminUsername: process.env.ADMIN_USERNAME, // Make sure it matches your .env
        adminPassword: process.env.ADMIN_PASSWORD
    };
}
module.exports = { loadTestData };