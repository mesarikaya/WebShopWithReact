import * as constants from '../constants/PageContentConstants';

import axios from 'axios';
import { Dispatch } from "redux";

import { ImageContent } from '../types/storeState';

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export interface UpdatePageContentInterface {
    type: constants.UPDATE_PAGE_CONTENT;
    isLoading: boolean;
    pageData: ImageContent[];
}

export type UpdatePageContentAction = UpdatePageContentInterface;

// export type UpdatePageContentAction = UPDATE_PAGE_CONTENT;

export function UpdatePageContent(e: any, type: string, ageGroup: string) {
    if (e !== null) { e.preventDefault(); }

    // tslint:disable-next-line:no-console
    console.log('REDUX UPDATE_PAGE_CONTENT The link was clicked.', 'Requesting: ', type, "and", e);

    // Get the content for the page
    const params = new URLSearchParams();
    params.append('searchType', type);
    params.append('ageGroup', ageGroup);
    let isLoading = true;
    let pageData = [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }];

    return ((dispatch: Dispatch<UpdatePageContentAction>) => {

        return (axios.get(`${url}images`, {
            params
        }).then((response) => {
            // handle success
            // tslint:disable-next-line:no-console
            console.log("CALLING FROM THE REDUX ACTIONS, response is:", response);
            isLoading = true;
            dispatch({ type: 'UPDATE_PAGE_CONTENT', pageData, isLoading });
            if (response.data.result === "No data") {
                isLoading = false;
                pageData = [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }];
            }
            else if (response.status === 503) {
                isLoading = false;
                pageData = [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }];
            }
            else {
                isLoading = false;
                pageData = response.data.result;
            }
            // tslint:disable-next-line:no-console
            console.log("pageData is from within the action: ", pageData);

            dispatch({ type: 'UPDATE_PAGE_CONTENT', pageData, isLoading });
        })
        .catch(error => {
            // handle error
            // tslint:disable-next-line:no-console
            console.log("Error in get is:", error.response);
            throw (error);
        }))
    });
};


export function SynchronizePageData(content: ImageContent[]) {
    // Get the content for the page
    const isLoading = false;
    const pageData = content;

    return ((dispatch: Dispatch<UpdatePageContentAction>) => {
        dispatch({ type: 'UPDATE_PAGE_CONTENT', pageData, isLoading });
    });
};