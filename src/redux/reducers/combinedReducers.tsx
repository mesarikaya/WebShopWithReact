import { combineReducers } from 'redux';

// import { authorizeLocalUser } from './UserContentReducer';
import { updatePageReducer } from './PageContent';

import { routerReducer } from 'react-router-redux';

/* import { StoreState } from '../types/storeState';
import { UpdateLocalUserAuthenticationStatusAction } from '../actions/LocalUserAutorizationActions';
import { UpdatePageContentAction } from '../actions/PageContentActions';
*/

export default combineReducers({
    router: routerReducer,
    updatePageReducer
});