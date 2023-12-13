const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userProfile } = require("../controllers/userControllers");
const { authGuard } = require("../middleware/authMiddleware")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);

module.exports = router;