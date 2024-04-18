const express = require("express")
const app = express()
const cors = require('cors')
const connectDB = require('./database/db')

const router = require('./routes/routes')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

dotenv.config()

const PORT = process.env.PORT
const Url = process.env.URL

let corsoption ={
    origin : ['http://localhost:5500']
}

connectDB(Url)
app.use(cors(corsoption)) // Apply CORS middleware here
app.use(function(req, res, next) {
    console.log('Request Origin:', req.headers.origin);
    next();
});
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', router)

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server started on port number :${PORT}`)
    }
})
