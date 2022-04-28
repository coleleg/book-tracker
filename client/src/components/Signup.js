import React, { useState } from 'react'
import styled from 'styled-components';

function Signup() {
    return (
        <Container>
            <LoginForm>
                <label>Email</label>
                <input type='email'></input>
                <labe>Username</labe>
                <input type='text'></input>
                <label>Password</label>
                <input type='password'></input>
                <button type='submit'>Login</button>
            </LoginForm>
        </Container>
    )
}

const Container = styled.div`
    display: block;
    margin-left: auto;
    margin-right: 10vw;
    width: 25vw;
    margin-top: 5vh;
    z-index: 10;
`

const LoginForm = styled.form`
    border-radius: 25px;
    background: #7D6C7E;
    box-shadow: inset 17px 17px 34px #5f5260,
                inset -17px -17px 34px #9b869c;
    padding: 1rem;

        label {
            margin: 1rem;
            font-weight: bold;
        }

        input {
            margin: .5rem;
            padding: .25em;
            width: 90%;
            border-radius: 51px;
            background: #7D6C7E;
            box-shadow: inset 5px 5px 10px #4b414c,
                        inset -5px -5px 10px #af97b0
        }

        input, textarea {
            color: black;
        }

        button {
            margin: 1rem;
            width: 25%;
            border-radius: 51px;
            background: linear-gradient(145deg, #716171, #867487);
            box-shadow:  25px 25px 50px #322b32,
                        -25px -25px 50px #c8adca;
            font-size: 20px;
            cursor: pointer;
            border: none;
        }
`

export default Signup