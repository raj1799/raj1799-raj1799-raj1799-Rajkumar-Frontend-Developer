
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Collapse, Container } from "reactstrap";
import logo from "../../assets/images/logo2.png"
import { FiMenu } from 'react-icons/fi';

const NavBar = () => {

    const [collapsed, setCollapsed] = useState(true)
    const toggleNavbar = () => setCollapsed(!collapsed)

    return (
        <Navbar className="py-2 " expand="lg">
            <Container className="d-flex justify-content-between">
                <div className="navbar-collapse d-flex flex-row justify-content-between py-4">
                    <NavbarBrand>
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                    </NavbarBrand>
                    <button
                        aria-expanded={collapsed}
                        className="navbar-toggler navbar-toggler"
                        onClick={toggleNavbar}
                    >
                        <FiMenu color="white" size="24" />
                    </button>
                </div>
                <Collapse isOpen={!collapsed} navbar className="position-nav">
                    <div className="d-flex flex-column flex-lg-row justifty-content-start justifty-content-lg-between bg-service p-4 align-items-start align-items-lg-center">
                        <Nav className="nav-link-space d-flex flex-column flex-lg-row">
                            <NavItem>
                                <Link>Home</Link>
                            </NavItem>
                            <NavItem>
                                <a href="#search">Search</a>
                            </NavItem>
                        </Nav>

                    </div>
                </Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar