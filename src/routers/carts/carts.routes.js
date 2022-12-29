const { Router } = require('express');
const router = Router();

const CartManager = require('../../manager/CartManager');
const managerCarts = new CartManager('../../data/carts.json');

const ProductManager = require('../../manager/ProductManager');
const managerProducs = new ProductManager('../../data/products.json');

const carts = [];

router.post('/', async (req, res) => {
    const products = await managerProducs.consultarProductos();
    const cart = await managerCarts.createCart(products, carts);
    res.json({
        status: "success",
        data: cart
    });
});

router.get('/:cid', async (req, res) => {
    let cid = parseInt(req.params.cid); 
    const productsInCart = await managerCarts.consultarProductosEnElCarrito(cid);
    res.json({
        status: "success",
        data: productsInCart
    });
});

//No entendi como hacer este ultimo. Si el profesor puede explicarlo en un after o en un video genial.
/*router.post('/:cid/product/:pid', async (req, res) => {
    let cid = parseInt(req.params.cid); 
    const productsInCart = await managerCarts.consultarProductosEnElCarrito(cid);
    res.json({
        status: "success",
        data: productsInCart
    });
});*/

module.exports = router;