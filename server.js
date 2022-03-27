'use strict';
const app = require('./app');
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT} 😎🤟`);
});
