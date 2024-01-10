import React, { useContext, useEffect, useState } from "react";
import { Link ,json,useNavigate } from "react-router-dom";
import { globalContext } from "../context/GlobalContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function Navbar(props) {
  console.log(props.value)
  const navigate = useNavigate()
  const { userIdentity ,setUserIdentity ,setUser} = useContext(globalContext);
  const [username, setUsername] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  useEffect(() => {
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      const username = user.first_name + " " + user.last_name;
      setUsername(username);
    }
  }, [userIdentity]);
  function handleLogout(){
    window.localStorage.clear();
    setUserIdentity(false)
    setUser({})
    setUsername(null)
    setShowLogout(!showLogout)
    navigate("/login") 
  }
  return (
    <nav className="navbar row m-0 p-2 navbar_item">
      
        
          <div className={username? "col-10" : "col-9"} >
            {username ?<h1 className="ms-5">Welcome {username}</h1> : <h1 className="ms-5">Task Application</h1>  }  
          </div>
          <div className={username? "col-1" : "col-2"}>
        {username ? (
          <button
              type="button"
              className="btn btn-danger  m-2 p-3 text-dark border-black"
              onClick={handleLogout}
            >
              logout
            </button>
        ) : (
          <Link to="/signup">
            <button
              type="button"
              className="btn btn-outline-secondary m-2 p-3 text-dark border-black"
            >
              Sign In/ Register
            </button>
          </Link>
        )}
        </div>
        
      
    </nav>
  );
}
