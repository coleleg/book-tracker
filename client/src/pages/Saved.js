import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getMe, deleteSavedBookToRead, addToCurrentlyReading } from '../utils/rest';
import Auth from '../utils/auth';

function Saved() {
    const [userData, setUserData] = useState({});

    const dataLength = Object.keys(userData).length;

    // pulls user data on component mount
    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    console.log('No token found')
                    return false;
                }

                const response = await getMe(token);

                if (!response.ok) {
                    throw new Error('Try again')
                }

                const user = await response.json();
                setUserData(user);
            } catch (err) {
                console.error(err);
            }
        };

        getUserData();
    }, [dataLength]);

    const handleMoveToCurrent = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        localStorage.setItem('id', bookId);

            if (!token) {
                console.log('No token found')
                return false;
            }


        try {
            const response = await addToCurrentlyReading(bookId, token);

            if (!response.ok) {
                throw new Error('Try again')
            }

            const updatedUser = await response.json();
            setUserData(updatedUser);
        } catch (err) {
            console.error(err);
        }
        

        try {
            const response = await deleteSavedBookToRead(bookId, token);
            
            if (!response.ok) {
                throw new Error('Try again')
            }

            const updatedUser = await response.json();
            setUserData(updatedUser);

            } catch (err) {
                console.error(err);
            }
        
        console.log(userData);
    }

    return (
        <Container>
            <h1>Your Saved Books</h1>
            <Results>
                {userData.booksToRead?.map((book) => {
                        return (
                            <Card key={book.bookId}>
                                <img src = {book.img} />
                                <h4>{book?.title}</h4>
                                <h5>{book?.authors}</h5>
                                <p className='desc'>{book?.description}</p>
                                <p className='pages'>Page Count: {book?.pageCount}</p>
                                <button onClick={() => handleMoveToCurrent(book?.bookId)}>Move to Currently Reading</button>
                            </Card>
                        )
                })}
            </Results>
        </Container>
    )       
}        

const Container = styled.div`
`

const Results = styled.div`
    display: grid;
    padding: 20px 5px 20px;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
`

const Card = styled.div`
    margin: 1rem;
    padding: 1em;
    border-radius: 50px;
    background: #5ADE86;
    box-shadow: inset -20px -20px 40px #245936,
            inset 20px 20px 40px #90ffd6;

    .pages {
        font-size: 75%;
    }

    button {
        cursor: pointer;
    }
`

export default Saved