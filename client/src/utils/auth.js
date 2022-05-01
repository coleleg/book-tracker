import decode from 'jwt-decode';

class AuthService {
    getToken() {
        return localStorage.getItem('user_token');
    }

    login(userToken) {
        localStorage.setItem('user_token', userToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.clear();
        window.location.assign('/');
    }

    getUserProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return token;
    }

    expiredToken(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } return false;
        } catch (err) {
            return false;
        }
    }
}

export default new AuthService();