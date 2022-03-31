const { response, request } = require('express');
const { StatusCodes } = require('http-status-codes');

const Contenedor = require('../models/Contenedor');

const productRepository = new Contenedor('DB/products.json');

class ProductController {

    async _findAllProducts() {
        return await productRepository.getAll();
    }

    findAll = async (req = request, res = response) => {
        const products = await this._findAllProducts();

        res.status(StatusCodes.OK).json(products);
    }

    async findOneById(req = request, res = response) {
        const { id } = req.params;

        const product = await productRepository.getById(id);

        const statusCode = !product ? StatusCodes.NOT_FOUND : StatusCodes.OK;

        return res.status(statusCode).json(product || { error: 'Product not found' });
    }

    async save(req = request, res = response) {
        const { ...newProduct } = req.body;

        const id = productRepository.save(newProduct);

        res.status(StatusCodes.CREATED).json({ id });
    }

    async update(req = request, res = response) {
        const { id } = req.params;
        const { ...newProduct } = req.body;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
        }

        const updatedProduct = await productRepository.update(id, newProduct);

        return  res.status(StatusCodes.OK).json(updatedProduct);
    }

    async delete(req = request, res = response) {

        const { id } = req.params;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
        }

        await productRepository.deleteById(id);

        res.status(StatusCodes.OK).json({ message: 'Product deleted' })
    }

}

module.exports = ProductController;