// Import Redux Actions, store state and type constants
import { UpdatePageContentAction } from '../actions/PageContentActions';
import { UPDATE_PAGE_CONTENT } from '../constants/PageContentConstants';
import { UPDATE_LOCAL_USER_AUTHORIZATION } from '../constants/PageContentConstants';
import { StoreState } from '../types/storeState';

export function updatePageReducer(state: any, action: UpdatePageContentAction): StoreState  {

    switch (action.type) {

        case UPDATE_PAGE_CONTENT: // Update images and loading status on page
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                pageData: [...action.pageData]
            })
        case UPDATE_LOCAL_USER_AUTHORIZATION: // Update user login status and redirect command
            return Object.assign({}, state, {
                redirect: action.redirect,
                userAuthorized: action.userAuthorized,
                username: action.username
            })
        default:
            return state
    }
}