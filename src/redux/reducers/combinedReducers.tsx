import { combineReducers } from 'redux';

import { updatePageReducer } from './PageContent';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    router: routerReducer,
    updatePageReducer,
});