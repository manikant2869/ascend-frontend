import React from "react";
import Navbar from "./Navbar";


function DefaultLayout({ children}) {
    return (
        <div>
            <Navbar />
            { children }
        </div>
        
    )

}
export default DefaultLayout