const express = require('express');
const cors = require ('cors')
require('dotenv').config()

const app = express();
var corOptions ={
    origin: 'http://localhost:4001'
}

app.use(cors(corOptions));
const loginRoute = require('./routes/loginRoutes')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/Login',loginRoute);

app.use((req, res, next)=>{
    const  err = new Error("Not Found");
    err.status = 404
    next(err)
})
// error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})