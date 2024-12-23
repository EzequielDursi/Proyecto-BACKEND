import ProductDao from "../daos/product.dao.js";
const productDao = new ProductDao();

import CartDao from "../daos/cart.dao.js";
const cartDao = new CartDao();


export const createCart = async () => {
    try {
      const newcart = await cartDao.createCart();
      if (!newcart) return false;
      else return newcart;
    } catch (error) {
      console.log(error);
    }
  };
export const getAllCarts = async () => {
  try {
    return await cartDao.getAllCarts();
  } catch (error) {
    console.log(error);
  }
};

export const getCartById = async (cartId) => {
  try {
    return await cartDao.getCartById(cartId);
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (cartId, obj) => {
  try {
    return await cartDao.updateCart(cartId, obj);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async (cartId) => {
  try {
    const cartToDelete = await cartDao.deleteCart(cartId);
    if (!cartToDelete) return false;
    else return cartToDelete;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (cartId, productId) => {
  try {
    const existCart = await getCartById(cartId);
    const existProd = await productsDao.getProductById(productId);

    existCart || existProd ? null :  await cartDao.addProductToCart(cartId, productId);
  } catch (error) {
    console.log(error);
  }
};

export const removefromCart = async (cartId, productId) => {
  try {
    const existCart = await getCartById(cartId);
    if (!existCart) return null;

    const existProdInCart = await cartDao.isInCart(cartId, productId);
    if (!existProdInCart) return null;
    
    return await cartDao.removefromCart(cartId, productId);
  } catch (error) {
    console.log(error);
  }
};

export const updateProdQuantity = async (cartId, productId, quantity) => {
  try {
    const existCart = await getCartById(cartId);
    if (!existCart) return null;
    const existProdInCart = await cartDao.isInCart(cartId, productId);
    if (!existProdInCart) return null;
    return await cartDao.updateProdQuantity(cartId, productId, quantity);
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = async (cartId) => {
  try {
    const existCart = await getCartById(cartId);
    if (!existCart) return null;
    return await cartDao.clearCart(cartId)
  } catch (error) {
    console.log(error);
  }
};