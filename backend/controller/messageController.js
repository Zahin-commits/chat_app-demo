const Message = require("../model/Message");

exports.getAllMessage = async(req,res)=>{
  try {
    const {from,to} = req.body;

    /* const messages = await Message.find({
     users:{$all:[from,to]}
    }).sort({updatedAt:1}); */
    const messages = await Message.find({$or:[{$and:[{from},{to}]},{$and:[{from:to},{to:from}]}]})//.sort({updatedAt:1});

    /* const projectMessages = messages.map((msg)=>{
        return{
         fromSelf:msg.sender.toString() == from,
         message:msg.message.text
        }
    }); */
    res.json(messages);
 } catch (error) {
   res.json(error);
 }
}

exports.createMessage = async(req,res)=>{
    const {text,username,from,to} = req.body;
 try {
   const message = await Message.create({
    from,
    to,
    text
   })

   res.json(message);
 } catch (error) {
   res.json(error);
 }
}