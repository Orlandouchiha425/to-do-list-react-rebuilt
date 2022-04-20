
require('dotenv').config();
const express= require('express')
const app=express()
const PORT = process.env.PORT || 3000;
const toDoController=require('./controllers/todolist')
const cors=require('cors')

//Midd
app.use(cors())


app.use(express.json())
app.use('/todo',toDoController)

app.listen(PORT,()=>{console.log(`i am connected to ${PORT}`)})