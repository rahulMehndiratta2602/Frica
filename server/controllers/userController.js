const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/userModel')
exports.createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user
    const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true, runValidators: true })
    if (user) {
        console.log("USER UPDATED", user)
        res.json({ status: "success", user })
    } else {
        const newUser = await new User({
            email,
            name: name || email.split('@')[0],
            picture
        }).save()
        console.log("USER CREATED", newUser)
        res.status(200).json({ status: "success", user: newUser })
    }
}

exports.getMe = async (req, res) => {
    res.status(200).json({ status: "success", user: await User.findOne({ email: req.user.email }) })
}