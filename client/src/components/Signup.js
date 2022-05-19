import React, { useState } from 'react'
import styled from 'styled-components';
import { createUser } from '../utils/rest';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router';

function Signup() {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({ email: '', username: '', password: '' });

    const handleChange = async (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await createUser(formState);
            
            if(!response.ok) {
                throw new Error('Try again');
            }

            const { token } = await response.json();
            Auth.login(token);

        } catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            username: '',
            password:''
        });

        navigate('/');

    }

    return (
        <Container>
            <LoginForm onSubmit={handleSubmit}>
                <label>Email</label>
                <input type='email' name='email' onChange={handleChange}></input>
                <label>Username</label>
                <input type='text' name='username' onChange={handleChange}></input>
                <label>Password</label>
                <input type='password' name='password' onChange={handleChange}></input>
                <button type='submit'>Signup</button>
            </LoginForm>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
`

const LoginForm = styled.form`
    display: block;
    width: 550px;
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

        @media(max-width: 576px) {
            width: 250px;
        }
`

export default Signup