import { ProductModel } from "./mongodb/models/product.model.js";

export default class ProductDaoMongoDB {
  async getAllProducts(page = 1, limit = 10, name, sort) {
    try {
      const filter = name ? { "title" : name } : {};
      let sortOrder ={};
      if(sort) sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;

      return await ProductModel.paginate(filter, { page, limit, sort: sortOrder });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById (id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}