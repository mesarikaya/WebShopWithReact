﻿import { applyMiddleware, createStore} from 'redux';

// import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import { updatePageReducer } from '../redux/reducers/PageContent';
// import reducer from '../redux/reducers/combinedReducers';

// import { routerReducer } from 'react-router-redux';

// import { UpdatePageContentAction } from '../redux/actions/PageContentActions';

import createHistory from 'history/createBrowserHistory';
// import { StoreState } from './types/storeState';

import { StoreState } from '../redux/types/storeState';
import { UpdatePageContentAction } from './actions/PageContentActions';

/*const rootReducer = combineReducers({
    updatePageReducer,
}); */



const initialState = {
    error: "",
    images: "",
    isLoading: false,
    pageData: [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }]
}; 




export const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
// const myRouterMiddleware = routerMiddleware(history);
export const store = createStore<StoreState, UpdatePageContentAction, any, any>(updatePageReducer, initialState, composeWithDevTools(applyMiddleware(thunk, logger)));

