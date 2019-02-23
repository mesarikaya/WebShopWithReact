import { Dispatch } from "redux";
import setAuthToken from '../helperFunctions/setAuthToken';
import isEmpty  from '../helperFunctions/isEmpty';
import jwt from 'jsonwebtoken';
import logoutUser from '../helperFunctions/logoutUser';

/**
 * Use the Redux dispatch method to check if the decoded message is valid
 * If valid then update the user status to logged in unless the token is not verified
 * @param {any} dispatch
 * @param {any} pageData
 * @param {any} token
 * @param {any} username
 * @param {any} userAuthorized
 * @param {any} redirect
 */
const verify = (dispatch, pageData, token, username, userAuthorized, redirect, favorites, basketData) => {

    jwt.verify(token, "jwtauthsecretthatnobodyshouldpip", (err, decoded) => {
        if (err) {
            // If error send Forbidden (403)
            // tslint:disable-next-line:no-console
            console.log('ERROR: Could not connect to the protected route', err);
            logoutUser(dispatch, pageData);

        } else {
            // If token is successfully verified, we can send the autorized data 
            // tslint:disable-next-line:no-console
            console.log('SUCCESS: Connected to the protected route');
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            // tslint:disable-next-line:no-console
            console.log("token:", token, "--> decoded: ", decoded);

            // tslint:disable-next-line:no-console
            console.log("Favorites is", favorites);


            // Dispatch the data via redux
            userAuthorized = !isEmpty(decoded);
            redirect = true;
            username = decoded.id;
            dispatch({ type: 'UPDATE_LOCAL_USER_AUTHORIZATION', pageData, redirect, username, userAuthorized, favorites, basketData });

            // Check if the expiration time is up for the token
            // If expired log out the user again
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                logoutUser(dispatch, pageData);
            }
        }
    });
}

export default verify;