// Import necessary packages
import * as React from 'react';

// Creaate history variable to be able to go back and forth within routes
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({ forceRefresh: true });

// Import the final set store shape from Redux
import { store } from './redux/store';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
export interface ImageProps {
    Author: string;
    Description: string;
    Group: string;
    Image: string;
    key: string;
    Name: string;
    Reserved: string;
    Reserved_Until: string;
    Type: string;  
};

interface ImageState {
    Author: string;
    Description: string;
    Group: string;
    Image: string;
    key: string;
    Name: string;
    Reserved: string;
    Reserved_Until: string;
    Type: string; 
};

class Image extends React.Component<ImageProps, ImageState> {
    public state: ImageState;   

    constructor(props: ImageProps) {
        super(props);
        this.state = {
            Author: this.props.Author,
            Description: this.props.Description,
            Group: this.props.Group,
            Image: this.props.Image,
            Name: this.props.Name,
            Reserved: this.props.Reserved,
            Reserved_Until: this.props.Reserved_Until,
            Type: this.props.Type,
            key: this.props.key
        };
    }
    public componentDidMount() {
        this.setState({
            Author: this.state.Author,
            Group: this.state.Group,
            Image: this.state.Image, 
            Name: this.state.Name, Reserved: this.state.Reserved,
            Reserved_Until: this.state.Reserved_Until, Type: this.state.Type, key: this.state.key
        });
    }
    public openProductPage(e: any, imageData: any) {
        // Deactivate default behavior
        if (e !== null) { e.preventDefault(); }

        // Call product page with the product details
        // TODO change this to an axios CALL
        const currAppState = store.getState();
        const dataToShare = {
            'error': currAppState.error,
            'imageData': imageData,
            'images': currAppState.images,
            'isLoading': true,
            'originatedPage': '/',
            'pageData': currAppState.pageData,
            'userAuthorized': currAppState.userAuthorized,
            'username': currAppState.username
        };
        history.push('/productPage/' + imageData.Name, dataToShare);
    }

    public render() {
        // Set default picture
        let picture = './images/Books/0-1/At_the_zoo.png';

        // Get teh appropriate picture dynamically
        if (this.props.Type === "Smart Toys") {
            if (typeof this.props.Type !== 'undefined' && typeof this.props.Image !== 'undefined') {
                picture = './images/' + this.props.Type + '/' + this.props.Image;
            }
        } else {
            if (typeof this.props.Type !== 'undefined' && typeof this.props.Group !== 'undefined' && typeof this.props.Image !== 'undefined') {
                picture = './images/' + this.props.Type + '/' + this.props.Group + '/' + this.props.Image;
            }
        }

        // tslint:disable-next-line:no-console
        // console.log("Here are the final images!!!!!!:", defaultPicture);
        return (
            
            <div className="col-12 col-sm-6 col-md-3 text-center p-2 image_add_ons">
                <a className="" onClick={(e) => { this.openProductPage(e, this.props) }}>
                    <img className="img-fluid rounded" src={require(`${picture}`)} alt="test" />
                </a>
                <a className="add_to_cart_img" href="/add_to_basket" />
                <a className="add_to_favorites_img" href="/add_to_favorites" />
            </div>
        );
    }
}

export default Image;