import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import Toaster from "../Toaster";

function CreatePost(props){
    const [show, setShow] = useState(false);
    const handleClose =() =>setShow(false);
    const handleShow =() => setShow(true);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});

    const user = getUser();

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const { refresh } = props;

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
                setToastMessage("Post Created 🚀");
                setToastType("success");
                setForm({});
                setShowToast(true);
                refresh();
            })
            .catch(() =>{
                setToastMessage("Failed!");
                setToastType("danger");
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
                                value="form.body"
                                onChange={(e) => setForm({...Form, body: e.target.value})}
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
                        disabled={form.body === undefined}
                        >
                            Post
                        </Button>
                </Modal.Footer>
            </Modal>

            {/* Toaster */}
            <Toaster
                title="Post!"
                message = {toastMessage}
                showToast = {showToast}
                type = {toastType}
                onClose = { () => setShowToast(false)}
            >
            </Toaster>        
        </>
    );
};
export default CreatePost;