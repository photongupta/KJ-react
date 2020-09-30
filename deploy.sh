rm -rf backend

echo "cloning backend";
git clone https://github.com/photongupta/KW-react.git backend 2> /dev/null
cd backend
echo 'installing'
npm install 2> /dev/null
npm test
cd ..

rm -rf frontend
echo 'cloning frontend'
git clone https://github.com/photongupta/Knowledge-Junction.git frontend 2> /dev/null
cd frontend
echo 'installing'
npm install 2> /dev/null
npm test
echo 'creating build'
npm run build 2> /dev/null
mv ./build/* ../backend/public/
cd ..

mv backend/* ./

rm -rf frontend
rm -rf backend