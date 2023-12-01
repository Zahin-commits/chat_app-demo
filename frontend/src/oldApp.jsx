// import './App.css'
// import { useEffect, useState } from "react";
// import { socket } from "./scoket";
// import axios from "axios";

// function App() {

//   const [msg,setMsg] = useState('');
//   const [recivedMsg,setRecivedMsg] = useState(null);
//   const [allMsgs,setAllMsgs] = useState([]);
//   const [username,setUsername] = useState(localStorage.getItem('username')); 
//   const [showPopup,setShowPopup] = useState(true); 
//   const [room,setRoom] = useState('');
//   const [isRoomSet,setIsRoomSet] = useState(false);
//   // const [socketIo,setSocketIo] = useState(null);


//   const handleGetAllMessage = async()=>{
//     const {data} = await axios.post("http://localhost:3000/messages/getmsg");
//     // console.log('handle all msg data',data);
//      if(data){
//        return data;
//      }
//   }

//   useEffect(()=>{
//     socket.on('message-recived',(data)=>{
//       console.log(data);
//       setRecivedMsg(data);
//     })
//   },[socket])

//   useEffect(()=>{
//     if(username){
//       setShowPopup(false);

//       const data = handleGetAllMessage();
//       //console.log('get msg', data);
//       data.then((res)=>{
//       console.log('res',res);
//       setAllMsgs(res);
//     });
//     }
//   },[])

//   useEffect(()=>{
//     if(recivedMsg){
//        setAllMsgs((prev) => [...prev, recivedMsg]);
//       /*  const newMsgroup = allMsgs.push(recivedMsg);
//        setAllMsgs(newMsgroup); */
//     }
//   },[recivedMsg]);

//   const joinRoom = ()=>{
//     if(room){
//     socket.emit('join-room',room);
//     setIsRoomSet(true);
//      }
//   }

//   const sendMsg = async()=>{
//     const {data} = await axios.post('http://localhost:3000/messages/addmsg',{
//      username,
//      text:msg
//     });

//     socket.emit('message-send',{
//       room,
//       username,
//       message:msg
//     });

//     setMsg('');
//   }

//   return (
//     <>
//      <div>

//       <h1>basic socket chat</h1>
//       <h2>username: { (!showPopup) && username}</h2>
//       <h2>room: {isRoomSet && room}</h2>

//       {showPopup? (<div>
//          <input type="text" placeholder="set your username" value={username} onChange={e=>setUsername(e.target.value)}/>
//           <button onClick={()=>{
//             if(username){
//               setShowPopup(false);
//             }
//             localStorage.setItem('username',username);
//           }} >done</button>
//         </div>):(
//         !isRoomSet? (<div>
//           <input type="text" placeholder="enter the room name" value={room} onChange={e=>setRoom(e.target.value)} />
//            <button onClick={joinRoom}>enter</button>
//         </div>) :
//          ( <div>
//              {allMsgs?.map((msg,index)=>(
//       <p key={index}>{msg.username}:{msg.text}</p>
//     ))}
//        <div className='msg_input--container'>
//          <input type="text" id='msg_input' placeholder="send a message" value={msg} onChange={e=>setMsg(e.target.value)} />
//          <button onClick={sendMsg} >send</button>
//        </div>
//           </div>)
//         )}
    
      

   
//        <br />

//      </div>
//     </>
//   )
// }

// export default App




/* import { useEffect, useState } from "react";
import { socket } from "./scoket"

function App() {

  useEffect(()=>{
    socket.on('message-recived',()=>{
      console.log('a msg emitted');
    })
  },[socket])

  const [msg,setMsg] = useState('');
  const [recivedMsg,setRecivedMsg] = useState(null);
  const [allMsgs,setAllMsgs] = useState([]);
  // const [socketIo,setSocketIo] = useState(null);


  useEffect(()=>{
     recivedMsg && setAllMsgs((prev) => [...prev, recivedMsg]);
  },[recivedMsg]);

 
  const sendMsg = ()=>{
    socket.emit('message-send',{
      message:msg
    });

    setMsg('');
  }

  return (
    <>
     <div>
      <h1>socket setup</h1>

    {allMsgs?.map((msg,index)=>(
      <p key={index}>{msg}</p>
    ))}

      <input type="text" value={msg} onChange={e=>setMsg(e.target.value)} />
      <button onClick={sendMsg} >send</button>
       <br />

     </div>
    </>
  )
}

export default App
 */