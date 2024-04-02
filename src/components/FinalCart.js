import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/material';

const Cart = ({ cart, total, resetCart, addToCart, removeFromCart }) => {
  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Your Cart</Typography>
      <List>
        {Object.keys(cart).map((itemName, index) => (
          <ListItem 
            key={index}
            secondaryAction={
              <Box>
                <IconButton edge="end" aria-label="remove" onClick={() => removeFromCart(itemName, cart[itemName].price)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton edge="end" aria-label="add" onClick={() => addToCart(itemName, cart[itemName].price)}>
                  <AddIcon />
                </IconButton>
              </Box>
            }>
            <ListItemText primary={`${cart[itemName]} x ${itemName}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" color="error" onClick={resetCart}>
          Reset Cart
        </Button>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
