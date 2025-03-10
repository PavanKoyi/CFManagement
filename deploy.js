const ghpages = require('gh-pages');
const path = require('path');

const options = {
    branch: 'gh-pages',
    dotfiles: true,
    message: 'Deploy to GitHub pages [skip ci]',
    nojekyll: true,
    history: false,
    repo: 'https://github.com/PavanKoyi/CFManagement.git',
    silent: false,
    dest: '.'
};

const deployPath = path.resolve(__dirname, 'dist/cfm');
console.log('Deploying from:', deployPath);

// Create .nojekyll file
require('fs').writeFileSync(path.join(deployPath, '.nojekyll'), '');

ghpages.publish(deployPath, options, function(err) {
    if (err) {
        console.error('Deployment error:', err);
        process.exit(1);
    } else {
        console.log('Deployed successfully!');
    }
});
