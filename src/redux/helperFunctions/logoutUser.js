import setAuthToken from '../helperFunctions/setAuthToken';
import { Dispatch } from "redux";

/**
 *  Remove the jwtToken and dispatch redux action to update login status
 * @param {any} dispatch
 */
const logout = (dispatch, pageData) => {
    // Delete the local storage token
    localStorage.removeItem('jwtToken');
    setAuthToken(false);

    // Dispatch the data via redux
    const userAuthorized = false;
    const redirect = false;
    const username = "guest";
    // Set the user favorites to empty
    let favorites = [{
        Author: '',
        Description: '',
        Group: '',
        Image: '',
        ImageId: '',
        Name: '',
        Reserved: '',
        Reserved_Until: '',
        Type: ''
    }];
    // Set the user favorites to empty
    let basketData = [{
        Author: '',
        Description: '',
        Group: '',
        Image: '',
        ImageId: '',
        Name: '',
        Reserved: '',
        Reserved_Until: '',
        Type: ''
    }];

    dispatch({ type: 'UPDATE_LOCAL_USER_AUTHORIZATION', pageData, redirect, username, userAuthorized, favorites, basketData });
}

export default logout;