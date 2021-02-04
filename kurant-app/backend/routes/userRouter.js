const router = require('express').Router()
const User = require('../models/userModel')

// ska hämta alla users mha find()
router.get("/addTitel", async (req, res) => {
    try {
        const users = await User.find(req.group)
        res.json(users)
    } catch(err){
        res.status(500).json({msg : err.message})
    }
})

// handle register of a titel user
router.post("/addTitel", async (req, res) => {
    try {
        const username = req.body.name
        const group = req.body.group
        const id = req.body.id

        //validation
        if(!group) 
            return res.status(400).json({msg: "The user was not given a group. Something wrong with the code :("})

        if(!username)
            return res.status(400).json({msg: "The user was not given a name."})

        if(!id)
            return res.status(400).json({msg: "The user was not given an id."})
        
        const existingUser = await User.findOne({ id: id })
        if(existingUser) return res.status(400).json({msg: "An user with this id already exists."})

        const newUser = new User({
           username,
           group,
           id
        })

        const savedUser = await newUser.save()
        res.json(savedUser)
        console.log("User added successfully: " + savedUser)
    } catch(err) {
        res.status(500).json({msg : err.message})
    }
})

module.exports = router;