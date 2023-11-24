import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/authentication/RegistrationForm";

function Registration(){
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="content text-center px-4">
                        <h1 className="text-primary">
                            Welcome bro
                        </h1>
                        <p className="content">
                            This is a demo social media type sssss that allows to share posts. 
                            <br />
                            Register Now.
                            <br />
                            <Link to="/login/">Login</Link>
                        </p>
                    </div>
                </div>
                <div className="col-md-6 p-5">
                    <RegistrationForm></RegistrationForm>
                </div>
            </div>
        </div>
    );
}

export default Registration;