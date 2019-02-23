import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import { updatePageReducer } from '../redux/reducers/PageContent';
import { StoreState } from '../redux/types/storeState';
import { UpdatePageContentAction } from './actions/PageContentActions';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

/**
 * This function accepts the app state, and saves it to localStorage
 * @param state
 */
const saveState = (state:any) => {
    try {
        // Convert the state to a JSON string 
        const serialisedState = JSON.stringify(state);

        // Save the serialised state to localStorage against the key 'app_state'
        window.localStorage.setItem('app_state', serialisedState);
    } catch (err) {
        // Log errors here, or ignore
    }
};


/**
 * This function checks if the app state is saved in localStorage
 */
const loadState = () => {
    try {
        // Load the data saved in localStorage, against the key 'app_state'
        const serializedState = window.localStorage.getItem('app_state');

        // Passing undefined to createStore will result in our app getting the default state
        // If no data is saved, return undefined
        if (!serializedState) { return undefined; }

        // De-serialise the saved state, and return it.
        return JSON.parse(serializedState);
    } catch (err) {
        // Return undefined if localStorage is not available, 
        // or data could not be de-serialised, 
        // or there was some other error
        return undefined;
    }
};

/**
 * Create the app store
 */
let initialState = loadState();
if (typeof (initialState) === "undefined") {
    initialState = {
        error: {
            message: '',
            status: ''
        },
        favorites: [{
            Author: '',
            Description: '',
            Group: '',
            Image: '',
            ImageId: '',
            Name: '',
            Reserved: '',
            Reserved_Until: '',
            Type: ''
        }],
        isLoading: false,
        originatedPage: "/",
        pageData: [{
            Author: "",
            Description: "",
            Group: "",
            Image: "",
            ImageId: "",
            Name: "",
            Reserved: "",
            Reserved_Until: "",
            Type: ""
        }],
        redirect: false,
        shoppingBasket: [{
            Author: '',
            Description: '',
            Group: '',
            Image: '',
            ImageId: '',
            Name: '',
            Reserved: '',
            Reserved_Until: '',
            Type: ''
        }], 
        userAuthorized: false,
        username: "guest"
    };
}

export const store = createStore<StoreState, UpdatePageContentAction, any, any>(updatePageReducer, initialState, composeWithDevTools(applyMiddleware(myRouterMiddleware, thunk, logger)));

/**
 * Add a change listener to the store, and invoke our saveState function defined above.
 */
store.subscribe(() => {
    saveState(store.getState());
});