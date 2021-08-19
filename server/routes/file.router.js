const Router = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = new Router();

router.post("/api", authMiddleware, )