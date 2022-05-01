import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getMe } from '../utils/rest';
import Auth from '../utils/auth';

function Completed() {
    const [userData, setUserData] = useState({});
    const [pagesRead, setPagesRead] = useState(0);

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

                // iterate through booksRead to get total pages read
                let pages = 0;
                for (let i=0; i < user.booksRead.length; i++) {
                    pages = pages + user.booksRead[i].pageCount
                }
                setPagesRead(pages);

            } catch (err) {
                console.error(err);
            }
        };
        getUserData();
        
    }, [dataLength]);


    return (
        <Container>
            <h1>Books You Have Completed</h1>
            <h2>Total Pages Read: {pagesRead}</h2>
            <Results>
                {userData.booksRead?.map((book) => {
                        return (
                            <Card key={book.bookId}>
                                <img src = {book.img} />
                                <h4>{book?.title}</h4>
                                <h5>{book?.authors}</h5>
                                <p className='desc'>{book?.description}</p>
                                <p className='pages'>Page Count: {book?.pageCount}</p>
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

export default Completed