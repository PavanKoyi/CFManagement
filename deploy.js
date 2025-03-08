const ghpages = require('gh-pages');
const path = require('path');

const options = {
    branch: 'feature/gh-pages',
    dotfiles: true,
    message: 'Deploy to GitHub pages',
    nojekyll: true,
    history: false,
    repo: 'https://github.com/PavanKoyi/CFManagement.git'
};

const callback = err => {
    if (err) {
        console.error('Deployment error:', err);
        process.exit(1);
    } else {
        console.log('Deployed successfully!');
    }
};

const deployPath = path.resolve(__dirname, 'dist/cfm/browser');
console.log('Deploying from:', deployPath);
ghpages.publish(deployPath, options, callback);
