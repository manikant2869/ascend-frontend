import React, {useState , useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css";
import UserService from '../services/user';
import { globalContext } from '../context/GlobalContext';
const userServ = new UserService();
function Signup() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const {userIdentity,setUserIdentity} = useContext(globalContext);
    const navigate = useNavigate()
  
    const handleSubmit =async (e) => {

        e.preventDefault();
        let userData = {password:pass, first_name:firstName,last_name:lastName,username:email}
        let result = await userServ.signup(userData)
        if(result.exist){
            window.alert(result.message)
            navigate("/signup");
        }else{
          window.alert(result.message)
          navigate("/login")
        }
        
    }


  return (
    <div className='container1'>

       <form className='registerpage' onSubmit={handleSubmit}>
       <i className="fa-solid fa-lock"></i>
       <h2>Sign Up</h2>
       <label htmlFor='name'>First Name</label>
       <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='First Name' className='name' required />
       <label htmlFor='name'>Last Name</label>
       <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder='Last Name' className='name' required />
       <label htmlFor='email'>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='email' required />
        <label htmlFor='password'>Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='Password' className='password' required />
        <button className='reg-sub-btn' type='submit'>Register</button>
        <button className='reg-btn'><Link to= "/login">Allready have an Acccount? LogIn here</Link></button>
       </form>
       
      
    </div>
  )
}

export default Signup