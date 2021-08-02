const Router = require("express");
const router = new Router();
const bcrypt = require("bcrypt");
const {check, validationResult} = require("express-validator");
const User = require("./../model/User")
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/login",  async (req, res) => {

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        const correctPassword = bcrypt.compareSync(password, user.password);
        if(!correctPassword) {
            return res.status(400).json({message: "Password uncorrect"});
        }
        const token = jwt.sign(
            user.id,
            config.get("privateKey"));
        return res.json({
            token,
            user: {
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            }
        })


    }catch(e){
        console.log(e)
        res.status(400).json({message: "Error message"})
    }
})

module.exports = router;