const UserSchema = require("../model/user")
const jwt = require("jsonwebtoken")

module.exports.Register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password || !role) return res.status(400).json({ message: "Required All Fields", success: false })
        const exist = await UserSchema.findOne({ email })
        if (exist) return res.status(400).json({ message: "User Already Exists", success: false })
        const newUser = await UserSchema.create({ name, email, password })

        res.status(200).json({ message: "Register Successfully", success: true })

    } catch (err) {
        next(err)
    }
}

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: "All Fields Required", success: false })
        const user = await UserSchema.findOne({ email })
        if (!user) return res.status(400).json({ message: "Admin Not Found", success: false })
        const isMatch = await user.matchPassword(password)
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials", success: false })

        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.SUPERKEY, { expiresIn: process.env.TOKENEXPIRY })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 1 * 24 * 60 * 60 * 1000,
            path: "/"
        })

        res.status(200).json({ message: "login Successfully", success: true })


    } catch (err) {
        next(err)
    }
}

module.exports.CreateAdminsBySuperAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "superAdmin") return res.status(400).json({ success: true, message: "Not Authorized !!" })
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.staus(400).json({ message: "All Fields Required", success: false })

        const exists = await UserSchema.findOne({ email })
        if (exists) return res.status(400).json({ message: "Choose Another Mail", success: false })

        const newUSer = await UserSchema.create({ name, email, password })
        res.status(200).json({ message: "Admin Created Successfully", success: true })

    } catch (err) {
        next(err)
    }
}
