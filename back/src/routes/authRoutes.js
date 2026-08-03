import express from "express";
import {
    registerUser,
    verifyOtp,
    loginUser,
    forgotPassword,
    verifyForgotPasswordOtp,
    sendChangePasswordOtp,
    verifyAndChangePassword,
    verifyForgotOtp,
    createNewPassword,

} from "../controllers/authController.js";
import verifyToken from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/signup", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
router.post("/create-new-password", createNewPassword);

router.post("/send-change-password-otp", verifyToken, sendChangePasswordOtp);
router.post("/verify-and-change-password", verifyToken, verifyAndChangePassword);
router.post("/verifypasswordotp", verifyForgotOtp);



export default router;