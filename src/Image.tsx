// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";

// Creaate history variable to be able to go back and forth within routes
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({ forceRefresh: true });

// Import the final set store and actions from Redux
import * as actions from './redux/actions/PageContentActions';
import { store } from './redux/store';
import { ImageContent } from './redux/types/storeState';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
type ImageProps = ImageContent;
type ImageState = ImageContent;

export interface ImageExtraProps {
    UserId: string;
    modifyFavorites(e: any, props: any, action: boolean): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    modifyShoppingBasket(e: any, props: any, action: boolean): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

export interface ImageExtraState {
    UserId: string;
};

class Image extends React.Component<ImageProps & ImageExtraProps, ImageState & ImageExtraState> {
    public state: ImageState & ImageExtraState;   

    constructor(props: ImageProps & ImageExtraProps) {
        super(props);
        this.state = {
            Author: this.props.Author,
            Description: this.props.Description,
            Group: this.props.Group,
            Image: this.props.Image,
            ImageId: this.props.ImageId,
            Name: this.props.Name,
            Reserved: this.props.Reserved,
            Reserved_Until: this.props.Reserved_Until,
            Type: this.props.Type,
            UserId: this.props.UserId
        };
    }
    public componentDidMount() {
        this.setState({
            Author: this.state.Author,
            Description: this.state.Description,
            Group: this.state.Group,
            Image: this.state.Image,
            ImageId: this.state.ImageId,
            Name: this.state.Name,
            Reserved: this.state.Reserved,
            Reserved_Until: this.state.Reserved_Until,
            Type: this.state.Type,
            UserId: this.props.UserId
        });
    }

    
    public openProductPage(e: any, imageData: any) {
        // Deactivate default behavior
        if (e !== null) { e.preventDefault(); }

        // Call product page with the product details
        // TODO change this to an axios CALL
        const currAppState = store.getState();

        const dataToShare = {
            error: currAppState.error,
            favorites: currAppState.favorites,
            'imageData': imageData,
            images: currAppState.images,
            isLoading: true,
            originatedPage: '/',
            pageData: currAppState.pageData,
            userAuthorized: currAppState.userAuthorized,
            username: currAppState.username
        };

        // tslint:disable-next-line:no-console
        console.log("Here are the final images!!!!!!:", dataToShare);
        history.push('/productPage/' + imageData.ImageId, dataToShare);
    }

    public render() {
        // Set default picture
        let picture = '';

        // Get teh appropriate picture dynamically
        if (this.props.Type === "Smart Toys") {
            if (this.props.Image !== '' && typeof this.props.Type !== 'undefined' && typeof this.props.Image !== 'undefined') {
                picture = './images/' + this.props.Type + '/' + this.props.Image;
            }
        } else {
            if (this.props.Image !== '' && typeof this.props.Type !== 'undefined' && typeof this.props.Group !== 'undefined'
                && typeof this.props.Image !== 'undefined') {
                picture = './images/' + this.props.Type + '/' + this.props.Group + '/' + this.props.Image;
            }
        }

        if (picture !== '') {
            return (
                <div className="col-12 col-sm-6 col-md-3 text-center p-2 image_add_ons">
                    <a className="" onClick={(e) => { this.openProductPage(e, this.state) }}>
                        <img className="img-fluid rounded" src={require(`${picture}`)} alt="test" />
                    </a>
                    <a className="add_to_cart_img" onClick={(e) => { this.props.modifyShoppingBasket(e, this.props, true) }} />
                    <a className="add_to_favorites_img" onClick={(e) => { this.props.modifyFavorites(e, this.props, true) }} />
                </div>
            );
        } else {
            return (
                <div className="col-12 col-sm-6 col-md-3 text-center p-2 image_add_ons">
                    <h4>No items to show</h4>
                </div>    
            );
            
        }

        // tslint:disable-next-line:no-console
        // console.log("Here are the final images!!!!!!:", defaultPicture);
        
    }
}

// Set functions to use in Redux Dispatch
export function mapDispatchToProps(dispatch: any) {
    return {
        modifyFavorites: (e: any, props: any, action: boolean) => dispatch(actions.modifyFavorites(e, props, true)),
        modifyShoppingBasket: (e: any, props: any, action: boolean) => dispatch(actions.modifyShoppingBasket(e, props, true))
    }
}

export default connect(null, mapDispatchToProps)(Image);