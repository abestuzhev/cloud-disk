const jwt = require( "jsonwebtoken");
const config = require( "config");

const Router = require("express");
const router = new Router();
const bcrypt = require("bcrypt");
const {check, validationResult} = require("express-validator");
const User = require("./../model/User")
const authMiddleware = require("./../middleware/auth.middleware");
const FileServices = require("../services/FileServices");
const File = require("../model/File");

router.post("/registration", [
    check("email", "Uncorrect email").isEmail(),
    check("password", "Password must be longer than 3 and shorter than 12").isLength({min: 3, max: 12})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if(candidate) {
            return res.status(400).json({message: `User with email ${email} already exist`});
        }
        
        const hashPassword = await bcrypt.hash(password, 5);
        const user = new User({email, password: hashPassword});
        await user.save();
        await FileServices.createDir(new File({user: user.id, name:''}));
        return res.json({message: "User was created"})


    }catch(e){
        console.log(e)
        res.status(400).json({message: "Error message 111"})
    }
})

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
        const token = jwt.sign({id: user.id}, config.get("privateKey"), {expiresIn: "1h"})

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
        res.status(400).json({message: "Error message !!!"})
    }
})

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("privateKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            res.send({message: "Server error"})
        }
    })

module.exports = router;