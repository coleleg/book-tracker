//used to store saved books on component unmount
export const saveBookLocal = (savedBooks) => {
    if (savedBooks.length) {
        localStorage.setItem('saved_books', JSON.stringify(savedBooks));
    } else {
        localStorageStorage.removeItem('saved_books');
    }
}

// retrieve books from local storage.  if none, return an empty array.
export const getLocalBooks = () => {
    const localBooks = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')) : [];
    
    return localBooks;
}

// need a remove book function
