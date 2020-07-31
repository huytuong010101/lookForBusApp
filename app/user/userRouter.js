import express from 'express';
import UserMiddleware from "../../middlewares/userMiddleware.js"
const router = express.Router();
const userMiddleware = new UserMiddleware()
//import controller
import UserController from './userController.js'
const userController = new UserController;
/* Router. */
router.route("/login")
    .get(userMiddleware.hasNotLogin, userController.renderLogin)
    .post(userMiddleware.hasNotLogin, userController.login)
router.route("/logout")
    .get(userMiddleware.hasLogin, userController.logout)
export default router;
