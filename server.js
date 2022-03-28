'use strict';
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// read our envioremnt variables from the file and save them to Node eniroment variables

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT} 😎🤟`);
});
