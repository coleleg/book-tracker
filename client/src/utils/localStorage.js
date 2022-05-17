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

export const removeBook = (bookId) => {
    const savedBookIds = localStorage.getItem('saved_books')
        ? JSON.parse(localStorage.getItem('saved_books'))
        : null;

    if (!savedBookIds) {
        return false;   
    }

    const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

    return true;
};