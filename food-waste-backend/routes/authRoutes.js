const router = require("express").Router();
const { registerUser, loginUser, getAllUsers, deleteUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login",    loginUser);
router.get("/users",     getAllUsers);   // Admin: view all users
router.delete("/users/:id", deleteUser); // Admin: delete user

module.exports = router;
