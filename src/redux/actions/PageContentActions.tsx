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

export interface UpdateFavoritesInterface {
    favoritesData: ImageContent[];
    type: constants.UPDATE_FAVORITES;
}

export interface UpdateBasketInterface {
    basketData: ImageContent[];
    type: constants.UPDATE_BASKET;
}

export interface LocalUserAuthorizationInterface {
    favorites: ImageContent[];
    pageData: ImageContent[];
    type: constants.UPDATE_LOCAL_USER_AUTHORIZATION;
    redirect: boolean;
    shoppingBasket: ImageContent[];
    userAuthorized: boolean;
    username: string;
}

export interface ErrorMsgInterface {
    error: {
        message: string,
        status: string
    },
    type: constants.ERROR_MSG;
}

// TODO: Modularize this code via splitting it based on User login activity
// dispacth actions and page image vieww actions. It has grown to be very big


// Create a general Action for the provided action interfaces
export type UpdatePageContentAction = ErrorMsgInterface
                                        & UpdateBasketInterface
                                        & UpdateFavoritesInterface
                                        & UpdatePageContentInterface
                                        & LocalUserAuthorizationInterface;

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
    // Check the environment
    // tslint:disable-next-line:no-console
    console.log('environment is', process.env.NODE_ENV);
    // Get the content for the page
    const params = new URLSearchParams();
    params.append('searchType', type);
    params.append('ageGroup', ageGroup);
    let isLoading = true;
    let pageData = [{ Author: "", Description: "", Group: "", Image: "", ImageId: "", Name: "", Reserved: "", Reserved_Until: "", Type: "" }];

    return ((dispatch: Dispatch<UpdatePageContentInterface>) => {

        return (axios.get(`${url}images`, { 
                params,
                'withCredentials': true
            }).then((response) => {

            // Depending on response status, reset the data
            isLoading = true;
            if (response.data.status=== 400) {
                isLoading = false;
                pageData = [{ Author: "", Description: "", Group: "", Image: "", ImageId: "", Name: "", Reserved: "", Reserved_Until: "", Type: "" }];
            }
            else if (response.status === 503) {
                isLoading = false;
                pageData = [{ Author: "", Description: "", Group: "", Image: "", ImageId: "", Name: "", Reserved: "", Reserved_Until: "", Type: "" }];
            }
            else {
                // tslint:disable-next-line:no-console
                console.log("Page data to share is:", pageData, "response is: ", response);
                isLoading = false;
                pageData = response.data.result;
            }

            // tslint:disable-next-line:no-console
            console.log("Page data to share is:", pageData, "response is: ", response);
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
 * GENERIC search for products from Search Box Form
 * @param e
 * @param type
 * @param ageGroup
 */
export function searchProduct(e: any, searchText: string) {
    if (e !== null) { e.preventDefault(); }

    // tslint:disable-next-line:no-console
    console.log('REDUX GENERIX SEARCH ACTION:', 'Requesting: ', searchText);

    // Get the content for the page
    const params = new URLSearchParams();
    params.append('searchText', searchText);

    let isLoading = true;
    let pageData = [{ Author: "", Description: "", Group: "", Image: "", ImageId: "", Name: "", Reserved: "", Reserved_Until: "", Type: "" }];

    return ((dispatch: Dispatch<UpdatePageContentInterface>) => {

        return (axios.get(`${url}searchProduct`, {
            params,
            'withCredentials': true
        }).then((response) => {

            // Depending on response status, reset the data
            isLoading = true;
            if (response.status === 400) {
                isLoading = false;
                pageData = [{ Author: "", Description: "", Group: "", Image: "", ImageId: "", Name: "", Reserved: "", Reserved_Until: "", Type: "" }];
            }
            else if (response.status === 503) {
                isLoading = false;
                pageData = [{ Author: "", Description: "", Group: "", Image: "", ImageId: "", Name: "", Reserved: "", Reserved_Until: "", Type: "" }];
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
 * Make a GET Request to add the clicked product to the user favorites
 * @param e
 * @param props Properties of the image
 */
export function modifyFavorites(e: any, props: any, action: boolean) {
    if (e !== null) { e.preventDefault(); }
    // tslint:disable-next-line:no-console
    console.log("MODIFY FAVORITES DISPATCH PROPS", props);

    // Initialize the data to send with Post request
    const params = new URLSearchParams();
    params.append("UserId", props.UserId);
    params.append('Author', props.Author);
    params.append('Description', props.Description);
    params.append('Group', props.Group);
    params.append('Image', props.Image);
    params.append('ImageId', props.ImageId);
    params.append('Name', props.Name);
    params.append('Reserved', props.Reserved);
    params.append('ReservedUntil', props.Reserved_Until);
    params.append('Type', props.Type);
    if (action) {
        params.append('action', "add");
    } else {
        params.append('action', "delete");
    }
    
    let favoritesData = [{
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

    return ((dispatch: Dispatch<UpdateFavoritesInterface>) => {
        return (axios.post(`${url}modifyFavorites`, null, {
            headers: {
                'content-type': 'application/json'
            },
            params,
            'withCredentials': true,
        }).then((response) => {
            // No dispatch is needed on success for now, maybe add
            // tslint:disable-next-line:no-console
            console.log("POST METHOD CALLING FROM THE REDUX FOR ADD TO FAVORITES, response is:", response);
            if (response.status === 200) {
                favoritesData = response.data.result;
                dispatch({ type: 'UPDATE_FAVORITES', favoritesData });
            }
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
 * Make a GET Request to add the clicked product to the user favorites
 * @param e
 * @param props Properties of the image
 */
export function modifyShoppingBasket(e: any, props: any, action: boolean) {
    if (e !== null) { e.preventDefault(); }
    // tslint:disable-next-line:no-console
    console.log("MODIFY BASKET DISPATCH PROPS", props);

    // Initialize the data to send with Post request
    const params = new URLSearchParams();
    params.append("UserId", props.UserId);
    params.append('Author', props.Author);
    params.append('Description', props.Description);
    params.append('Group', props.Group);
    params.append('Image', props.Image);
    params.append('ImageId', props.ImageId);
    params.append('Name', props.Name);
    params.append('Reserved', props.Reserved);
    params.append('ReservedUntil', props.Reserved_Until);
    params.append('Type', props.Type);
    if (action) {
        params.append('action', "add");
    } else {
        params.append('action', "delete");
    }

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

    return ((dispatch: Dispatch<UpdateBasketInterface>) => {
        return (axios.post(`${url}modifyShoppingBasket`, null, {
            headers: {
                'content-type': 'application/json'
            },
            params,
            'withCredentials': true,
        }).then((response) => {
            // No dispatch is needed on success for now, maybe add
            // tslint:disable-next-line:no-console
            console.log("POST METHOD CALLING FROM THE REDUX FOR ADD TO BASKET, response is:", response);
            if (response.status === 200) {
                basketData = response.data.result;
                dispatch({ type: 'UPDATE_BASKET', basketData });
            }
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
 * On go back actions synchronize the page data
 * @param content
 */
export function SynchronizePageData(datatoShare: any) {
    // Get the content for the page
    const isLoading = false;
    const pageData = datatoShare;

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

    return ((dispatch: Dispatch<LocalUserAuthorizationInterface | ErrorMsgInterface>) => {
        return (axios.post(`${url}auth/sign-up`, data, {
            headers: {
                'content-type': 'application/json'
                    // 'application/x-www-form-urlencoded',
            }
        }).then((response) => { // No dispatch is needed on success for now, maybe add
            // tslint:disable-next-line:no-console
            console.log("POST METHOD CALLING FROM THE REDUX USE LOG IN ACTIONS, response is:", response);
            if (response.status === 200) {
                // No dispatch is needed on success for now, maybe add
                const status = "Success";
                const message = "You are registered!\n Please click the sent link in the verification email to activate your account!";

                const error = {
                    'message': message,
                    'status': status
                };
                dispatch({ type: 'ERROR_MSG', error });
            } else {
                const status = "Error";
                const message = "Reauthentication of user is unsuccessful! Please sign in again!";

                const error = {
                    'message': message,
                    'status': status
                };
                dispatch({ type: 'ERROR_MSG', error });
            }
            // TODO: Create success message to share with the user
        }).catch(errors => {
            const status = "Error";
            const message = errors.response.data.result.message;

            const error = {
                'message': message,
                'status': status
            };
            dispatch({ type: 'ERROR_MSG', error });
        }));
      });
};

/**
 * Get the signin form state and check the credentails in the backend
 * @param e
 * @param formState
 * @param pageData
 */
export function signInLocalUser(e: any, formState: any, pageData: ImageContent[]) {
    if (e !== null) { e.preventDefault(); }

    // Initialize the data to send with Post request
    const data = formState;

    // Get the username parameters
    const username = "";
    const userAuthorized = false;
    const redirect = false;
    
    return ((dispatch: Dispatch<LocalUserAuthorizationInterface | ErrorMsgInterface>) => {
        return (axios.post(`${url}auth/sign-in`, data, {
            headers: {
                'content-type': 'application/json',
                'withCredentials': true
            }
        }).then((response) => {
            
            // tslint:disable-next-line:no-console
            console.log("REDUX USE LOG IN ACTIONS, response is:", response);

            if (response.status === 200) {
                if (response.data.result.userVerified) {
                    const token = response.data.result.token;
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
                    if (typeof response.data.result.favorites !== "undefined" && response.data.result.favorites !== []) {
                        favorites = response.data.result.favorites;
                    }

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
                    // tslint:disable-next-line:no-console
                    console.log("shopping basket to verify:", response.data.result);
                    if (typeof response.data.result.shoppingBasket !== "undefined" && response.data.result.shoppingBasket !== []) {
                        basketData = response.data.result.shoppingBasket;
                    }

                    verifyTokenandDispatch(dispatch, pageData, token, username, userAuthorized, redirect, favorites, basketData);

                    // TODO: Create success message to share with the user
                } else {
                    const status = "Error";
                    const message = "Please verify your session again!";

                    const error = {
                        'message': message,
                        'status': status
                    };
                    dispatch({ type: 'ERROR_MSG', error });
                }
            } else {
                const status = "Error";
                const message = response.data.result.message;

                const error = {
                    'message': message,
                    'status': status
                };
                dispatch({ type: 'ERROR_MSG', error });
            }
        }).catch(errors => {
            const status = "Error";
            const message = errors.response;

            const error = {
                'message': message,
                'status': status
            };
            dispatch({ type: 'ERROR_MSG', error });
        }));
    });
};

/**
 * Get the signin form state and check the credentails in the backend
 * @param res
 * @param pageData
 */
export function signInSocialUser(res: any, pageData: ImageContent[], caller: string) {

    // Initialize the data to send with Post request
    const data = res;

    // Get the username parameters
    const username = "";
    const userAuthorized = false;
    const redirect = false;
    let urlExt = 'auth/google'

    // Set the api url extenseion
    if (caller === "fb") { urlExt = 'auth/facebook'; }

    return ((dispatch: Dispatch<LocalUserAuthorizationInterface | ErrorMsgInterface>) => {
        return (axios.post(`${url}` + urlExt, data, {
            headers: {
                'content-type': 'application/json',
                'withCredentials': true
            }
        }).then((response) => {

            // tslint:disable-next-line:no-console
            console.log("REDUX USE LOG IN ACTIONS, response is:", response);

            if (response.status === 200) {
                if (response.data.result.userVerified) {
                    const token = response.data.result.token;
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
                    if (typeof response.data.result.favorites !== "undefined" && response.data.result.favorites !== []) {
                        favorites = response.data.result.favorites;
                    }

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
                    // tslint:disable-next-line:no-console
                    console.log("shopping basket to verify:", response.data.result);
                    if (typeof response.data.result.shoppingBasket !== "undefined" && response.data.result.shoppingBasket !== []) {
                        basketData = response.data.result.shoppingBasket;
                    }

                    verifyTokenandDispatch(dispatch, pageData, token, username, userAuthorized, redirect, favorites, basketData);

                    // TODO: Create success message to share with the user
                } else {
                    const status = "Error";
                    const message = "Please verify your session again!";

                    const error = {
                        'message': message,
                        'status': status
                    };
                    dispatch({ type: 'ERROR_MSG', error });
                }
            } else {
                const status = "Error";
                const message = response.data.result.message;

                const error = {
                    'message': message,
                    'status': status
                };
                dispatch({ type: 'ERROR_MSG', error });
            }
        }).catch(errors => {
            const status = "Error";
            const message = errors.response;

            const error = {
                'message': message,
                'status': status
            };
            dispatch({ type: 'ERROR_MSG', error });
        }));
    });
};



/**
 * Sig out the user with a GET request
 * @param e
 */
export function signOutLocalUser(e: any, pageData: ImageContent[]) {
    if (e !== null) { e.preventDefault(); }

    return ((dispatch: Dispatch<LocalUserAuthorizationInterface | ErrorMsgInterface>) => {
        return (axios.get(`${url}auth/sign-out`, {
                'withCredentials': true
            }
        ).then((response) => {
            // handle success
            if (response.status === 200) {
                // tslint:disable-next-line:no-console
                console.log("Log out the user");
                logoutUser(dispatch, pageData);
                // TODO: Create success message to share with the user
            } else {
                const status = "Error";
                const message = response.data.result.message;

                const error = {
                    'message': message,
                    'status': status
                };
                dispatch({ type: 'ERROR_MSG', error });
            }
            // TODO: Create error message to share with the user
        }).catch(errors => {
            const status = "Error";
            const message = errors.response;

            const error = {
                'message': message,
                'status': status
            };
            dispatch({ type: 'ERROR_MSG', error });
        }));
    });
};

// Keep page data integrity on user page refreshes
export function refreshPage(pageData: ImageContent[]) {

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
                    const serializedState = JSON.parse(localStorage.app_state);
                    const favorites = serializedState.favorites;
                    const basketData = serializedState.shoppingBasket;

                    // tslint:disable-next-line:no-console
                    console.log("Local storage items:", serializedState);
                    // it will first login and then log out if time is expired
                    verifyTokenandDispatch(dispatch, pageData, token, username, userAuthorized, redirect, favorites, basketData);
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
