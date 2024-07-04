const connectToMongo = require("./db");
const express = require('express')
require('dotenv').config();

var cors = require('cors')

connectToMongo();
const app = express()
const PORT =5000
// const PORT = process.env.PORT ;
// console.log(PORT)

app.use(cors())
app.use(express.json())
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/product',require('./routes/product'))
app.use('/api/category',require('./routes/category'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/order',require('./routes/order'))
app.use('/api/search',require('./routes/search'))
app.use('/api/address',require('./routes/address'))

// app.get('/', (req, res) => {
//     res.send('Hello Word')
// })


app.listen(PORT, () => {
    console.log(`E-comm app listening on port ${PORT}`)
})