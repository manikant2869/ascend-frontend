import React, {useState ,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import user from "../services/user"
import "./Login.css";
import { globalContext } from '../context/GlobalContext';
const userServ = new user();
function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState(null);
    const navigate = useNavigate()
    const {userIdentity ,setUserIdentity,setUser} = useContext(globalContext)
    const handleSubmit = async(e) => {
        e.preventDefault();
        const userdata = {username:email , password: pass}
        const result = await userServ.login(userdata);
        if(result.verified){
            setUserIdentity(true)
            setUser(()=> result.finduser)
            window.localStorage.setItem("user" ,result.finduser)
            window.localStorage.setItem("auth",true)
            navigate("/")
        }else{
            window.alert(result.message)
        }

    }



  return (
    <div className='container'>
       <form className='loginpage' onSubmit={handleSubmit}>
       <h2>LogIn</h2>
       <label htmlFor='email'>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='email' required />
        <label htmlFor='password'>Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='Password' className='password' required />
        <button className='submit-btn' type='submit'>Log In</button>
        <h2 style={{color:"red"}}>{ confirm ? confirm : null }</h2>
        <button className='link-btn'><Link to= "/signup">Don't have an account? Register here</Link></button>

       </form>
      
      
    </div>
  )
}

export default Login;