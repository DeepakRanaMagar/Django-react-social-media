import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import Toaster from "../Toaster";
import { Context }from "../Layout";

function CreatePost(props){
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    
    const [form, setForm] = useState({
        author: "",
        body: "",
    });
    
    const user = getUser();
    
    const { setToaster } = useContext(Context);
    
    const { refresh } = props;
    
    const handleClose =() =>setShow(false);
    const handleShow =() => setShow(true);
    const handleSubmit = (event) => {
        event.preventDefault();
        const createPostForm = event.currentTarget;

        if(createPostForm.checkValidity() === false){
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            author: user.id,
            body: form.body,
        };

        axiosService
            .post("/post/",data)
            .then( () => {
                handleClose();
                setToaster({
                    type:"success",
                    message: "Posted!",
                    show: true,
                    title: "Post Success",
                });                
                setForm({});
                refresh();
            })
            .catch(() =>{
                setToaster({
                    type: "error",
                    message: "Something went wrong!",
                    show: true,
                    title: "Post Failed",
                });
            });
    };

    return(
        <>
            <Form.Group className="my-3 w-75">
                <Form.Control
                    className="py-2 rounded-pill border-primary text-primary"
                    type ="text"
                    placeholder="What's on your mind?"
                    onClick={handleShow}
                >
                </Form.Control>
            </Form.Group>

            <Modal show={show} onHide={handleClose}>                
                {/* Modal header */}
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>
                        Create Post
                    </Modal.Title>
                </Modal.Header>

                {/* Modal body */}
                <Modal.Body className="border-0">
                    <Form 
                        noValidate 
                        validated={validated}
                        onSubmit = {handleSubmit}
                    >
                        <Form.Group className="mb-3">
                            <Form.Control
                                name="body"
                                value={form.body}
                                onChange={(e) => setForm({...form, body: e.target.value})}
                                as="textarea"
                                rows={3}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                {/* Modal Footer  */}
                <Modal.Footer>
                    <Button 
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={form.body === !form.body}
                        >
                            Post
                        </Button>
                </Modal.Footer>
            </Modal>     
        </>
    );
};
export default CreatePost;