import React, { useState, useContext } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/useActions";
import { Context } from "../Layout";

function UpdateProfileForm(props){
    const { profile } = props;
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(profile);
    const [error, setError] = useState(null);

    const userActions = useUserActions();

    const [avatar, setAvatar] = useState();

    const { toaster, setToaster} = useContext(Context);

    const handleSubmit = (event)=>{
        event.preventDefault();
        const updateProfileForm = event.currentTarget;

        if(updateProfileForm.checkValidity() === false){
            event.stopPropagation();
        }

        const data = {
            first_name: form.first_name,
            last_name: form.last_name,
            bio: form.bio,
        };

        const formData = new FormData();

        Object.keys(data).forEach((key)=>{
            if(data[key]){
                formData.append(key, data[key]);
            }
        });

        if (avatar){
            formData.append("avatar", avatar);
        }

        
    };
    return(
        // UI code
    );
}
export default UpdateProfileForm;