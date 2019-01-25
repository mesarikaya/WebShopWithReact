
import { UpdatePageContentAction } from '../actions/PageContentActions';
import { UPDATE_PAGE_CONTENT } from '../constants/PageContentConstants';

// import { UpdateLocalUserAuthenticationStatusAction } from '../actions/LocalUserAutorizationActions';
import { UPDATE_LOCAL_USER_AUTHORIZATION } from '../constants/PageContentConstants';

import { StoreState } from '../types/storeState';

 /* const initialState = {
    error: "",
    images: "",
    isLoading: true,
    pageData: [{ Type: "test", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }]
}; */

export function updatePageReducer(state: any, action: UpdatePageContentAction): StoreState  {

    switch (action.type) {

        case UPDATE_PAGE_CONTENT:
            // tslint:disable-next-line:no-console
            console.log("CALLING REDUCER", "UPDATE_PAGE_CONTENT");
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                pageData: [...action.pageData]
            })
        case UPDATE_LOCAL_USER_AUTHORIZATION:
            return Object.assign({}, state, {
                redirect: action.redirect,
                userAuthorized: action.userAuthorized,
                username: action.username
            })
        default:
            return state
    }
}