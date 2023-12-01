const User = require("../model/User");

exports.createUser = async(req,res)=>{
 const {username,email,password} = req.body;

 if(!username||!email||!password){
  return res.status(400).json({message:"invalid credentials"}); 
 }
 try {
  const user = await User.create({username,email,password});
  
  res.status(200).json({ success:true, user});
 } catch (error) {
    res.status(500).json(error);
 }
};

exports.login = async(req,res)=>{
 const {email,password} = req.body;
  if(!email||!password){
    return res.status(400).json({message:"invalid credentials"}); 
   }
 try {
    const user = await User.findOne({email});

    if(user.password === password){
     return res.json({ success:true, user});
    }else{
     res.status(400).json('invalid credentails')
    }
 } catch (error) {
    res.status(500).json(error);
 }
}

exports.getAllUser = async(req,res)=>{
 try {
   const userList = await User.find();

   res.json({success:true,userList});
 } catch (error) {
   res.status(500).json(error);
 }
}

exports.getOneUser = async(req,res)=>{
  const id = req.params.id;
   try {
    const user = await User.findById(id);
    res.json(user);
   } catch (error) {
   res.status(500).json(error);
   }
}