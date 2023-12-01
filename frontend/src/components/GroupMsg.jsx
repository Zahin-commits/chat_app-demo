import axios from 'axios';
import React, { useState } from 'react'

export const GroupMsg = ({msg}) => {
    const [userData,setUserData] = useState({});
    useState(()=>{
     // console.log('msg user id:',msg.from)
      const res = axios.get(`http://localhost:3000/user/user/${msg.from}`);
      res.then(({data})=>{
       // console.log('user data',data);
       setUserData(data);
      })
    },[msg.from]);

  return (
    <div className='msg-box'>
      {userData?.username}: {msg.text}
    </div>
  )
}
