import React, { useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import Toaster from "../Toaster";

function UpdatePost(props) {
    const { post, refresh } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow= ()=> setShow(true);

    return(
        <>
            <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
            
            <Modal show={show} onHide={handleClose}>

            </Modal>
        </>
    );
}
export default UpdatePost;