echo "Switching to branch master"
git checkout master

echo "Building application..."
npm run build

echo "Deploying files to the server..."
scp -r build/* jmaci@173.249.25.176:/var/www/blockexplorer