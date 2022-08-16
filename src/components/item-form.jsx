import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
} from '@mui/material';
import ItemService from 'services/item-service';

const ItemForm = ({ onSubmit }) => {
  const [categories, setCategories] = React.useState([]);
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [img, setImg] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title: name,
      categoryId: category,
      price: Number(price),
      img,
      description,
    });
  };

  React.useEffect(() => {
    (async () => {
      const fetchedCategories = await ItemService.fetchCategories();
      setCategories(fetchedCategories);
    })();
  }, []);

  return (
    <Paper component="form" sx={{ p: 3 }} onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ textAlign: 'center', pb: 2 }}>Naujo įrenginio pridėjimas</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Pavadinimas"
          fullWidth
          variant="filled"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Kategorija"
          fullWidth
          select
          variant="filled"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map(({ id, title }) => (
            <MenuItem key={id} value={id}>{title}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Kaina €"
          type="number"
          fullWidth
          variant="filled"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField
          label="Nuotraukos kelias"
          fullWidth
          variant="filled"
          value={img}
          onChange={(event) => setImg(event.target.value)}
        />
        <TextField
          label="Aprašymas"
          fullWidth
          variant="filled"
          multiline
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
          >
            Sukurti
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ItemForm;
