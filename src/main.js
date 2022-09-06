const express = require('express');
const electronicItemsRouter = require('./routers/electronic-items-router');

const server = express();

server.use(express.json());
server.use('/electronic-items', electronicItemsRouter);

server.listen(8888, (err) => {
  if (err) {
    console.error('Serverio paleidimo klaida');
  }

  console.log('serveris veikia ant http://localhost:8888');
});
