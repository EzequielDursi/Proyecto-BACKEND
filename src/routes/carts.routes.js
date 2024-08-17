import { Router } from "express";
import * as cartController from "../controllers/cart.controllers.js";
import { authorization } from "../middlewares/auth.middlewares.js";


const cartRouter = Router();



cartRouter.get("/", authorization(["admin"]), cartController.getAllCarts);

cartRouter.get("/:cid",authorization(["admin"]), cartController.getCartById);

cartRouter.post("/", authorization(["admin"]), cartController.createCart);

cartRouter.delete("/:cid", authorization(["admin"]), cartController.deleteCart);

cartRouter.put("/:cid", authorization(["admin"]), cartController.updateCart);

cartRouter.post("/:cid/product/:pid", authorization(["admin"]),  cartController.addProductToCart);

cartRouter.delete("/:cid/product/:pid", authorization(["admin"]), cartController.removefromCart);

cartRouter.put("/:cid/product/:pid", authorization(["admin"]), cartController.updateProdQuantity);

cartRouter.delete("/:cid", authorization(["admin"]), cartController.clearCart);

cartRouter.post("/:cid/purchase", authorization(["admin"]), cartController.purchaseCart);   

export default cartRouter;