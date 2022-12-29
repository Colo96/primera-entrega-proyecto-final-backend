const { Router } = require('express');
const router = Router();
const productsRoutes = require('./products/products.routes');
const cartsRoutes = require('./carts/carts.routes');

router.use('/products', productsRoutes);

router.use('/carts', cartsRoutes);

module.exports = router;