import React, { useContext } from "react";
import { Context } from "./Layout";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser, useUserActions } from "../hooks/user.actions";
import { randomAvatar } from "../utils";

function NavigationBar() {
    const { setToaster } = useContext(Context);

    const userActions = useUserActions();

    const user = getUser();

    const handleLogout = () => {
    
        userActions.logout().catch((e) => 
            setToaster({
                type: "danger",
                message: "Logout failed",
                show: true,
                title: e.data?.detail | "An error occurred.",
            })
        );
    };

    console.log(user);
    return (
        <Navbar bg="secondary" variant="dark">
            <Container>
        
                <Navbar.Brand className="fw-bold" as={Link} to={`/`}>
                    Flexogram
                </Navbar.Brand>
        
                <Navbar.Collapse className="justify-content-end">
        
                    <Nav>
                        <NavDropdown
                            title={
                                <Image alt="NavImage" src={randomAvatar()} roundedCircle width={36} height={36} />
                            }
                            >
                            <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}>
                                Profile
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={handleLogout}>
                                Logout    
                            </NavDropdown.Item>
                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;