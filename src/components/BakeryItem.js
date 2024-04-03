import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import NutritionImage from '../assets/nutrition2.png'

const BakeryItem = ({ name, description, price, rating, numReviews, ingredients, allergens, image, addToCart }) => {
  const [openInfo, setOpenInfo] = useState(false);

  const handleInfoOpen = () => {
    setOpenInfo(true);
  };

  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>{name}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Typography variant="h6" component="div" sx={{ fontSize: '1.25rem' }}>
          👍 {rating}% ({numReviews} reviews)
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', padding: '0 16px 8px 16px' }}>
        <Typography variant="h6">${price}</Typography>
        <div>
          <Button sx={{ border: 1}} size="small" onClick={() => addToCart(name, price)}>Add to Cart</Button>
          <IconButton size="small" onClick={handleInfoOpen}>
            <InfoOutlinedIcon />
          </IconButton>
        </div>
      </CardActions>

      <Dialog
        open={openInfo}
        onClose={handleInfoClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title"><b>{name}</b></DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            <b>Allergens:</b> {allergens}
          </DialogContentText>
          <DialogContentText id="dialog-description">
            <b>Ingredients:</b> {ingredients}
          </DialogContentText>
          {/* Add the image here */}
          <CardMedia
            component="img"
            image={NutritionImage}
            alt={`Image of ${name}`}
            sx={{ 
              maxWidth: '70%',
              display:'block',
              margin:'auto',
              paddingTop:'20px'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInfoClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BakeryItem;
