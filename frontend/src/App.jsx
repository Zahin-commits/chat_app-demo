import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Login } from './components/Login';

function App() {
  
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App






/* import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect('http://localhost:3000');

function App() {
  const [msg,setMsg] = useState('');
  const sendMsg = ()=>{
   socket.emit('send-msg',{message:msg});
  }

  useEffect(()=>{
    socket.on('receive-msg',(data)=>{
      console.log(data);
    })
  },[socket]);

  return (
    <>
     <div>
      <h1>chat app</h1>

    <input type="text" value={msg} onChange={e=>setMsg(e.target.value)} />
    <button onClick={sendMsg} >send</button>
     </div>
    </>
  )
}

export default App
 */