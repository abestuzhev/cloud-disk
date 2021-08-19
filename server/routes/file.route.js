const Router = require("express");
const FileController = require("../controllers/FileController");
const authMiddleware = require("../middleware/auth.middleware");
const router = new Router();

router.post('', authMiddleware, FileController.createDir);
router.get('', authMiddleware, FileController.getFiles);

module.exports = router;