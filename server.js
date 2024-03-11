const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './.env' });

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('DB Failed', err));

const port = process.env.PORT || 6001;

app.listen(port, () => {
  console.log(`Server Runnig on ${port}...`);
});
