import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserActions } from "../../hooks/user.actions"
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function LoginForm() {
    // const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        email:"",
        password:"",
    });

    const [error, setError] = useState(null);
    const userActions = useUserActions();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;

        if(loginForm.checkValidity() === false){
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            email: form.email,
            password: form.password,
        };

        userActions.login(data).catch((err)=>{
            if (err.message){
                setError(err.message);
            }
        });
        // axios
        //     .post("http://localhost:8000/api/auth/login/", data)
        //     .then((res) => {
        //         //Registering the account and tokens in the store
        //         localStorage.setItem("auth", JSON.stringify({
        //             access:res.data.access,
        //             refresh:res.data.refresh,
        //             user: res.data.user,
        //         }));
        //         navigate("/");
        //     })
        //     .catch((err) => {
        //         if(err.message){
        //             setError(err.request.response);
        //         }
        //     });
    };
    return(
        <Form
            id = "registration-form"
            className="border p-4 rounded"
            noValidate
            validated = {validated}
            onSubmit={handleSubmit}
        >
            <Form.Group className="mb-3">
                {/* <Form.Label>Username</Form.Label> */}
                <Form.Control
                    value = {form.email}
                    onChange = {(e) => setForm({ ...form, email: e.target.value})}
                    required
                    type="text"
                    placeholder="Email"
                ></Form.Control>
                <Form.Control.Feedback type = "invalid">
                    Email must be entered.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                    value = {form.password}
                    minLength="8"
                    onChange={ (e) => setForm({...form, password:e.target.value})}
                    required
                    type="password"
                    placeholder="Password"
                ></Form.Control>
                <Form.Control.Feedback type = "invalid">
                    Password must be entered.
                </Form.Control.Feedback>
            </Form.Group>

            <div className="text-content text-danger">
                { error && <p>{ error }</p>}
            </div>

            <Button variant="primary" type="submit">Login</Button>
        </Form>
    );
}

export default LoginForm;