const fs = require('fs');
const path = require('path');

// Paths
const sourceIndexPath = path.join(__dirname, 'dist', 'cfm', 'index.html');
const browserIndexPath = path.join(__dirname, 'dist', 'cfm', 'browser', 'index.html');

// Copy the file
try {
    // Check if browser/index.html exists
    if (fs.existsSync(browserIndexPath)) {
        // Create directory if it doesn't exist
        const dir = path.dirname(sourceIndexPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.copyFileSync(browserIndexPath, sourceIndexPath);
        console.log('Successfully copied index.html from browser to root');
    } else {
        // If browser/index.html doesn't exist, check if index.html already exists in root
        if (fs.existsSync(sourceIndexPath)) {
            console.log('index.html already exists in root directory');
        } else {
            console.error('Could not find index.html in expected locations');
            process.exit(1);
        }
    }
} catch (err) {
    console.error('Error handling index.html:', err);
    process.exit(1);
}
