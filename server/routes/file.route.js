const Router = require("express");
const FileController = require("../controllers/FileController");
const authMiddleware = require("../middleware/auth.middleware");
const router = new Router();

router.post('', authMiddleware, FileController.createDir);
router.get('', authMiddleware, FileController.getFiles);
router.post('/upload', authMiddleware, FileController.uploadFile);
router.get('/download', authMiddleware, FileController.downloadFile);
router.delete('/', authMiddleware, FileController.deleteFile);

module.exports = router;