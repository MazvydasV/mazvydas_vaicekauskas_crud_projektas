const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../controllers/electronic-items-controller');

const eletronicItemsRouter = Router();

eletronicItemsRouter.get('/', fetchAll);

eletronicItemsRouter.get('/:id', fetch);

eletronicItemsRouter.post('/', create);

eletronicItemsRouter.put('/:id', replace);

eletronicItemsRouter.patch('/:id', update);

eletronicItemsRouter.delete('/:id', remove);

module.exports = eletronicItemsRouter;
