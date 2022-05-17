import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getMe, deleteFromCurrentlyReading, addToBooksCompleted } from '../utils/rest';
import Auth from '../utils/auth';

function Current() {
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

    const handleMoveToFinished = async (bookId) => {
        const targetBook = userData.currentlyReading?.find((book) => book.bookId === bookId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        localStorage.setItem('id', bookId);

            if (!token) {
                console.log('No token found')
                return false;
            }


        try {
            const response = await addToBooksCompleted(targetBook, token);

            if (!response.ok) {
                throw new Error('Try again')
            }

            const updatedUser = await response.json();
            setUserData(updatedUser);
        } catch (err) {
            console.error(err);
        }
        

        try {
            const response = await deleteFromCurrentlyReading(bookId, token);
            
            if (!response.ok) {
                throw new Error('Try again')
            }

            const updatedUser = await response.json();
            setUserData(updatedUser);

            } catch (err) {
                console.error(err);
            }
        
    
    }

    return (
        <Container>
            <h1>Books You Are Currently Reading</h1>
            <Results>
                {userData.currentlyReading?.map((book) => {
                        return (
                            <Card key={book.bookId}>
                                <h4>{book?.title}</h4>
                                <h5>{book?.authors}</h5>
                                <p className='pages'>Page Count: {book?.pageCount}</p>
                                <button onClick={() => handleMoveToFinished(book?.bookId)}>Move to Completed Books</button>
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
        margin: .5rem;
        border-radius: 15px;
        background: #5ade86;
        box-shadow: inset -5px -5px 16px #245936,
                    inset 5px 5px 16px #90ffd6;
        border: none;
        padding: .5rem;

        &:hover {
            transform: scale(1.05);
        }
    }
`

export default Current