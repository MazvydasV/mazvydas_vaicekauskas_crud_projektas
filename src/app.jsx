import * as React from 'react';
import { Box, Grid, Modal } from '@mui/material';
import ItemService from 'services/item-service';
import { ItemCard, Header, ItemForm } from './components';

const App = () => {
  const [items, setItems] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [itemBeingEdited, setItemBeingEdited] = React.useState(null);

  const closeModal = () => {
    setModalOpen(false);
    setItemBeingEdited(null);
  };

  const fetchAllItems = async () => {
    const fetchedItems = await ItemService.fetchAll();
    setItems(fetchedItems);
  };

  const createItem = async (itemProps) => {
    await ItemService.create(itemProps);
    await fetchAllItems();
    closeModal();
  };

  const editItem = (id) => {
    const foundItem = items.find((c) => c.id === id);
    setItemBeingEdited(foundItem);
    setModalOpen(true);
  };

  const updateItem = async (itemProps) => {
    await ItemService.update(itemBeingEdited.id, itemProps);
    await fetchAllItems();
    closeModal();
  };

  const removeItem = async (id) => {
    await ItemService.remove(id);
    fetchAllItems();
  };

  React.useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <Box sx={{
      gap: { xs: 4, xxl: 0 },
      pt: 2,
      px: 2,
    }}
    >
      <Header openModal={() => setModalOpen(true)} />
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        >
          <ItemForm
            onSubmit={itemBeingEdited ? updateItem : createItem}
            formTitle={itemBeingEdited ? 'Įrenginio redagavimas' : 'Naujo įrenginio sukūrimas'}
            submitText={itemBeingEdited ? 'Atnaujinti' : 'Sukurti'}
            color={itemBeingEdited ? 'warning' : 'success'}
            initValues={itemBeingEdited}
          />
        </Box>
      </Modal>

      <Grid container spacing={2}>
        {items.map(({
          id,
          title,
          description,
          category,
          price,
          img,
        }) => (
          <Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <ItemCard
              title={title}
              description={description}
              img={img}
              category={category}
              price={price}
              onDelete={() => removeItem(id)}
              onEdit={() => editItem(id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;
