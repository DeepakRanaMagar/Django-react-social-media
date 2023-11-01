import React from "react";
import { randomAvatar } from "../utils";
import { Navbar, Container, Image, NavDropDown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navigationbar(){
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem("auth");
        navigate("/login/");
    };
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="#home"
                    Check Me Out 
                ></Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropDown
                            title={
                                <Image
                                    src = {randomAvatar()}
                                    roundedCircle
                                    width={36}
                                    height={36}
                                ></Image>
                            }
                        >
                            <NavDropDown.Item href="#Profile">Profile</NavDropDown.Item>
                            <NavDropDown.Item onClick= {handleLogout}>Logout</NavDropDown.Item>

                        </NavDropDown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;