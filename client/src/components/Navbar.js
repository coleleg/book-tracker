import React from 'react';
import styled from 'styled-components';


const Navbar = () => {
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
                <a>
                    <span>LOGIN</span>
                </a>
                <a>
                    <span>SIGNUP</span>
                </a>
                <a>
                    <span>LOGOUT</span>
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
`;

const Logo = styled.div`
    width: 10%;
`

const ImgContainer = styled.div`
    img {
        cursor: pointer;
        max-height: 70px;
        margin-left: -3rem;
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
`

export default Navbar;