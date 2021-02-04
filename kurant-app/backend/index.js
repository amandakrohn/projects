const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

//set up express
const app = express()
app.use(express.json())
app.use(cors())

/*här byter man till en publik port (ex med heruko)
då använder den env-variabeln PORT (den måste då ligga)
i en env-fil (?) lite oklart, men det löser sig*/
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`))

//set up mongoose 
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
app.use("/admins", require('./routes/adminRouter'))
app.use("/users", require('./routes/userRouter'))
app.use("/api/kurant", require('./routes/kurantRouter'))
