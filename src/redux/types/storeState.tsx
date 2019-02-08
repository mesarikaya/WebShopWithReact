export interface FavoritesData {
    contentId: string,
    image: string,
    productDescription: string,
    productName: string
};

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
    favorites: FavoritesData[]; 
    isLoading: boolean;
    pageData: ImageContent[];
    redirect: boolean;
    userAuthorized: boolean;
    username: string;
}