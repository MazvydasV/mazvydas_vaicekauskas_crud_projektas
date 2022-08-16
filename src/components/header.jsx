import React from 'react';
import {
  Paper,
  Button,
  Typography,
} from '@mui/material';

const Header = ({ openModal }) => (
  <Paper sx={{ mb: 2, p: 2, bgcolor: 'common.white' }}>
    <Typography variant="h6" sx={{ mb: 1 }}>Šeimininko kampelis</Typography>
    <Button variant="contained" color="success" onClick={openModal}>Sukurti naują įrenginį</Button>
  </Paper>
);

export default Header;
