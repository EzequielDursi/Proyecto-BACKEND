import { Router } from 'express';
import * as productController from '../controllers/product.controllers.js';
import { idValidation } from '../middlewares/idValidation.js';
import { productValidation } from "../middlewares/productValidation.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:pid", productController.getProductById);
productRouter.post("/", productValidation, productController.createProduct);
productRouter.put("/:pid", idValidation, productController.updateProduct);
productRouter.delete("/:pid", productController.deleteProduct);

export default productRouter;