const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config()

//set up server
const app = express()
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`))

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true
}))


//connect to mongoose 
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, 
    { 
        useNewUrlParser: true,      // till för att ta bort error, mongoose byter ut sin kod snart typ
        useUnifiedTopology: true,   // samma som ovan  
        useCreateIndex: true     
    }, 
    (err) => {
        if (err) throw err;
        console.log('MongoDB connection established.')
    }
)

//set up routes
app.use("/admin", require('./routes/adminRouter'))
app.use("/user", require('./routes/userRouter'))
app.use("/kurant", require('./routes/kurantRouter'))
