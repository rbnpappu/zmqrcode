const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config



// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service provider
  auth: {
      user: 'connect@zmqrcode.com', // Your email address
      pass: ''  // Your email password or app-specific password
  }
});





//___________________________________CREATE USER___________________________________
const registerUser = async function (req, res) {
    try {
      const requestBody =req.body
        
      const {  firstName ,lastName,email,mobile,username,password} =requestBody ;
  
     //============================================User creation ==================================
      const newUser = await userModel.create(requestBody);
      res.status(201).send({ status: true, message: "New user registered successfully", data: newUser });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  };

  let mailOption = {
    from:'connect@zmqrcode.com',
    to:'user.email',
    subject:'Registration Successful',
    text:'Registration successful and Welcome to our platform'
}

transporter.sendMail(mailOption,function(error,info){
    if(error){
        console.log(error);
         //return res.status(500).json({ msg: 'Email could not be sent' });

    }else{
        console.log(`Email Sent: `+info.response);
        //return res.json({ token, msg: 'User registered and email sent' });

    }
})
  


  const secretKey = 'sonupk';

  // Login function
  const login=async function (req, res)  {
        let loginData=req.body
      const { username, password } = req.body;
  
      // Check if user exists 
      const user = await userModel.find({username: loginData.username,password: loginData.password});
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '30' });
  
      res.json({ message: 'Login successful', token });
  };


  // Forgot Password Endpoint
const forgotPassword=async function (req, res) {
  const { email } = req.body;
  const user = await userModel.find({email: loginData.email});

  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }
   // Generate 6-digit OTP
   const otp = Math.floor(100000 + Math.random() * 900000).toString();

   let mailOptions1= {
    from: 'connect@zmqrcode.com',
    to: email,
    subject: 'Password Reset OTP',
    text: 'Your OTP for password reset is ${otp}.',
};
transporter.sendMail(mailOptions1, (error, info) => {
  if (error) {
      return res.status(500).json({ message: 'Failed to send OTP via email', error });
  } else {
      //console.log(Email sent: ${info.response});
      // Save OTP to the user's record in a database
      user.otp = otp; 
      user.otpExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // Set expiry to 1 month

      res.status(200).json({ message: 'OTP sent to your email' });
}});
}





  

  
  





  module.exports={registerUser,login,forgotPassword}
  