require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const {createServer} = require('http');
const {Server} = require('socket.io');
const messageRouter = require('./routes/messageRoute');
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/gorupRouter');
const connectDB = require('./db');

connectDB();

const server = createServer(app);
const io = new Server(server,{
    cors: {
      origin: "http://localhost:5173"
    }
  });

app.use(cors({
 origin:'http://localhost:5173',
 credentials:true
}))

app.use(express.json());


app.get('/',(req,res)=>{
 res.json('the server is online');
})

app.use('/user',userRouter);
app.use('/messages',messageRouter);
app.use('/group',groupRouter);

 global.onlineUsers = new Map();
 const groups = {};

io.on('connection',(socket)=>{
   global.chatScoket = socket;

     console.log('a user connected');
     socket.on('add-user',(userId)=>{
      onlineUsers.set(userId,socket.id);
      console.log('add user',onlineUsers);
     })

     socket.on('send-dm-message',(data)=>{
      const sendUserSocket = onlineUsers.get(data.to);
    //  console.log(data);

      if(sendUserSocket){
        console.log('server recived dm msg',data.text);
        socket.to(sendUserSocket).emit("msg-recived",{
          from:data.from,
          to:data.to,
          username:data.username,
        text:data.text
        });
      }
     })
  
     socket.on('joinGroup', ({ groupId, userId }) => {
      socket.join(groupId);
      if (!groups[groupId]) {
        groups[groupId] = [];
      }
      groups[groupId].push(socket.id);
    });

    socket.on('send-groupMessage', (data) => {
     // io.to(data.to).emit('recived-groupMessage', { 
     socket.to(data.to).emit('recived-groupMessage', { 
        from:data.from,
        to:data.to,
        text:data.text
         });
    });

     socket.on('disconnect',()=>{
     console.log('a user disconnected');
    })
})


server.listen(PORT,()=>{
 console.log(`the server is littening at port ${PORT}...`);
})

/* socket.on('join-room',(data)=>{
      socket.join(data);
     }) */

   /*  socket.on('message-send',(data)=>{
      console.log(data);
      

       io.to(data.room).emit('message-recived',{ //io.on will emit the message to all the users of the room including the sender
        username:data.username,
        text:data.message
      });
     }); */