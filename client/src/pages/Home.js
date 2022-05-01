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
                        <label>SEARCH FOR A BOOK!</label>
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
                            <h4>{book?.title}</h4>
                            <h5>{book?.authors}</h5>
                            <p className='desc'>{book?.description}</p>
                            <p className='pages'>Page Count: {book?.pageCount}</p>
                            <button disabled={savedBooks?.some((savedBookId) => savedBookId === book.bookId)} 
                                    onClick={() => handleSavedBook(book.bookId)}>{savedBooks?.some((savedBookId) => savedBookId === book.bookId) ? `You have already saved this book` 
                                    : `Add to Saved Books`}</button>
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
    }
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


export default Home;