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
        return () => saveBookToRead(saveBookLocal);
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
                        <input type="text" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} name="query" placeholder="Alice in Wonderland"></input>
                        <button type="submit">Into the Rabbit Hole</button>
                    </form>

                </SearchBar>
            </Header>
            <Results>
                {searchedBooks.map((book) => {
                    return (
                        <Card>
                            <img src = {book.img} />
                            <h4>{book?.title}</h4>
                            <h5>{book?.authors}</h5>
                            <p className='desc'>{book?.description}</p>
                            <p className='pages'>Page Count: {book?.pageCount}</p>
                            <button>Add to Saved Books</button>
                        </Card>
                    )
                })};
            </Results>
        </Container>

    );
};

const Container = styled.main`
    height: 100vh;
    background: #B8445F;
    overflow-x: hidden;
`

const Header = styled.div`
    height: 20vh;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SearchBar = styled.div`
    form {
        display: block;
        width: 100%;
        padding: 1rem;
        border-radius: 50px;
        box-shadow: inset 20px 20px 60px #9c3a51,
            inset -20px -20px 60px #d44e6d;

        label {
            font-size: 150%;
        }

        input {
            margin-top: 1em;
            width: 75%;
            padding: .5em;
            border: 1px solid black;
            border-radius: 5px;
        }

        button {
            margin-top: 1em;
            border-radius: 5px;
            background: #5ADE86;
            box-shadow: inset 5px 5px 10px #42a262,
            inset -5px -5px 10px #72ffaa;
            font-size: 16px;
            border: none;
            cursor: pointer;
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
    border-radius: 59px;
    background: linear-gradient(315deg, #60ee8f, #51c879);
    box-shadow:  -5px -5px 2px #245936,
                 5px 5px 2px #90ffd6;

    .pages {
        font-size: 75%;
    }
`


export default Home;