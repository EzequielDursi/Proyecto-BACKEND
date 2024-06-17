import { Router } from "express";
import * as productController from "../controllers/product.controllers.js";
import { productValidation } from "../middlewares/productValidation.js";
import { idValidation } from "../middlewares/idValidation.js";




const productRouter = Router();



productRouter.get("/", productController.getAllProducts);

productRouter.get("/:productId", productController.getProductById);

productRouter.post("/", productValidation, productController.createProduct);

productRouter.put("/:productId", idValidation, productController.updateProduct);

productRouter.delete("/:productId", productController.deleteProduct)

export default productRouter;