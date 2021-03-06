import React from 'react';
import styled from 'styled-components';
import Auth from '../utils/auth';


const Navbar = () => {
    const handleLogout = () => {
        Auth.logout();
    }

    return (
        <Nav>
            <Logo>
                <ImgContainer>
                <a href='/'><img src='/images/book-icon.png' alt='book-tracker-logo' /></a>
                </ImgContainer>
            </Logo>
            <Menu>
                <a href="/saved">
                    <span>SAVED BOOKS</span>
                </a>
                <a href="/current">
                    <span>CURRENTLY READING</span>
                </a>
                <a href="/completed">
                    <span>COMPLETED BOOKS</span>
                </a>
                <a href="/login">
                    <span>LOGIN</span>
                </a>
                <a href="/signup">
                    <span>SIGNUP</span>
                </a>
                <a>
                    <span onClick={handleLogout}>LOGOUT</span>
                </a>
            </Menu>
        </Nav>
            
    );
};

const Nav = styled.div`
    width: 100%;
    height: 70px;
    background-color: #5ADE86;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.div`
    width: 10%;
`

const ImgContainer = styled.div`
    img {
        cursor: pointer;
        max-height: 70px;
        margin-left: -3rem;

        @media(max-width: 1200px) {
            margin-left: 1rem;
        }

        @media(max-width: 1000px) {
            width: 65%;
        }
    }

    
`

const Menu = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;

    a {
        margin-right: 2vw;
        cursor: pointer;
        font-weight: bold;
        text-decoration: none;
        color: black;
    }

    @media(max-width: 1000px) {
        font-size: 75%;
    }

    @media(max-width: 576px) {
        font-size: 40%;
    }
`

export default Navbar;