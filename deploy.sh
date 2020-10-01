#! /bin/bash

rm -rf * .*

echo "cloning backend";
git clone https://github.com/photongupta/KJ-react.git backend 2> /dev/null
cd backend
echo 'installing'
npm install 2> /dev/null
npm test
cd ..

echo 'cloning frontend'
git clone https://github.com/photongupta/Knowledge-Junction.git frontend 2> /dev/null
cd frontend
echo 'installing'
npm install 2> /dev/null
npm test
echo 'creating build'
npm run build 2> /dev/null
mkdir -p ../public
mv ./build/* ../public/.
cd ..

mv backend/* backend/.* .

rm -rf frontend
rm -rf backend