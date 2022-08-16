import * as React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Button,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Image from './image';
import TypographyLimited from './typography-limited';

const ItemCard = ({
  title,
  img,
  description,
  category,
  price,
  onDelete,
  onEdit,
}) => (
  <Card sx={{
    display: 'flex', flexDirection: 'column', height: '100%', position: 'relative',
  }}
  >
    <Box sx={{ position: 'relative', width: '100%', pt: '95%' }}>
      <Image src={img} sx={{ position: 'absolute', top: 0, left: 0 }} />
    </Box>

    <IconButton
      sx={{
        position: 'absolute',
        top: 15,
        right: 15,
        border: 1,
        borderColor: 'error.main',
        color: 'error.main',
      }}
      size="small"
      onClick={onDelete}
    >
      <ClearIcon />
    </IconButton>

    <CardContent sx={{ p: 2, flexGrow: 1 }}>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        <Typography variant="h5" component="div">{title}</Typography>
        <Typography variant="h6" component="div" color="primary.main">{`${price} €`}</Typography>
      </Box>
      <Typography variant="subtitle" component="div" sx={{ mb: 2 }}>{category}</Typography>
      <TypographyLimited variant="body2" color="text.secondary">{description}</TypographyLimited>
      <Box sx={{
        display: 'flex',
        justifyContent: 'right',
      }}
      >
        <Button variant="outlined" size="small" color="info" onClick={onEdit}>Redaguoti</Button>
      </Box>
    </CardContent>
  </Card>
);

export default ItemCard;
