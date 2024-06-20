import * as service from '../services/cart.services.js'

export const createCart = async (req, res, next) => {
    try {
      const newCart = await service.createCart();
      if (!newCart) res.status(404).json({ msg: "no se puede crear carrito" });
      else res.status(200).json(newCart);
    } catch (error) {
      next(error.message);
    }
  };
export const getAllCarts = async (req, res, next) => {
    try {
      const response = await service.getAllCarts();
      res.status(200).json(response);
    } catch (error) {
      next(error.message);
    }
  };
  
  export const getCartById = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await service.getCartById(cid);
      if (!response) res.status(404).json({ msg: "carrito no encontrado" });
      else res.status(200).json(response);
    } catch (error) {
      next(error.message);
    }
  };
  
  export const updateCart = async (req, res, next) => {
    try {
      const { cid} = req.params;
      const cartUpd = await service.updateCart(cid, req.body);
      if (!cartUpd) res.status(404).json({ msg: "error al actualizar carrito" });
      else res.status(200).json(cartUpd);
    } catch (error) {
      next(error.message);
    }
  };
  
  export const deleteCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cartDel = await service.deleteCart(cid);
      if (!cartDel) res.status(404).json({ msg: "no se puede borrar carrito" });
      else res.status(200).json({ msg: `id de carrito: ${cid} borrado` });
    } catch (error) {
      next(error.message);
    }
  };

export const addProductToCart = async (req, res, next) => {
    try {
      const { cid} = req.params;
      const { pid } = req.params;
      const ProductToAdd = await service.addProductToCart(
        cid,
        pid,
      );
      if (!ProductToAdd) res.json({ msg: "error al agregar producto" });
      else res.json(ProductToAdd);
    } catch (error) {
      next(error.message);
    }
  };

  export const removefromCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const delProdToUserCart = await service.removefromCart(
       cid,
        pid,
      );
      if (!delProdToUserCart) res.json({ msg: "no se puede quitar producto del carrito" });
      else res.json({msg: `producto ${pid} borrado del carrito`});
    } catch (error) {
      next(error.message);
    }
  };

  export const updateProdQuantity = async (req, res, next) => {
    try {
      const { cid} = req.params;
      const { pid } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await service.updateProdQuantity(
        cid,
       pid,
        quantity
      );
      if (!updateProdQuantity) res.json({ msg: "no se puede cambiar la cantidad" });
      else res.json(updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };

  export const clearCart = async (req, res, next) => {
    try {
      const { cid} = req.params;
      const clearCart = await service.clearCart(
        cid,
      );
      if (!clearCart) res.json({ msg: "no puede borrar este carrito" });
      else res.json(clearCart);
    } catch (error) {
      next(error.message);
    }
  };

  
  