import React, { useState } from 'react';
import BakeryItem from './components/BakeryItem';
import Cart from './components/FinalCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Badge from '@mui/material/Badge';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import bakeryData from './assets/bakery-data.json';
import './App.css';

function App() {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [filterHighRating, setFilterHighRating] = useState(false);

  const toggleCart = () => setIsCartVisible(!isCartVisible);

  function addToCart(itemName) {
    const price = bakeryData.find(item => item.name === itemName).price;
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (itemName in newCart) {
        newCart[itemName] += 1;
      } else {
        newCart[itemName] = 1;
      }
      return newCart;
    });
    setTotal((prevTotal) => prevTotal + price);
  }
  
  function removeFromCart(itemName) {
    const price = bakeryData.find(item => item.name === itemName).price;
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemName] > 1) {
        newCart[itemName] -= 1;
      } else {
        delete newCart[itemName];
      }
      return newCart;
    });
    setTotal((prevTotal) => prevTotal - price);
  }
  
  function resetCart() {
    setCart({});
    setTotal(0);
  }

  function resetFilters() {
    setFilterFeatured(false);
    setFilterHighRating(false);
  }

  function resetAll() {
    setSortBy('name');
    setSortOrder('asc');
    setFilterFeatured(false);
    setFilterHighRating(false);
  }

  const totalItemsInCart = Object.values(cart).reduce((acc, curr) => acc + curr, 0);

  let processedBakeryData = [...bakeryData];

  if (filterFeatured) {
    processedBakeryData = processedBakeryData.filter(item => !item.containsGluten);
  }
  if (filterHighRating) {
    processedBakeryData = processedBakeryData.filter(item => item.isVegan);
  }

  processedBakeryData.sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <Box sx={{ flexGrow: 1, backgroundColor:"#304728", paddingTop: '64px', paddingBottom: '64px' }}>
      <AppBar position="fixed">
      <Toolbar sx={{ backgroundColor: "black"}}> 
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <b>GrillSpot</b>
          </Typography>
          
          
          <Button
            style={{
              backgroundColor: filterFeatured ? "white" : "black",
              color: filterFeatured ? "black" : "white",
            }}
            onClick={() => setFilterFeatured(!filterFeatured)}
            sx={{border: 1, mx: 1.4}}
          >
            Gluten Free
          </Button>
          <Button
            style={{
              backgroundColor: filterHighRating ? "white" : "black",
              color: filterHighRating ? "black" : "white",
            }}
            onClick={() => setFilterHighRating(!filterHighRating)}
            sx={{border: 1, mx: 1.4}}
          >
            Vegan
          </Button>

          <FormControl 
            sx={{ 
              m: 1, minWidth: 120, 
              '& .MuiInputLabel-root': { // Label default transparent
                color: 'transparent',
              },
              '&:hover .MuiInputLabel-root': { // Label color on hover
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Border on hover
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Border on focus
                },
                '&.Mui-focused .MuiInputLabel-root': { // Label color on focus
                  color: 'white',
                },
                color: 'white', // Input text color
                '&.Mui-focused': {
                  color: 'white', // Ensure text remains white when focused
                },
              },
              '.MuiSvgIcon-root': { color: 'white' }, // Icon color
            }}>
            <InputLabel id="sort-by-label" sx={{ "&.Mui-focused": { color: 'white' } }}>Sort By</InputLabel>
  <Select
    labelId="sort-by-label"
    id="sort-by-select"
    value={sortBy}
    label="Sort By" // Ensure this matches the text of the corresponding InputLabel
    onChange={(e) => setSortBy(e.target.value)}
  >
    <MenuItem value="name">Name</MenuItem>
    <MenuItem value="price">Price</MenuItem>
    <MenuItem value="rating">Rating</MenuItem>
  </Select>
          </FormControl>

          <FormControl 
            sx={{ 
              m: 1, minWidth: 120,
              // Apply styles to the FormControl directly
              '.MuiInputLabel-root': { 
                // Default state (transparent label)
                color: 'transparent',
                // Ensure the label stays when the Select is focused
                '&.Mui-focused': { 
                  color: 'white',
                },
              },
              '&:hover .MuiInputLabel-root': { 
                // Label color on hover
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  // Border color on hover
                  borderColor: 'white', 
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  // Border color on focus
                  borderColor: 'white',
                },
                color: 'white', // Input text color
              },
              '.MuiSvgIcon-root': { 
                color: 'white', // Icon color
              },
              // Directly target the focused state of the InputLabel within FormControl
              '& .Mui-focused .MuiInputLabel-root': {
                color: 'white', // Label color on focus
              }
            }}
          >
            
  <InputLabel id="sort-order-label">Order</InputLabel>
  <Select
    labelId="sort-order-label"
    id="sort-order-select"
    value={sortOrder}
    label="Order"
    onChange={(e) => setSortOrder(e.target.value)}
  >
    <MenuItem value="asc">Ascending</MenuItem>
    <MenuItem value="desc">Descending</MenuItem>
  </Select>
</FormControl>

          {/* <Button sx={{color:'red'}} onClick={resetFilters}>Remove Filters</Button> */}
          <Button sx={{color:'red', border: 1, mx: 1.4}} onClick={resetAll}>Reset All</Button>
          <IconButton color="inherit" onClick={toggleCart}>
            <Badge badgeContent={totalItemsInCart} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 8 }}>
        <Grid container spacing={4}>
          {processedBakeryData.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <BakeryItem
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
                numReviews={item.numReviews}
                ingredients = {item.ingredients}
                allergens = {item.allergens}
                image={item.image}
                addToCart={addToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Drawer anchor="right" open={isCartVisible} onClose={toggleCart}>
  <Box sx={{ width: 350 }} role="presentation">
    <Cart 
      cart={cart} 
      total={total} 
      resetCart={resetCart} 
      addToCart={addToCart} 
      removeFromCart={removeFromCart}
    />
  </Box>
</Drawer>

    </Box>
  );
}

export default App;
