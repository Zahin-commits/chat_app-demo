import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('userInfo')){
      navigate('/');
    }
  },[]);

  const handleSubmit =async(e)=>{
    e.preventDefault();
     const {data} = await axios.post('http://localhost:3000/user/login',{
      email,
      password
     });
if(data.success && data.user){
    console.log("user logged in");
    localStorage.setItem("userInfo",JSON.stringify(data.user));
    navigate('/');
}else{
 console.log('error',data);
}
  }

  return (
    <div>
        <h1>login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/> <br />
            <input type="password" placeholder="password"  onChange={(e)=>setPassword(e.target.value)}/> <br />

            <button>submit</button>
        </form>

        Don't have an account? <Link to={'/register'}>sign up</Link>
    </div>
  )
}
