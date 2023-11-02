import React from "react";
import NavigationBar from "./Navbar";

function Layout(props){
    return(
        <div>
            <NavigationBar/>
            <div className="container m-5">{props.children}</div>
        </div>
    );
}
export default Layout;
