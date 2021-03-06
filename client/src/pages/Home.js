import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { saveBookToRead, searchBooks } from '../utils/rest';
import { saveBookLocal, getBooksLocal } from '../utils/localStorage';
import Auth from '../utils/auth';

const Home = () => {
    // google api data
    const [searchedBooks, setSearchedBooks] = useState([]);

    // user form query
    const [userSearch, setUserSearch] = useState(``);

    // holds saved books
    const [savedBooks, setSavedBooks] = useState(getBooksLocal());

    // handles component unmount
    useEffect(() => {
        return () => saveBookLocal(savedBooks);
    });


    const handleSearch = async (event) => {
        event.preventDefault();

        if (!userSearch) {
            return false;
        }

        try {
            const response= await searchBooks(userSearch);

            if (!response.ok) {
                throw new Error('Something went wrong!  Try again.');
            }

            // google api returns muultiple books under the name "items"
            const { items } = await response.json();

            const bookData = items.map((book) => ({
                bookId: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                pageCount: book.volumeInfo.pageCount,
                img: book.volumeInfo.imageLinks?.thumbnail || ''
            }));
            console.log(bookData);

            setSearchedBooks(bookData);
            setUserSearch('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSavedBook = async (bookId) => {
        const targetBook = searchedBooks.find((book) => book.bookId === bookId);

        // if there is a token, set it as the value, otherwise set value as null
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            console.log('Could not find your token.');
            return false;
        }

        try {
            const response = await saveBookToRead(targetBook, token);

            if (!response.ok) {
                throw new Error('Something went wrong.  Try again.')
            }

            setSavedBooks([...savedBooks, targetBook.bookId]);
        } catch (err) {
            console.error(err);
        }
    }
    

    return (
        <Container>
            <Header>
                <SearchBar>
                    <form onSubmit={handleSearch}>
                        <label className='label'> {Auth.loggedIn() ? 'SEARCH FOR A BOOK!' : 'YOU MUST BE LOGGED IN TO SAVE BOOKS' }</label>
                        <input type="text" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} name="query"></input>
                        <button type="submit">SEARCH</button>
                    </form>

                </SearchBar>
            </Header>
            <Results>
                {searchedBooks.map((book) => {
                    return (
                        <Card key={book.bookId}>
                            <img src = {book.img} />
                            <h4 className='title'>{book?.title}</h4>
                            <h5 className='authors'>{book?.authors}</h5>
                            <p className='desc'>{book?.description}</p>
                            <p className='pages'>Page Count: {book?.pageCount}</p>
                            <button disabled={savedBooks?.some((savedBookId) => savedBookId === book.bookId)} 
                                    onClick={() => handleSavedBook(book.bookId)}>{savedBooks?.some((savedBookId) => savedBookId === book.bookId) ? `You have already saved this book` 
                                    : `Save Book`}</button>
                        </Card>
                    )
                })}
            </Results>
        </Container>

    );
};

const Container = styled.main`
    overflow-x: hidden;
`

const Header = styled.div`
    height: 20vh;
    width: 100%;
    margin: 2rem 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

`
const SearchBar = styled.div`
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 75vw;
        padding: 1rem;
        border-radius: 50px;
        box-shadow: inset 20px 20px 60px #9c3a51,
            inset -20px -20px 60px #d44e6d;

        label {
            font-size: 150%;
            margin-right: 1rem;
        }

        input {
            margin-top: 1em;
            width: 75%;
            padding: .5em;
            border-radius: 51px;
            background: #B8445F;
            box-shadow: inset 5px 5px 10px #6e2939,
                        inset -5px -5px 10px #ff5f85;;
            margin-right: 1rem;
            font-size: 16px;
        }

        input, textarea {
            color: black;
        }

        button {
            margin-top: 1em;
            border-radius: 51px;
            background: linear-gradient(145deg, #a63d56, #c54966);
            box-shadow:  25px 25px 50px #4a1b26,
                        -25px -25px 50px #ff6d98;
            font-size: 16px;
            border: none;
            cursor: pointer;
            margin-right: 1rem;
            padding: 1rem;

            &:hover {
                transform: scale(1.05);
            }
        }

        @media(max-width: 1000px) {
            label {
                font-size: 75%;
            }

            button {
                font-size: 50%;
            }

        @media(max-width: 576px) {
            display: block;

            button {
                margin-top: 1rem;
            }
        }

    }
`
const Results = styled.div`
    display: grid;
    padding: 20px 5px 20px;
    grid-gap: 25px;
    // grid-template-columns: repeat(4, minmax(0, 1fr));
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
        min-width: 175px;
        border-radius: 16px;
        background: linear-gradient(315deg, #51c879, #60ee8f);
        box-shadow:  -5px -5px 10px #41a060,
                    5px 5px 10px #73ffac;
        font-size: 16px;
        border: none;
        cursor: pointer;
        padding: .25rem;
        margin: .5rem;

        &:hover {
            transform: scale(1.05);
        }
    }

    @media (min-width: 1200px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
    padding: 1em;
    border-radius: 26px;
    background: #5ade86;
    box-shadow:  5px 5px 5px #3d975b,
                -5px -5px 5px #77ffb1;

    img {
        margin: .5rem;
        border-radius: 1rem;
    }
    .title {
        margin: .5rem;
        min-width: 10rem;
        max-width: 10rem;
    }

    .authors {
        margin: .5rem;
    }

    .desc {
        margin: .5rem;
        overflow: hidden;
    }

    .pages {
        min-width: 6rem;
        font-size: 75%;
        margin: .5rem;
    }

}
`


export default Home;