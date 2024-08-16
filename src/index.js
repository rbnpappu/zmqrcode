const express=require('express')
const mongoose=require('mongoose')
const route=require('./route/route.js')
require('dotenv').config

const app=express()
app.use(express.json())



mongoose.connect('mongodb+srv://sonuk:kamble123@cluster0.vfrmzq9.mongodb.net/zmqr-DB', {
    useNewUrlParser: true,
    
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
  app.use('/',route)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});