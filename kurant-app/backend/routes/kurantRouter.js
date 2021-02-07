const router = require('express').Router()
const auth = require('../middelware/auth')
const Kurant = require('../models/kurantModel')
const User = require('../models/userModel')

// ska hämta all kurant
router.get("/kurant", async (req, res) => {
    try {
        const kurants = await Kurant.find(req.group)
        res.json(kurants)
    } catch(err){
        res.status(500).json({msg : err.message})
    }
})

//radera kurant
router.delete('/delete', auth, async (req, res) => {
    try {
        const kurantId = req.body._id
        const findKurant = await Kurant.findById(kurantId)
        if (!findKurant) return  res.status(400).json({msg: "Unable to find kurant ID"})
        const deletedKurant = await Kurant.findByIdAndDelete(kurantId)
        res.json(deletedKurant)
        console.log(deletedKurant)
    } catch( err ){
        res.status(500).json({msg: err.message})
    }
})

// hantera ny kurant, läggs till till databasen
router.post("/kurant", auth, async (req, res) => {
    console.log(req.body)
    try {
        const group = req.body.group
        const id = req.body.id
        const money = parseInt(req.body.money)
        const date = req.body.date
        const type = req.body.type
        let note = req.body.note

        let username = await User.findOne({ id: id })
        username = username.username.toString()
        
        if(!note) note = "-"

        //validation
        if(!group || !id || !money || !date || !type) 
            return res.status(400).json({msg: "The form was not filled in correclty."})

        const newKurant = new Kurant({
           username,
           group,
           id, 
           money, 
           date,
           type,
           note
        })

        const savedKurant = await newKurant.save()
        res.json(savedKurant)
        console.log("Kurant added successfully: " + savedKurant)
    } catch(err) {
        res.status(500).json({msg : err.message})
    }
})

module.exports = router;