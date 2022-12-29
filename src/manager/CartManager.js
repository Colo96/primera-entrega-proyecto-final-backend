const fs = require('fs/promises');
const { existsSync } = require('fs');

class CartManager {

    static idCounter = 0;

    constructor(path) {
        this.path = path;
    }

    async consultarProductosEnElCarrito(cid) {
        const newPath = __dirname + this.path;
        if (existsSync(newPath)) {
            const data = await fs.readFile(newPath, 'utf-8');
            const carts = JSON.parse(data);
            const cart = carts.find(cart => cart.id === cid);
            const products = cart.products;
            return products;
        } else {
            return [];
        }
    }

    async createCart(products, carts) {
        const newPath = __dirname + this.path;
        if (!carts.length) {
            CartManager.idCounter = 1;
        } else {
            CartManager.idCounter = carts[carts.length - 1].id + 1;
        }
        const cart = {
            id: CartManager.idCounter,
            products: products
        };
        carts.push(cart);
        await fs.writeFile(newPath, JSON.stringify(carts, null, '\t'));
        return cart;
    }
}

module.exports = CartManager;