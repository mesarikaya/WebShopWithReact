export interface ImageContent {
    Author: string;
    Description: string;
    Group: string;
    Image: string;
    ImageId: string;
    Name: string;
    Reserved: string;
    Reserved_Until: string;
    Type: string;
}

export interface StoreState {
    error: {
        message: string,
        status: string
    };
    favorites: ImageContent[]; 
    isLoading: boolean;
    pageData: ImageContent[];
    redirect: boolean;
    shoppingBasket: ImageContent[];
    userAuthorized: boolean;
    username: string;
}