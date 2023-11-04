const { Signup, Login } = require("../controller/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const Users = require("../controller/UsersController")
const Assets = require("../controller/AssetsController")
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.use("/users", Users);
router.use("/assets", Assets);
router.post('/', userVerification);

module.exports = router;