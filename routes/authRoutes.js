import express from "express"
import { registerController ,  loginController,} from "../controllers/authController.js";
import {requireSignIn} from "../middleware/authMiddleware.js"
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//protected route auth

router.get("/user-auth" ,requireSignIn ,(req,res)=>{
    res.status(200).send({ok:true})
})
export default router;