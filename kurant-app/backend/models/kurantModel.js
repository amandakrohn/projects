const mongoose = require('mongoose')

const kurantSchema = new mongoose.Schema({
    username: { type: String, required: true },
    group: { type: String, required: true }, 
    id: { type: String, required: true },
    money: { type: Number, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
    note: { type: String, required: false }
})

module.exports = mongoose.model("kurant", kurantSchema)