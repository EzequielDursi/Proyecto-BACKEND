import { Schema, model } from "mongoose"; 
import mongoosePaginate from "mongoose-paginate-v2";

export const productcolection = "products";

const productSchema = new Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        category: { type: String, required: true, index: true },
    });

    productSchema.plugin(mongoosePaginate);
    
    export const ProductModel = model(productcolection, productSchema);