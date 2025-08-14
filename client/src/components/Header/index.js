import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
// Material UI icons for better UX
import PhoneIcon from '@material-ui/icons/Phone'
import ContactlessIcon from '@material-ui/icons/Contactless'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Avatar from '@material-ui/core/Avatar'

import './Header.css'
import UserModal from '../UserModal'
import { UserContext } from '../../utils/Context/user'

// Main navigation header component
const Header = ({ isModalOpen, setIsModalOpen }) => {
    const currentUser = useContext(UserContext)
    // Helper function to get user's first letter for avatar
    const getUserInitial = () => {
        if (currentUser.user && currentUser.user.firstName) {
            return currentUser.user.firstName.charAt(0).toUpperCase()
        }
        return '?'
    }

    // Handle user logout
    const handleLogout = () => {
        if (currentUser && currentUser.userLogout) {
            currentUser.userLogout()
        }
    }

    // Show login modal
    const showLoginModal = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" className="header" expand="lg">
                <Container>
                    <div className="header__top">
                        <div className="header__topLeft">
                            <span><PhoneIcon /> 1800 1498 500</span>
                            <span><ContactlessIcon /> We Care</span>
                            <span><LocationOnIcon /> Stores</span>
                        </div>
                        
                        <div className="header__topRight">
                            {
                                currentUser.user ? (
                                    <>
                                        <span className="header__topUserName">
                                            Hello, {currentUser.user.firstName.toLowerCase()}
                                            <Avatar>{getUserInitial()}</Avatar>
                                        </span>
                                        <span onClick={handleLogout}>Logout <PowerSettingsNewIcon /></span>
                                    </>
                                ) : (
                                    <>
                                        <span onClick={showLoginModal}>User <PersonIcon /></span>
                                        <span><Link to="/admin">Admin <SettingsIcon /></Link></span>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </Container>
                <Container>
                    <Navbar.Brand>WanderLust</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="navbarCollapse">
                        <Nav variant="pills">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/user" eventKey="home">
                                    Home
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/user/treks" eventKey="treks">
                                    Treks
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/user/camps" eventKey="camps">
                                    Camps
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/user/packages" eventKey="packages">
                                    Packages
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/user/bookings" eventKey="bookings">
                                    My Bookings
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

export default Header
