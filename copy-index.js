const fs = require('fs');
const path = require('path');

// Paths
const browserIndexPath = path.join(__dirname, 'dist', 'cfm', 'browser', 'index.csr.html');
const rootIndexPath = path.join(__dirname, 'dist', 'cfm', 'index.html');

// Copy the file
try {
    // Create directory if it doesn't exist
    const dir = path.dirname(rootIndexPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Copy the file
    fs.copyFileSync(browserIndexPath, rootIndexPath);
    console.log('Successfully copied index.html to dist/cfm/');
} catch (err) {
    console.error('Error copying index.html:', err);
    process.exit(1);
}
