export const searchBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyBy3SgRDg4cEKGLqSvDc1Yt02Cs6JCfcIc`)
};   

export const createUser = (data) => {
    return fetch('api/users', {
        method: 'POST',
        headers: {
            'Content-Type': `application/json`,
        },
        body: JSON.stringify(data),
    });
};

export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

export const saveBookToRead = (data, token) => {
    return fetch('api/users/booksToRead', {
        method: `PUT`,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
};

export const deleteSavedBookToRead = (bookId, token) => {
    return fetch(`/api/users/booksToRead/${bookId}`, {
        method: `DELETE`,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const addToCurrentlyReading = (data, token) => {
    return fetch('/api/users/currentlyReading', {
        method: `PUT`,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
};

export const deleteFromCurrentlyReading = (bookId, token) => {
    return fetch(`/api/users/currentlyReading/${bookId}`, {
        method: `DELETE`,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const addToBooksRead = (data, token) => {
    return fetch('/api/users/booksRead', {
        method: `PUT`,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
};


