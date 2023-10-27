import React, { useState } from "react";
import { form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm(){
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const [error, setError] = useState(null);
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const regisrationForm = event.currentTarget;
    
        if(RegistrationForm.checkValidity() === false){
            event.stopPropagation();
        }
    
        setValidated(true);
    
        const data = {
            username: form.username,
            password: form.password,
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            bio: form.bio,
        };
    
        axios
            .post("http://localhost:8000/api/auth/register", data)
            .then((res) => {
                localStorage.setItem("auth", JSON.stringify({
                    access: res.data.access,
                    refresh: res.data.refresh,
                    user: res.data.user,
                }));
                navigate("/");
            })
            .catch((err) => {
                if (err.message){
                    setError(err.request.response);
                }
            });
    };

    return(
        <form 
            id = "registration-form"
            className="border p-4 rounded"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <form.Group className="mb-3">
                <form.Label>First Name</form.Label>
                <form.Control 
                    value={form.first_name}
                    onChange = {(e) => setForm({...form, first_name: e.target.value})}
                    required
                    type = "text"
                    placeholder="First Name"
                ></form.Control>
                <form.Control.Feedback type = "invalid">
                    This cannot be left empty.
                </form.Control.Feedback>
            </form.Group>

            <form.Group className="mb-3">
                <form.Label>Last Name</form.Label>
                <form.Control 
                    value={form.last_name}
                    onChange = {(e) => setForm({...form, last_name: e.target.value})}
                    required
                    type = "text"
                    placeholder="Last Name"
                ></form.Control>
                <form.Control.Feedback type = "invalid">
                    This cannot be left empty.
                </form.Control.Feedback>
            </form.Group>

            <form.Group className="mb-3">
                <form.Label>Username</form.Label>
                <form.Control 
                    value={form.username}
                    onChange = {(e) => setForm({...form, username: e.target.value})}
                    required
                    type = "text"
                    placeholder="username"
                ></form.Control>
                <form.Control.Feedback type = "invalid">
                    This cannot be left empty.
                </form.Control.Feedback>
            </form.Group>

            <form.Group className="mb-3">
                <form.Label>Email</form.Label>
                <form.Control 
                    value={form.email}
                    onChange = {(e) => setForm({...form, email: e.target.value})}
                    required
                    type = "email"
                    placeholder="Username"
                ></form.Control>
                <form.Control.Feedback type = "invalid">
                    This cannot be left empty.
                </form.Control.Feedback>
            </form.Group>

            <form.Group className="mb-3">
                <form.Label>Password</form.Label>
                <form.Control 
                    value={form.password}
                    minLength = "8"
                    onChange = {(e) => setForm({...form, password: e.target.value})}
                    required
                    type = "password"
                    placeholder="Password"
                ></form.Control>
                <form.Control.Feedback type = "invalid">
                    This cannot be left empty.
                </form.Control.Feedback>
            </form.Group>

            <form.Group className="mb-3">
                <form.Label>Bio</form.Label>
                <form.Control 
                    value={form.bio}
                    onChange = {(e) => setForm({...form, bio: e.target.value})}
                    required
                    as="textarea"
                    placeholder="A simple bio ... (Optional)"
                ></form.Control>
            </form.Group>
        </form>
    )
}
