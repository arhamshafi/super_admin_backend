const express = require("express")
const { Register, Login, CreateAdminsBySuperAdmin } = require("../controller/superadmin")
const authMiddleware = require("../middleware/protector")
const router = express.Router()

router.post("/register", Register)
router.post("/login", Login)
router.post("/createdAdminsBySuperAdmin", authMiddleware, CreateAdminsBySuperAdmin)

module.exports = router