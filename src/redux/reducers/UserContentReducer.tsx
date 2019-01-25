
import { UpdateLocalUserAuthenticationStatusAction } from '../actions/LocalUserAutorizationActions';
import { UPDATE_LOCAL_USER_AUTHORIZATION } from '../constants/PageContentConstants';

import { StoreState } from '../types/storeState';

export function authorizeLocalUser(state: any, action: UpdateLocalUserAuthenticationStatusAction): StoreState {


    switch (action.type) {

        case UPDATE_LOCAL_USER_AUTHORIZATION:
            return {
                ...state,
                userAuthorized: action.userAuthorized,
                username: action.username                
            }
        default:
            return state;
    }
}