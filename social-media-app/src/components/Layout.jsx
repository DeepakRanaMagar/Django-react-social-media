import React from "react";
import Navigationbar from "./Navbar";
import React, { createContext, useMemo, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Toaster from "./Toaster";
import { useNavigate }


function Layout(props){
    return (
        <div>
            <Navigationbar/>
            <div className="container m-5">{props.children}</div>
        </div>
    );
}

export default Layout;