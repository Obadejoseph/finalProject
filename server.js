require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8080
const db = process.env.db
const userRouter = require('./router/userRouter')

const app = express();
app.use(express.json());
app.use('/api/v1',userRouter)

// app.use(cors())

app.use((error,req,res,next)=>{
    if (error) {
     return   res.status(500).json({
            message: error.message
        })
    };
    next();
})

mongoose
.connect(db)
.then(()=>{
    console.log(`db is running perfectly`);
    app.listen(PORT,()=>{
        console.log(`server is running on port :${PORT}`);
        
    })
}).catch((error)=>{
    console.error(`${error.message} internal db error conection`);
    
})