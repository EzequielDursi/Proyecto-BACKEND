import { Router } from "express";
import * as cartController from "../controllers/cart.controllers.js";


const cartRouter = Router();



cartRouter.get("/", cartController.getAllCarts)

cartRouter.get("/:cid", cartController.getCartById);

cartRouter.post("/", cartController.createCart);

cartRouter.delete("/:cid", cartController.deleteCart);

cartRouter.put("/:cid", cartController.updateCart);

cartRouter.post("/:cid/product/:pid", cartController.addProductToCart);

cartRouter.delete("/:cid/product/:pid", cartController.removefromCart);

cartRouter.put("/:cid/product/:pid", cartController.updateProdQuantity);

cartRouter.delete("/:cid", cartController.clearCart);

export default cartRouter;