import {Router} from 'express'
import * as authController from  './controller/auth.js'
const router = Router();


router.get("/" , authController.getAuthModule)
router.get("/getUsers",authController.getUsers)
router.post("/signup",authController.signup)
router.post("/logIn",authController.logIn);
export default  router