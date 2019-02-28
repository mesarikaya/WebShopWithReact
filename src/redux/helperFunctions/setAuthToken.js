import axios from 'axios';

/**
 * set authorization token as the header to be shared via axios 
 * @param {any} token
 */
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common.Authorization = token;
    }
    else {
        delete axios.defaults.headers.common.Authorization;
    }
}

export default setAuthToken;