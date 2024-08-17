import { Router } from 'express';
import * as productController from '../controllers/product.controllers.js';
import { idValidation } from '../middlewares/idValidation.js';
import { productValidation } from "../middlewares/productValidation.js";
import { authorization } from "../middlewares/auth.middlewares.js";

const productRouter = Router();

productRouter.get("/",authorization(["admin"]), productController.getAllProducts);
productRouter.get("/:pid", authorization(["admin"]), productController.getProductById);
productRouter.post("/", authorization(["admin"]), productValidation, productController.createProduct);
productRouter.put("/:pid", authorization(["admin"]), idValidation, productValidation, productController.updateProduct);
productRouter.delete("/:pid", authorization(["admin"]), idValidation, productController.deleteProduct);

export default productRouter;