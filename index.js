const express = require('express');
const bodyParser = require('body-parser')
const adminRouter = require('./routes/Admin');
const userRouter = require('./routes/User')
const app = express();
app.use(bodyParser.json());


const PORT = 3000;

app.use('/admin',adminRouter);
app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})