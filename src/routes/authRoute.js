import express from "express";
import passport from "passport"; // ⬅ required
import {
  dashboard,
  login,
  logout,
  profile,
  refreshToken,
  signUp,
} from "../controllers/authController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Normal Auth
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/refresh").get(refreshToken);
router.route("/logout").post(logout);
router.route("/profile").get(protect, profile);
router.route("/dashboard").get(protect, authorize, dashboard);


// GOOGLE OAuth Routes

// send user to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google redirects back
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const accessToken = generateAccessToken(req.user._id);
    const refreshToken = generateRefreshToken(req.user._id);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${accessToken}`);
  }
);

export default router;
