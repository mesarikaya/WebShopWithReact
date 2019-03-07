// Import Redux Actions, store state and type constants
import { UpdatePageContentAction } from '../actions/PageContentActions';
import { ERROR_MSG, UPDATE_BASKET, UPDATE_FAVORITES, UPDATE_PAGE_CONTENT } from '../constants/PageContentConstants';
import { UPDATE_LOCAL_USER_AUTHORIZATION } from '../constants/PageContentConstants';
import { StoreState } from '../types/storeState';

export function updatePageReducer(state: any, action: UpdatePageContentAction): StoreState  {
    // tslint:disable-next-line:no-console
    console.log("action is:", action);
    switch (action.type) {

        case UPDATE_PAGE_CONTENT: // Update images and loading status on page
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                pageData: [...action.pageData]
            })
        case UPDATE_LOCAL_USER_AUTHORIZATION: // Update user login status and redirect command
            return Object.assign({}, state, {
                favorites: [...action.favorites],
                pageData: [...action.pageData],
                redirect: action.redirect,
                shoppingBasket: [...action.basketData],
                userAuthorized: action.userAuthorized,
                username: action.username
            })
        case UPDATE_FAVORITES: // Update user favorites
            return Object.assign({}, state, {
                favorites: [...action.favoritesData]
            })
        case UPDATE_BASKET: // Update user favorites
            return Object.assign({}, state, {
                shoppingBasket: [...action.basketData]
            })
        case ERROR_MSG: // Error status message updates
            return Object.assign({}, state, {
                error: action.error
            })
        default:
            return state
    }
}