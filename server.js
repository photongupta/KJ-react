const {app} = require('./src/app.js');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
