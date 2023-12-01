import { useEffect, useState } from "react";
import { socket } from "../scoket";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GroupMsg } from "./GroupMsg";
export const Home = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || ''; 

    const [msg,setMsg] = useState('');
    const [recivedMsg,setRecivedMsg] = useState(null);
    const [allMsgs,setAllMsgs] = useState([]);
    const [userList,setUserList] = useState([]);
    const [groupList,setgroupList] = useState([]);
    const [showPopup,setShowPopup] = useState(true); 
    const [room,setRoom] = useState('');
    const [isRoomSet,setIsRoomSet] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    // const [socketIo,setSocketIo] = useState(null);
    const navigate = useNavigate();
  
    const handleGetAllMessage = async(type)=>{
     // if(selectedUser){
      if(type=="inbox"){
      const {data} = await axios.post("http://localhost:3000/messages/getmsg",{
        from:userInfo._id,
        to:selectedUser._id
      });
      if(data) return data;
      // console.log('handle all msg data',data);
  //  }else if(selectedGroup){
    }else if(type=='group'){
      const {data} = await axios.post("http://localhost:3000/group/msg",{
        groupId:selectedGroup?._id
      });
      if (data) return data;
    }
       /* if(data){
         return data;
       } */
    }

    const getUserList = async()=>{
      const {data} = await axios.get('http://localhost:3000/user/userlist');
      if(data.success){
         setUserList(data.userList);
         console.log('userlist', data.userList);
      }else{
        return console.log(data);
      }
    }
    const getGroupList = async()=>{
      const {data} = await axios.get('http://localhost:3000/group');
      if(data.success){
         setgroupList(data.groupList);
         console.log('grouplist', data.groupList);
      }else{
        return console.log(data);
      }
    }
        useEffect(()=>{
        if(!localStorage.getItem('userInfo')){
          navigate('/register');
        }else{
          socket.emit('add-user',userInfo._id);
           getUserList(); 
           getGroupList();
          
        }
      },[]);
  
    useEffect(()=>{
      /* socket.on('message-recived',(data)=>{
        console.log(data);
        setRecivedMsg(data);
      }) */
      socket.on('msg-recived',(data)=>{
        console.log(data);
        setRecivedMsg(data);
      })

      socket.on('recived-groupMessage',(data)=>{
        console.log(data);
        setRecivedMsg(data);
      })
    },[socket])
  
    useEffect(()=>{
      if(userInfo.username){
        setShowPopup(false);
  
       /*  const data = handleGetAllMessage();
        //console.log('get msg', data);
        data.then((res)=>{
        console.log('res',res);
        setAllMsgs(res);
      }); */
      }
    },[])
  
    useEffect(()=>{
      if(recivedMsg){
         setAllMsgs((prev) => [...prev, recivedMsg]);
        /*  const newMsgroup = allMsgs.push(recivedMsg);
         setAllMsgs(newMsgroup); */
      }
    },[recivedMsg]);

    useEffect(()=>{
      if(selectedUser){
        setSelectedGroup(null);
        const data = handleGetAllMessage('inbox');
        //console.log('get msg', data);
        data.then((res)=>{
        console.log('res',res);
        setAllMsgs(res);
      });
      }
    },[selectedUser]);

  
    useEffect(()=>{
      if(selectedGroup){
        setSelectedUser(null)
        const data = handleGetAllMessage('group');
        //console.log('get msg', data);
        data.then((res)=>{
        console.log('res',res);
        setAllMsgs(res);
        socket.emit('joinGroup', { groupId: selectedGroup?._id, userId: selectedUser?._id });
      });
      }
    },[selectedGroup])

   /*  useEffect(()=>{
      if(selectedUser){
        setSelectedGroup(null);
        const data = handleGetAllMessage();
        //console.log('get msg', data);
        console.log(data);
        data.then((res)=>{
        console.log('res',res);
      //  setAllMsgs(res);
      })}else if(selectedGroup){
        setSelectedUser(null);
        const data = handleGetAllMessage();
        //console.log('get msg', data);
        console.log(data);
        data.then((res)=>{
        console.log('res',res);
       // setAllMsgs(res);
      })
      }
      
    },[selectedUser,selectedGroup]); */

  
    const joinRoom = ()=>{
      if(room){
      socket.emit('join-room',room);
      setIsRoomSet(true);
       }
    }
  
    const sendMsg = async()=>{
      if(selectedUser){
      const {data} = await axios.post('http://localhost:3000/messages/addmsg',{
       from:userInfo._id,
       to:selectedUser._id,
       text:msg
      });
  
      /* socket.emit('message-send',{
        room,
        form:userInfo._id,
        username:userInfo.username,
        message:msg
      }); */
      //if(selectedUser){
        socket.emit('send-dm-message',{
        from:userInfo._id,
        to:selectedUser._id,
        username:userInfo.username,
        text:msg
      });        

      const msgs = [...allMsgs];
        msgs.push({
          from:userInfo._id,
          to:selectedUser._id,
          text:msg
        });
        setAllMsgs(msgs)


      //  console.log('all mesgs:',allMsgs);
      }else if(selectedGroup){
        const {data} = await axios.post('http://localhost:3000/group/addmsg',{
          from:userInfo._id,
          to:selectedGroup._id,
          text:msg
         });

         socket.emit('send-groupMessage',{
          from:userInfo._id,
          to:selectedGroup._id,
          text:msg
        });      

         const msgs = [...allMsgs];
        msgs.push({
          from:userInfo._id,
          to:selectedGroup._id,
          text:msg
        });
        setAllMsgs(msgs)
      }
    
      setMsg('');
    }

  return (
    <>
    <div>

     <h1>basic socket chat</h1>
     <h2>username: { (!showPopup) && userInfo.username}</h2>
    {/*  <h2>room: {isRoomSet && room}</h2> */}
     <h2>{selectedUser?'selected user':''} {selectedGroup?"selected group":''}</h2>

    <div className="userList">
      { userList?.map((user)=>(
        <div key={user._id} onClick={()=>setSelectedUser(user)} 
          className={`${((user?._id==userInfo?._id)?"self":'')} ${((user?._id==selectedUser?._id)?"selected":'')}`} >
           <h3>{user?.username}</h3>
        </div>
      ))}
    </div>
    <div className="userList groupList">
      { groupList?.map((group)=>(
        <div key={group._id} onClick={()=>setSelectedGroup(group)} 
          className={`${((group?._id==selectedGroup?._id)?"selected":'')}`} >
           <h3>{group?.groupName}</h3>
        </div>
      ))}
    </div>
        {/* (<div>
         <input type="text" placeholder="enter the room name" value={room} onChange={e=>setRoom(e.target.value)} />
          <button onClick={joinRoom}>enter</button>
       </div>)  */}
         <div>
        
            {(selectedUser) &&   selectedUser?.username}

      { (selectedUser) &&( <div>  {allMsgs?.map((msg,index)=>(
     <p key={index}>{(msg?.from==userInfo._id)?userInfo.username:selectedUser.username}:{msg.text}</p>
   ))}
      <div className='msg_input--container'>
        <input type="text" id='msg_input' placeholder="send a message" value={msg} onChange={e=>setMsg(e.target.value)} />
        <button onClick={sendMsg} >send</button>
      </div>
     </div> )}

     { (selectedGroup) &&( <div>  
     <div className="group-msg-container">
     {allMsgs?.map((msg,index)=>(
     /*  <p key={index}>{(msg?.from==userInfo._id)?userInfo.username:'username'}:{msg.text}</p> */
      <GroupMsg key={index} msg={msg} />
     ))}
   </div>
      <div className='msg_input--container'>
        <input type="text" id='msg_input' placeholder="send a message" value={msg} onChange={e=>setMsg(e.target.value)} />
        <button onClick={sendMsg} >send</button>
      </div>
     </div> )}
         </div>

      <br />

    </div>
   </>
  )
}
