const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    group: {type: String, required: true}, 
    id: { type: String, required: true, unique: true}
})

const User = module.exports = mongoose.model("user", userSchema)