import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  async createCart() {
    try {
      return await CartModel.create({
        products: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCarts() {
    try {
      return await CartModel.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      return await CartModel.findById(id).populate("products.product");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async isInCart(cartId, prodId){
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProdToCart(cartId, prodId) {
    try {
      const prodInCart = await this.isInCart(cartId, prodId);
        if(prodInCart){
          return await CartModel.findOneAndUpdate(
            { _id: cartId, 'products.product': prodId },
            { $set: { 'products.$.quantity': prodInCart.products[0].quantity + 1 } },
            { new: true }
          );
        } else {
          return await CartModel.findByIdAndUpdate(
            cartId,
            { $push: { products: { product: prodId } } },
            { new: true }
          )
        }
    } catch (error) {
      console.log(error);
    }
  }

  async removefromCart(cartId, prodId) {
    try {
      return await CartModel.findByIdAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      )
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(id, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProdQuantity(cartId, prodId, quantity) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId, 'products.product': prodId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(cartId) {
    try {
     return await CartModel.findOneAndUpdate(
      { _id: cartId },
      { $set: { products: [] } },
      { new: true }
     )
    } catch (error) {
      console.log(error);
    }
  }
}