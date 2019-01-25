import * as constants from '../constants/PageContentConstants';

// import axios from 'axios';
import { Dispatch } from "redux";

import { ImageContent } from '../types/storeState';

// const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export interface LocalUserAuthorizationInterface {
    type: constants.UPDATE_LOCAL_USER_AUTHORIZATION;
    userAuthorized: boolean;
    username: string;
    pageData: ImageContent[];
}

export type UpdateLocalUserAuthenticationStatusAction = LocalUserAuthorizationInterface;

export function UpdatePageContent(e: any, type: string, ageGroup: string) {
    if (e !== null) { e.preventDefault(); }

    // tslint:disable-next-line:no-console
    console.log('REDUX UPDATE_PAGE_CONTENT The link was clicked.', 'Requesting: ', type, "and", e);

    // Get the username parameters
    const username = "test";
    const userAuthorized = true;
    const pageData = [{ Type: "test", Name: "test", Author: "test", Group: "test", Reserved: "test", Reserved_Until: "test" }];

    return ((dispatch: Dispatch<UpdateLocalUserAuthenticationStatusAction>) => {
        return dispatch({ type: 'UPDATE_LOCAL_USER_AUTHORIZATION', username, userAuthorized, pageData });
    });
};