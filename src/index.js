require("dotenv").config()
const server = require('./app');
const { conn } = require('./db');
const port = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`Server raised in port ${port}`);
  });
});