import { Router } from "express";
import * as cartController from "../controllers/cart.controllers.js";
import { authorization } from "../middlewares/auth.middlewares.js";


const cartRouter = Router();



cartRouter.get("/", authorization(["user"]), cartController.getAllCarts);

cartRouter.get("/:cid",authorization(["user"]), cartController.getCartById);

cartRouter.post("/", authorization(["user"]), cartController.createCart);

cartRouter.delete("/:cid", authorization(["user"]), cartController.deleteCart);

cartRouter.put("/:cid", authorization(["user"]), cartController.updateCart);

cartRouter.post("/:cid/product/:pid", authorization(["user"]),  cartController.addProductToCart);

cartRouter.delete("/:cid/product/:pid", authorization(["user"]), cartController.removefromCart);

cartRouter.put("/:cid/product/:pid", authorization(["user"]), cartController.updateProdQuantity);

cartRouter.delete("/:cid", authorization(["user"]), cartController.clearCart);

cartRouter.post("/:cid/purchase", authorization(["user"]), cartController.purchaseCart);   

export default cartRouter;