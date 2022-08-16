const serverAddress = 'http://localhost:8888';

const formatItem = ({
  id,
  title,
  description,
  price,
  img,
  category,
  categoryId,
}) => ({
  id,
  title,
  description,
  price,
  img,
  category: category.title,
  categoryId,
});

const fetchAll = async () => {
  const response = await fetch(`${serverAddress}/items?_expand=category`);
  const items = await response.json();

  return items.map(formatItem);
};

const create = async (itemProps) => {
  const response = await fetch('http://localhost:8888/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemProps),
  });

  const item = await response.json();

  return item;
};

const remove = async (id) => {
  await fetch(`http://localhost:8888/items/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const fetchCategories = async () => {
  const response = await fetch(`${serverAddress}/categories`);
  const categories = await response.json();

  return categories;
};

const update = async (id, itemProps) => {
  const response = await fetch(`${serverAddress}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemProps),
  });

  const item = await response.json();

  return item;
};

const ItemService = {
  fetchAll,
  create,
  remove,
  fetchCategories,
  update,
};

export default ItemService;
