import express from 'express';
const router = express.Router();
//import controller
import IndexController from './indexController.js'
const indexController = new IndexController()
/* Router. */
router.get('/', indexController.renderHome);
router.get('/search', indexController.search)

export default router;
