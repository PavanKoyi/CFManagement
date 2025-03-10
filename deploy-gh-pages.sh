#!/bin/bash

# Build the Docker image
docker build -t cfm-app .

# Create a temporary container
CONTAINER_ID=$(docker create cfm-app)

# Copy the built files from the container
rm -rf ./dist
mkdir -p ./dist
docker cp $CONTAINER_ID:/usr/share/nginx/html ./dist/cfm

# Remove the temporary container
docker rm $CONTAINER_ID

# Create deploy.js for gh-pages deployment
cat > deploy.js << 'EOF'
const ghpages = require('gh-pages');
const path = require('path');

const options = {
    branch: 'gh-pages',
    dotfiles: true,
    message: 'Deploy to GitHub pages [skip ci]',
    nojekyll: true,
    history: false,
    repo: `https://${process.env.GITHUB_TOKEN}@github.com/PavanKoyi/CFManagement.git`,
    silent: false,
    dest: '.',
    user: {
        name: 'GitHub Actions',
        email: 'actions@github.com'
    }
};

const deployPath = path.resolve(__dirname, 'dist/cfm');
console.log('Deploying from:', deployPath);

// Create .nojekyll file
require('fs').writeFileSync(path.join(deployPath, '.nojekyll'), '');

// Create a simple index.html if it doesn't exist
if (!require('fs').existsSync(path.join(deployPath, 'index.html'))) {
    require('fs').writeFileSync(path.join(deployPath, 'index.html'), '<html><body>Loading...</body></html>');
}

ghpages.publish(deployPath, options, function(err) {
    if (err) {
        console.error('Deployment error:', err);
        process.exit(1);
    } else {
        console.log('Deployed successfully!');
    }
});
EOF

# Install gh-pages package if not already installed
npm install gh-pages --save-dev

# Set up Git credentials if running locally
if [ -z "$GITHUB_ACTIONS" ]; then
    git config --global user.email "your-email@example.com"
    git config --global user.name "Your Name"
fi

# Run the deployment
node deploy.js
