const router = require('express').Router()
const Admin = require('../models/adminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middelware/auth')

// handle register
router.post("/register", async (req, res) => {
    try {
        let { username, email, password, passwordCheck } = req.body

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

        const newAdmin = new Admin({
            email,
            password: passwordHash,
            username,
        })

        const savedAdmin = await newAdmin.save()
        res.json(savedAdmin)        
        console.log("admin registerd successfully")
    } catch(err) {
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

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ msg: "Incorrect password."})

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
            }
        })
        
    } catch (err) {
        res.status(500).json({msg : err.message})
    }
})

router.get("/", auth, async (req, res) => {
    const user = await Admin.findById(req.user)
    res.json({
        displayName: user.displayName,
        id: user._id,
    })
})

router.delete("/delete", auth, async(res, req) => {
    try{
        const deletedUser = await Admin.findByIdAndDelete(req.user)
        res.json(deletedUser)
    } catch(err){
        res.status(500).json({msg : err.message})
    }
})

router.post("/tokenIsValid", async(req, res) => {
    try{
        const token = req.header('x-auth-token')
        if(!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false)

        const admin = await Admin.findById(verified.id)
        if(!admin) return res.json(false)

        return res.json(true)
    } catch(err){
        res.status(500).json({msg : err.message})
    }
})

module.exports = router;