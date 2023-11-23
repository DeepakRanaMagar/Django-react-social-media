import React, { useState, useContext } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/user.actions";
import { Context } from "../Layout";

function UpdateProfileForm(props){
    const navigate = useNavigate();
    const { setToaster} = useContext(Context);
    const userActions = useUserActions();
    
    const [validated] = useState(false);
    const [error, setError] = useState(null);
    
    const { profile } = props;
    const [form, setForm] = useState(profile);

    const [avatar, setAvatar] = useState();




    const handleSubmit = async (event)=>{
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
        console.log(avatar);
        userActions
            .edit(formData, profile.id)
            .then( ()=> {
                setToaster({
                    type: "success",
                    message: "Profile updated successfully",
                    show: true,
                    title: "Updated",
                });
                navigate(-1);
            })
            .catch( (err)=> {
                console.log(err);
                if(err.message){
                    setError(err.message);       
                }else{
                    setError("An error occurred while updating your profile.");
                }
            });
        
    };
    return(
        // UI code
        <Form id="registration-form" 
            className="border p-4 rounded"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >

            {/* Group for avatar  */}
            <Form.Group
                className="mb-3 d-flex flex-column">

                <Form.Label className="text-center">Avatar</Form.Label>
                
                <Image 
                    src={avatar ? URL.createObjectURL(avatar):form.avatar} 
                    roundedCircle 
                    width={120} 
                    height={120} 
                    className="m-2 border border-primary border-2 align-self-center"
                    />
                <Form.Control 
                    onChange={ (e)=> setAvatar(e.target.files[0])}
                    className="w-50 align-self-center"
                    type="file"
                    size="sm"
                />
                <Form.Control.Feedback type="invalid">
                    This file is required.
                </Form.Control.Feedback>

            </Form.Group>


            {/* Group for First Name */}
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    value={form.first_name}
                    onChange={(e)=> setForm({
                        ...form,
                        first_name: e.target.value
                    })}
                    required
                    type="text"
                    placeholder="First Name"
                />
                <Form.Control.Feedback type="invalid">This file is required.</Form.Control.Feedback>
            </Form.Group>
            
            {/* Group for Last Name */}
            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    value={form.last_name}
                    onChange={(e)=> setForm({
                        ...form,
                        last_name: e.target.value
                    })}
                    required
                    type="text"
                    placeholder="Last Name"
                />
                <Form.Control.Feedback type="invalid">This file is required.</Form.Control.Feedback>
            </Form.Group>

            {/* Group for Bio */}
            <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control 
                    value={form.bio}
                    onChange={(e)=> setForm({
                        ...form,
                        bio: e.target.value
                    })}
                    required
                    placeholder="Write your Bio (Optional)"
                    rows={3}
                />
            </Form.Group>
            
            <div className="text-content text-danger">{error && <p>{error}</p>}</div>
            
            <Button variant="primary" type="submit">
                Save changes
            </Button>
        </Form>
    );
}
export default UpdateProfileForm;