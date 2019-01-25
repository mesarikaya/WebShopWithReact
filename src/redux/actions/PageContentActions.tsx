import * as constants from '../constants/PageContentConstants';

import axios from 'axios';
import { Dispatch } from "redux";

import { ImageContent } from '../types/storeState';
import { UpdatePageContentAction } from './PageContentActions';

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/";

import logoutUser from '../helperFunctions/logoutUser';

import verifyTokenandDispatch from '../helperFunctions/verifyToken';

// import jwtDecode from 'jwt-decode';
// import jwt from 'jsonwebtoken';

export interface UpdatePageContentInterface {
    type: constants.UPDATE_PAGE_CONTENT;
    isLoading: boolean;
    pageData: ImageContent[];
}

export interface LocalUserAuthorizationInterface {
    type: constants.UPDATE_LOCAL_USER_AUTHORIZATION;
    redirect: boolean;
    userAuthorized: boolean;
    username: string;
}

export type UpdatePageContentAction = UpdatePageContentInterface & LocalUserAuthorizationInterface;

export function UpdatePageContent(e: any, type: string, ageGroup: string) {
    if (e !== null) { e.preventDefault(); }

    // tslint:disable-next-line:no-console
    console.log('REDUX UPDATE_PAGE_CONTENT The link was clicked.', 'Requesting: ', type, "and", e);

    // Get the content for the page
    const params = new URLSearchParams();
    params.append('searchType', type);
    params.append('ageGroup', ageGroup);
    let isLoading = true;
    let pageData = [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }];

    return ((dispatch: Dispatch<UpdatePageContentInterface>) => {

        return (axios.get(`${url}images`, { 
                params,
                'withCredentials': true
            }).then((response) => {
            // handle success
            // tslint:disable-next-line:no-console
            console.log("CALLING FROM THE REDUX ACTIONS, response is:", response);
            isLoading = true;
            dispatch({ type: 'UPDATE_PAGE_CONTENT', pageData, isLoading });
            if (response.data.result === "No data") {
                isLoading = false;
                pageData = [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }];
            }
            else if (response.status === 503) {
                isLoading = false;
                pageData = [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }];
            }
            else {
                isLoading = false;
                pageData = response.data.result;
            }
            // tslint:disable-next-line:no-console
            console.log("pageData is from within the action: ", pageData);

            dispatch({ type: 'UPDATE_PAGE_CONTENT', pageData, isLoading });
        })
        .catch(error => {
            // handle error
            // tslint:disable-next-line:no-console
            console.log("Error in get is:", error.response);
            throw (error);
        }));
    });
};


export function SynchronizePageData(content: ImageContent[]) {
    // Get the content for the page
    const isLoading = false;
    const pageData = content;

    return ((dispatch: Dispatch<UpdatePageContentInterface>) => {
        dispatch({ type: 'UPDATE_PAGE_CONTENT', pageData, isLoading });
    });
};

export function UpdateLocalUserAuthenticationStatus(e: any, formState: any) {
    if (e !== null) { e.preventDefault(); }

    // Initialize the data to send with Post request
    const data = formState;

    // Get the username parameters
    /* const username = "test";
    const userAuthorized = true;
    const pageData = [{ Type: "test", Name: "test", Author: "test", Group: "test", Reserved: "test", Reserved_Until: "test" }];
    */

    return ((dispatch: Dispatch<LocalUserAuthorizationInterface>) => {
        return (axios.post(`${url}auth/sign-up`, data, {
            headers: {
                'content-type': 'application/json'
                    // 'application/x-www-form-urlencoded',
            }
        }).then((response) => {
            // handle success
            // tslint:disable-next-line:no-console
            console.log("POST METHOD CALLING FROM THE REDUX USE LOG IN ACTIONS, response is:", response);
            // dispatch({ type: 'UPDATE_LOCAL_USER_AUTHORIZATION', username, userAuthorized, pageData  });
        }).catch(error => {
            // handle error
            // tslint:disable-next-line:no-console
            console.log("Error in post is:", error.response);
            throw (error);
        }));
      });
};

export function signInLocalUser(e: any, formState: any) {
    if (e !== null) { e.preventDefault(); }

    // Initialize the data to send with Post request
    const data = formState;

    // Get the username parameters
    const username = "";
    const userAuthorized = false;
    const redirect = false;
    // const pageData = [{ Type: "test", Name: "test", Author: "test", Group: "test", Reserved: "test", Reserved_Until: "test" }];
    

    return ((dispatch: Dispatch<LocalUserAuthorizationInterface>) => {
        return (axios.post(`${url}auth/sign-in`, data, {
            headers: {
                'content-type': 'application/json',
                'withCredentials': true
            }
        }).then((response) => {
            // handle success
            // tslint:disable-next-line:no-console
            console.log("REDUX USE LOG IN ACTIONS, response is:", response);

            if (response.status === 200 && response.data.result.userVerified) {
                const token = response.data.result.token;
                verifyTokenandDispatch(dispatch, token, username, userAuthorized, redirect);
            }
        }).catch(error => {
                // handle error
                // tslint:disable-next-line:no-console
                console.log("Error in post is:", error.response);
                throw (error);
        }));
    });
};

export function signOutLocalUser(e: any) {
    if (e !== null) { e.preventDefault(); }

    return ((dispatch: Dispatch<LocalUserAuthorizationInterface>) => {
        return (axios.get(`${url}auth/sign-out`, {
                'withCredentials': true
            }
        ).then((response) => {
            // handle success
            if (response.status === 200) {
                // tslint:disable-next-line:no-console
                console.log("Log out the user");
                logoutUser(dispatch);
            }
        }).catch(error => {
            // handle error
            // tslint:disable-next-line:no-console
            console.log("Error in GET is:", error.response);
            throw (error);
        }));
    });
};


export function refreshPage() {

    // Get the username parameters
    const username = "guest";
    const userAuthorized = false;
    const redirect = false;
   
    return ((dispatch: Dispatch<LocalUserAuthorizationInterface>) => {
        return (axios.get(`${url}auth`, {
            'withCredentials': true
        }
        ).then((response) => {
            // handle success
            
            if (response.status === 200) {
                if (localStorage.jwtToken) {
                    // If the token exists set the user to the page data again
                    const token = localStorage.jwtToken;
                    // it will first login and then log out if time is expired
                    verifyTokenandDispatch(dispatch, token, username, userAuthorized, redirect); 
                }
            }
        }).catch(error => {
            // handle error
            // tslint:disable-next-line:no-console
            console.log("Error in GET for page refresh is:", error.response);
            throw (error);
        }));
    });
};
