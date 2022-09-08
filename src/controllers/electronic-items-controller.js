const { removeEmptyProps } = require('../helpers');
const ItemModel = require('../models/electronic-item-model');

const isValidItem = ({
  title, description, categoryId, img, price,
}) => title !== undefined && typeof title === 'string' && title !== ''
  && description !== undefined && typeof description === 'string' && description !== ''
  && categoryId !== undefined && typeof categoryId === 'string' && categoryId !== ''
  && img !== undefined && typeof img === 'string' && img !== ''
  && price !== undefined && typeof price === 'number' && price > 0;

const createItemNotFoundError = (itemId) => ({
  message: `Electronic item with id '${itemId}' was not found`,
  status: 404,
});

const createItemBadDataError = (dataObj) => ({
  message: `Electronic item data is invalid:\n${JSON.stringify(dataObj, null, 4)}`,
  status: 400,
});

const fetchAll = async (req, res) => {
  const itemDocuments = await ItemModel.find();

  res.status(200).json(itemDocuments);
};

const fetch = async (req, res) => {
  const itemId = req.params.id;

  try {
    const foundItem = await ItemModel.findById(itemId);
    if (foundItem === null) throw createItemNotFoundError(itemId);

    res.status(200).json(foundItem);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = async (req, res) => {
  const newItemData = req.body;

  try {
    if (!isValidItem(newItemData)) throw createItemBadDataError(newItemData);

    const newItem = await ItemModel.create(newItemData);

    res.status(201).json(newItem);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const replace = async (req, res) => {
  const itemId = req.params.id;
  const {
    title, description, categoryId, img, price,
  } = req.body;
  const newItemData = {
    title, description, categoryId, img, price,
  };

  try {
    if (!isValidItem(newItemData)) throw createItemBadDataError(newItemData);

    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      newItemData,
      { new: true, runValidators: true },
    );

    if (updatedItem === null) throw createItemNotFoundError(itemId);

    res.status(200).json(updatedItem);
  } catch (error) {
    const { status, message } = error;

    if (status && message) {
      res.status(status).json({ message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const update = async (req, res) => {
  const itemId = req.params.id;
  const {
    title, description, categoryId, img, price,
  } = req.body;
  const newItemData = removeEmptyProps({
    title, description, categoryId, img, price,
  });

  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      newItemData,
      { new: true },
    );

    if (updatedItem === null) throw createItemNotFoundError(itemId);

    res.status(200).json(updatedItem);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = async (req, res) => {
  const itemId = req.params.id;

  try {
    const deletedItem = await ItemModel.findByIdAndDelete(itemId);
    if (deletedItem === null) createItemNotFoundError(itemId);

    res.status(200).json(deletedItem);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
