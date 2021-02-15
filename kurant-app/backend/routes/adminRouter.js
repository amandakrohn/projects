const router = require('express').Router()
const Admin = require('../models/adminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middelware/auth')

// handle register
router.post("/", async (req, res) => {
    try {
        const { username, email, password, passwordCheck } = req.body

        //validation
        if(!email || !password || !passwordCheck)
            return res.status(400).json({msg: "Not all fields have been filled in."})

        if(password.length < 5)
            return res.status(400).json({msg: "Password needs to be at leat 5 characters."})
        
        if(password !== passwordCheck)
            return res.status(400).json({msg: "Enter the same password twice."})
    
        const existingAdmin = await Admin.findOne({ email: email })
        if(existingAdmin)
            return res.status(400).json({msg: "An account with this email already exists."})
         

        if(!username) username = email

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        console.log(salt, passwordHash)
        const newAdmin = new Admin({
            email,
            password: passwordHash,
            username,
        })

        const savedAdmin = await newAdmin.save()

        const token = jwt.sign({ user: savedAdmin._id }, process.env.JWT_SECRET)

        res.cookie("token", token, { 
            httpOnly: true,
            secure: true,
            sameSite: "none"     
        }).send()
        
        console.log("admin registerd successfully")
    } catch(err) {
        console.error(err)
        res.status(500).json({msg : err.message})
    }
})

// handle log in
router.post('/login', async ( req, res ) => {
    try {
        const { email, password } = req.body

        //validation
        if(!email || !password) 
            return res.status(400).json({ msg: "Not all fields have been filled in."})

        const user = await Admin.findOne({ email: email })
        if(!user) return res.status(400).json({ msg: "No account with this email exists."})

        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword) return res.status(400).json({ msg: "Incorrect password."})

        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET)

        res.cookie("token", token, { 
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).send()
        
    } catch (err) {
        console.error(err)
        res.status(500).json({msg : err.message})
    }
})

router.get("/logout", (req, res) => {
    try{
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),   //set expiration date to now to remove the cookie
            secure: true,
            sameSite: "none"
        }).send()
    } catch(err) {
        console.error(err)
    }
})

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token
        if(!token) return res.json(false)

        jwt.verify(token, process.env.JWT_SECRET)
        res.send(true)
    } catch(err){
        console.error(err)
    }
})


module.exports = router;