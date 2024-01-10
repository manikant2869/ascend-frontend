import { createContext , useState } from "react";

export const globalContext = createContext();
function GlobalContext({children}){
    const [userIdentity,setUserIdentity] = useState(window.localStorage.getItem("auth")? true: false);
    const [user,setUser] = useState(JSON.parse(window.localStorage.getItem("user")));

    return(
        <globalContext.Provider value={{userIdentity,setUserIdentity,user,setUser}} >

            {children}
        </globalContext.Provider>
    )

}
export default GlobalContext;