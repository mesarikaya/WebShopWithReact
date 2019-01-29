﻿export interface ImageContent {
    Author: string;
    Group: string;
    Name: string;
    Reserved: string;
    Reserved_Until: string;
    Type: string;
}

export interface StoreState {
    error: string;
    isLoading: boolean;
    pageData: ImageContent[];
    redirect: boolean;
    userAuthorized: boolean;
    username: string;
}