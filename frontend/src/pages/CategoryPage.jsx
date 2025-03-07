import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useProductContext } from '../contexts/ProductContext';
import { transformCategoryId } from '../helper/categoryHelper';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const { products, loading, error, fetchProducts } = useProductContext(); 
console.log('produces', products)
    useEffect(() => {
        const backendCategoryId = transformCategoryId(categoryId);
        fetchProducts(backendCategoryId); 
    }, [categoryId, fetchProducts]);

    if (loading) return (
      <Box sx={{ width: '100%' }}>
          <LinearProgress color="success" />
      </Box>
  );
    if (error) return <Typography>Error: {error}</Typography>;

    const productsArray = Object.values(products);
    

    return (
      <div>
        <Breadcrumbs aria-label="breadcrumb"  sx={{ mt: 2, mb: 0, ml: 45, mr: 2}}>
          <Link component={RouterLink} color="inherit" to="/">
            Home
          </Link>
          <Link  color="inherit" to="/products">
            Products
          </Link>
          <Typography color="pruple">{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</Typography>
        </Breadcrumbs>
  
      

            <Grid container spacing={4} justifyContent="center" style={{ margin: '0 auto', maxWidth: '1280px' }}> 
            {productsArray.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id} style={{ display: 'flex', justifyContent: 'center' }}> 
                        <ProductCard
                            product={product}
                            productId={product.id} 
                            name={product.name}
                            description={product.description}
                            price_cents={product.price_cents}
                            image_1={product.image_1}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CategoryPage;
     