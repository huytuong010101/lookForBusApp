import express from 'express';
const router = express.Router();
import UserMiddleware from "../../middlewares/userMiddleware.js"
const userMiddleware = new UserMiddleware()
//import controller
import AdminController from './adminController.js'
const adminController = new AdminController()
/* Router. */
router.route("/")
    .get(userMiddleware.hasLogin, (req, res) => { return res.redirect("/admin/streets") });
//------------------------------streets-------------------------------------
router.route("/streets")
    .get(userMiddleware.hasLogin, adminController.renderStreets);
router.route("/streets/add")
    .post(userMiddleware.hasLogin, adminController.addNewStreet)
router.route("/streets/get-all")
    .get(adminController.getAllStreet)
router.route("/streets/delete")
    .delete(userMiddleware.hasLogin, adminController.deteleStreet)
router.route("/streets/rename")
    .put(userMiddleware.hasLogin, adminController.renameStreet)
//------------------------------routes-------------------------------------
router.route("/routes")
    .get(userMiddleware.hasLogin, adminController.renderRoutes)
router.route("/routes/add")
    .post(userMiddleware.hasLogin, adminController.addNewRoute)
router.route("/routes/get-all")
    .get(userMiddleware.hasLogin, adminController.getAllRoute)
router.route("/routes/delete")
    .delete(userMiddleware.hasLogin, adminController.deteleRoute)
router.route("/routes/rename")
    .put(userMiddleware.hasLogin, adminController.renameRoute)
//--------------------------------route detail--------------------------------
router.route("/route-detail")
    .get(userMiddleware.hasLogin, adminController.renderRouteDetail)
router.route("/route-detail/update")
    .post(userMiddleware.hasLogin, adminController.updateDetailRoute)
router.route("/route-detail/:id")
    .get(userMiddleware.hasLogin, adminController.getRouteDetail)
export default router;
