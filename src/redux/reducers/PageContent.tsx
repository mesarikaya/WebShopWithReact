
import { UpdatePageContentAction } from '../actions/PageContentActions';
import { UPDATE_PAGE_CONTENT } from '../constants/PageContentConstants';

import { StoreState } from '../types/storeState';

 /* const initialState = {
    error: "",
    images: "",
    isLoading: true,
    pageData: [{ Type: "test", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }]
}; */

export function updatePageReducer(state: any, action: UpdatePageContentAction): StoreState  {
    // tslint:disable-next-line:no-console
    console.log("CALLING REDUCER");

    switch (action.type) {

        case UPDATE_PAGE_CONTENT: 
            return {
                ...state,
                isLoading: action.isLoading,
                pageData: [...action.pageData]
            }
        default:
            return state;
    }
}