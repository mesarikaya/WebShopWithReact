import { Dispatch } from "redux";

import setAuthToken from '../helperFunctions/setAuthToken';

import isEmpty  from '../helperFunctions/isEmpty';

import jwt from 'jsonwebtoken';

import logoutUser from '../helperFunctions/logoutUser';

const verify = (dispatch, token, username, userAuthorized, redirect) => {

    jwt.verify(token, "jwtauthsecretthatnobodyshouldpip", (err, decoded) => {
        if (err) {
            // If error send Forbidden (403)
            // tslint:disable-next-line:no-console
            console.log('ERROR: Could not connect to the protected route', err);

        } else {
            // If token is successfully verified, we can send the autorized data 
            // tslint:disable-next-line:no-console
            console.log('ERROR: Could not connect to the protected route with', process.env);
            // tslint:disable-next-line:no-console
            console.log('SUCCESS: Connected to protected route');
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            // tslint:disable-next-line:no-console
            console.log("token:", token, "--> decoded: ", decoded);

            // Dispatch the data via redux
            userAuthorized = !isEmpty(decoded);
            redirect = true;
            username = decoded.id;
            dispatch({ type: 'UPDATE_LOCAL_USER_AUTHORIZATION', redirect, username, userAuthorized });

            // Check if the expiration time is up for the token
            // If expired log out the user again
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                logoutUser(dispatch);
            }
        }
    });
}

export default verify;