import * as productService from "../services/product.services.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, name, sort } = req.query;
    const response = await productService.getAllProducts(page, limit, name, sort);
  
    const nextLink = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null;
    const prevLink = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null;

    res.status(200).json({
      status: 'success',
      payload: response.docs,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasNextPage: response.hasNextPage,
      hasPrevPage: response.hasPrevPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    next(error.message);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productService.getProductById(pid);
    if (!response) res.status(404).json({ msg: `producto no encontrado ${pid} ` });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    if (!newProduct) res.status(404).json({ msg: "no se puede crear producto" });
    else res.status(200).json(newProduct);
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productUpdate = await productService.updateProduct(pid, req.body);
    if (!productUpdate) res.status(404).json({ msg: "no se puede actualizar producto " });
    else res.status(200).json(productUpdate);
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productToDelete = await productService.deleteProduct(pid);
    if (!productToDelete) res.status(404).json({ msg: "no se puede borrar producto " });
    else res.status(200).json({ msg: `el producto con id: ${pid} ha sido borrado` });
  } catch (error) {
    next(error.message);
  }
};