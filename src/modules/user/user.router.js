import {Router} from 'express'
import * as userController from  './controller/user.js'
import auth from '../../middleware/auth.middelware.js';
const router = Router();


router.get("/" , userController.getUserModule)
router.get('/profile',auth,userController.profile)
router.put('/update',userController.update)
router.delete('/delete',userController.deleteUser)

export default  router