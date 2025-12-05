
const User = require("../models/user");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword=await bcrypt.hash(password,10)
    const isExistingUser = await User.findOne({ username: username});
    if (isExistingUser) {
      return res.status(400).json({ msg: "username already exists" });
    }
    await User.create({
      username,
      password:hashedPassword,
    });

    res
      .status(200)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

const login =async(req,res)=>{


const {username,password}=req.body
   const dbUser = await User.findOne({username:username})
   
if(dbUser){
  const isPasswordMatched=await bcrypt.compare(password,dbUser.password)

  if(isPasswordMatched===true){
    const payload={username:username}
    const jwtToken= jwt.sign(payload,"MY_SECRET_TOKEN")
  res.status(200).send({jwtToken})
}else{
  const errMsg="Invalid Password"
   res.status(400).send({errMsg})
}
}else{
  const errMsg="Invalid Username"
   res.status(400).send({errMsg})
}
}
module.exports = { register,login};
