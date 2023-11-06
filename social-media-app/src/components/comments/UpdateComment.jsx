import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToogleIcon";

function UpdateComment(props){
    const { postId, comemnt, refresh } = props;
    const [show, setShow] = useState(false);
    const [ validated, setValidated ] = useState(false);
    const [ form, setForm ] = useState({
        author: Comment.author.id,
        body: Comment.body,
        post: postId
    });

    const { toaster, setToaster } = useContext(Context);
    const handleShow = ()=> setShow(true);
    const handleClose = ()=> setShow(false);

    const handleSubmit = (event)=>{
        event.preventDefault();
        const updateCommentForm = event.currentTarget;

        if(updateCommentForm.checkValidity() === false){
            event.stopPropagation();
        }

        setValidated(true);

        const data = {
            author: form.author,
            body: form.body,
            post: form.post,
        };

        axiosService
            .put(`/post/${postId}/comment/${Comment.id}/`, data)
            .then( ()=> {
                handleClose();
                setToaster({
                    type:"success",
                    message: "Comment Updated!",
                    show:true,
                    title: "Success",
                });
                refresh();
            })
            .catch((error) => {
                setToaster({
                    type:"danger",
                    message:"An Error occurred.",
                    show:true,
                    title:"Error!",
                });
            });
    };

    return(
        <>
            <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>

            {/*  Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>
                        Update Post
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                name="body"
                                value={form.body}
                                onChange={ (e) => setForm({
                                    ...form,
                                    body: e.target.value
                                })}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
export default UpdateComment;