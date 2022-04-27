// stores saved book data from Home page on unmount
export const saveBookLocal = (savedBooks) => {
    if (savedBooks.length) {
        localStorage.setItem('saved_books', JSON.stringify(savedBooks));
    } else {
        localStorage.removeItem('saved_books');
    }
}

// retrieve books from local storage.  if none, return an empty array.
export const getBooksLocal = () => {
    const localBooks = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')) : [];
    
    return localBooks;
}

// need a remove book function
export const removeBookLocal = (bookId) => {
    
}
