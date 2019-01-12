export interface ImageContent {
    Author: string;
    Group: string;
    Name: string;
    Reserved: string;
    Reserved_Until: string;
    Type: string;
}

export interface StoreState {
    error: string;
    images: string;
    isLoading: boolean;
    pageData: ImageContent[];
}