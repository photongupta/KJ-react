git clone https://github.com/photongupta/Knowledge-Junction.git Knowledge-Junction
cd Knowledge-Junction
npm install 2> /dev/null
npm test
npm run build 2> /dev/null
cp -r ./build/* ../public
cd ..
npm install 2> /dev/null
rm -rf Knowledge-Junction
