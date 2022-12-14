const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });
const app = require('./app');

const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true
  }).then(() => console.log('DB connection successful!'));

  
const port = process.env.PORT || 8080;
  app.listen(port, () => {
  console.log(`App running on http://localhost:${port}...`);
});
