const { response, request } = require('express');
const HttpStatus = require('http-status-codes');

const Contenedor = require('../models/Contenedor');

const productRepository = new Contenedor('products.json');

class ProductController {

    async _findAllProducts() {
        return await productRepository.getAll();
    }

    async findAll(req = request, res = response) {
        const products = await this._findAllProducts();

        res.status(HttpStatus.OK).json(products);
    }

    async findOneById(req = request, res = response) {
        const { id } = req.params;

        const product = await productRepository.getById(id);

        const statusCode = !product ? HttpStatus.NOT_FOUND : HttpStatus.OK;

        return res.status(statusCode).json(product || { error: 'Product not found' });
    }

    async save(req = request, res = response) {
        const { ...newProduct } = req.body;

        const id = productRepository.save(newProduct);

        res.render("/", {});
    }

    async update(req = request, res = response) {
        const { id } = req.params;
        const { ...newProduct } = req.body;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({ error: 'Product not found' });
        }

        const updatedProduct = await productRepository.update(id, newProduct);

        return  res.status(HttpStatus.OK).json(updatedProduct);
    }

    async delete(req = request, res = response) {

        const { id } = req.params;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({ error: 'Product not found' });
        }

        await productRepository.deleteById(id);

        res.status(HttpStatus.OK).json({ message: 'Product deleted' })
    }

}

module.exports = ProductController;