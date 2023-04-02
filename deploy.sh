yarn build

cd dist/

git init 
git add -A
git commit -m "deploy"
git push -f https://github.com/chicongpham235/signal-demo.git master:gh-pages


cd ../
rm -rf dist