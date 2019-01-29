import axios from 'axios';
import { Dispatch } from "redux";
import * as constants from '../constants/PageContentConstants';
import logoutUser from '../helperFunctions/logoutUser';
import verifyTokenandDispatch from '../helperFunctions/verifyToken';
import { ImageContent } from '../types/storeState';
import { UpdatePageContentAction } from './PageContentActions';


// Set the API url for back end calls
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/";

/** Set action interfaces */
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

//TODO: Modularize this code via splitting it based on User login activity
// dispacth actions and page image vieww actions. It has grown to be very big


// Create a general Action for the provided action interfaces
export type UpdatePageContentAction = UpdatePageContentInterface & LocalUserAuthorizationInterface;

/**
 * Make GET request and dipatch the image data to be shown via redux  
 * @param e
 * @param type
 * @param ageGroup
 */
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

            // Depending on response status, reset the data
            isLoading = true;
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

/**
 * On go back actions synchronize the page data
 * @param content
 */
export function SynchronizePageData(content: ImageContent[]) {
    // Get the content for the page
    const isLoading = false;
    const pageData = content;

    return ((dispatch: Dispatch<UpdatePageContentInterface>) => {
        dispatch({ type: 'UPDATE_PAGE_CONTENT', pageData, isLoading });
    });
};

/**
 * Get the entered sign up form state and send a POST request to the database
 * This
 * @param e
 * @param formState
 */
export function UpdateLocalUserAuthenticationStatus(e: any, formState: any) {
    if (e !== null) { e.preventDefault(); }

    // Initialize the data to send with Post request
    const data = formState;

    return ((dispatch: Dispatch<LocalUserAuthorizationInterface>) => {
        return (axios.post(`${url}auth/sign-up`, data, {
            headers: {
                'content-type': 'application/json'
                    // 'application/x-www-form-urlencoded',
            }
        }).then((response) => { // No dispatch is needed on success for now, maybe add
            // tslint:disable-next-line:no-console
            console.log("POST METHOD CALLING FROM THE REDUX USE LOG IN ACTIONS, response is:", response);

            // TODO: Create success message to share with the user
        }).catch(error => {
            // handle error
            // tslint:disable-next-line:no-console
            console.log("Error in post is:", error.response);

            // TODO: Create a dispatch for error message to share with the user
            throw (error);
        }));
      });
};

/**
 * Get the signin form state and check the credentails in the backend
 * @param e
 * @param formState
 */
export function signInLocalUser(e: any, formState: any) {
    if (e !== null) { e.preventDefault(); }

    // Initialize the data to send with Post request
    const data = formState;

    // Get the username parameters
    const username = "";
    const userAuthorized = false;
    const redirect = false;
   
    return ((dispatch: Dispatch<LocalUserAuthorizationInterface>) => {
        return (axios.post(`${url}auth/sign-in`, data, {
            headers: {
                'content-type': 'application/json',
                'withCredentials': true
            }
        }).then((response) => {
            
            // tslint:disable-next-line:no-console
            console.log("REDUX USE LOG IN ACTIONS, response is:", response);

            if (response.status === 200 && response.data.result.userVerified) {
                const token = response.data.result.token;
                verifyTokenandDispatch(dispatch, token, username, userAuthorized, redirect);

                // TODO: Create success message to share with the user
            }
        }).catch(error => {
                // tslint:disable-next-line:no-console
                console.log("Error in post is:", error.response);

                // TODO: Create error message to share with the user
                throw (error);
        }));
    });
};

/**
 * Sig out the user with a GET request
 * @param e
 */
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
                // TODO: Create success message to share with the user
            }
            // TODO: Create error message to share with the user
        }).catch(error => {
            // tslint:disable-next-line:no-console
            console.log("Error in GET is:", error.response);

            // TODO: Create error message to share with the user
            throw (error);
        }));
    });
};

/**
 * Keep page data integrity on user page refreshes
 * */
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
           
            if (response.status === 200) {
                if (localStorage.jwtToken) {
                    // If the token exists set the user to the page data again
                    const token = localStorage.jwtToken;
                    // it will first login and then log out if time is expired
                    verifyTokenandDispatch(dispatch, token, username, userAuthorized, redirect); 
                    // TODO: Create success message to share with the user
                }
            }
            // TODO: Create error message to share with the user
        }).catch(error => {
            // tslint:disable-next-line:no-console
            console.log("Error in GET for page refresh is:", error.response);

            // TODO: Create error message to share with the user
            throw (error);
        }));
    });
};
