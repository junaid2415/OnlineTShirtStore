require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');

// const stripe

// my routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripepayment')

 
app.use((cors()))
// my db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(
    ()=>{
        console.log(" DB CONNECTED")
    }
);

const port = 8000;

//my middle-ware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors()) 


// Routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api', stripeRoute);


// starting server
app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
});


