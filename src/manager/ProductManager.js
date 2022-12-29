const fs = require('fs/promises');
const { existsSync } = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async consultarProductos() {
        const newPath = __dirname + this.path;
        if (existsSync(newPath)) {
            const data = await fs.readFile(newPath, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
    }

    async getProductsByLimit(limit) {
        const products = await this.consultarProductos();
        let filterProducts;
        if (limit > products.length) {
            console.error("No hay tantos productos");
            return;
        } else if (limit <= 0) {
            console.error("No puede haber cero o menos productos");
            return;
        } else {
            return filterProducts = products.filter(product => product.id <= limit);
        }
    }

    async getProductsById(pid) {
        let products = await this.consultarProductos();
        let findProduct = products.find(product => product.id === pid);
        return findProduct;
    }

    async addProduct(product) {
        const newPath = __dirname + this.path;
        const products = await this.consultarProductos();
        const newProduct = {
            id: products.length + 1,
            ...product
        };
        products.push(newProduct);
        await fs.writeFile(newPath, JSON.stringify(products, null, '\t'));
        return newProduct;
    }

    async updateProduct(pid, newProduct) {
        const newPath = __dirname + this.path;
        const products = await this.consultarProductos();
        const updateProducts = products.map(product => product.id === pid ? {
            title: newProduct.title,
            description: newProduct.description,
            code: newProduct.code,
            price: newProduct.price,
            status: newProduct.status,
            stock: newProduct.stock,
            category: newProduct.category,
            thumbnail: newProduct.thumbnail
        } : product);
        await fs.writeFile(newPath, JSON.stringify(updateProducts, null, '\t'));
        return newProduct;
    }

    async deleteProduct(pid) {
        const newPath = __dirname + this.path;
        const products = await this.consultarProductos();
        const deleteProduct = products.find(product => product.id === pid);
        const filterProducts = products.filter(product => product.id !== pid);
        await fs.writeFile(newPath, JSON.stringify(filterProducts, null, '\t'));
        return deleteProduct;
    }
}

module.exports = ProductManager;