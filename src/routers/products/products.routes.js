const { Router } = require('express');
const router = Router();

const ProductManager = require('../../manager/ProductManager');
const manager = new ProductManager('../../data/products.json');

router.get('/', async (req, res) => {
    let products = await manager.consultarProductos();
    res.json({
        status: "success",
        data: products
    });
});

router.get('/limite/:limit', async (req, res) => {
    let limit = req.params.limit;
    let filterProducts = await manager.getProductsByLimit(limit);
    res.json({
        status: "success",
        data: filterProducts
    });
});

router.get('/identificador/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    const product = await manager.getProductsById(pid);
    res.json({
        status: 'success',
        data: product
    });
});

router.post('/', async (req, res) => {
    const product = req.body;
    const addedProduct = await manager.addProduct(product);
    res.json({
        status: "success",
        data: addedProduct
    });
});

router.put('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    const product = req.body;
    const updatedProduct = await manager.updateProduct(pid, product);
    res.json({
        status: "success",
        data: updatedProduct
    });
});

router.delete('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    const deleteProduct = await manager.deleteProduct(pid);
    res.json({
        status: "success",
        data: deleteProduct
    });
});

module.exports = router;