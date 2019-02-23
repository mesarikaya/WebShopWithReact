// Import necessary packages
// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { ImageContent } from './redux/types/storeState';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
type FavoriteImageProps = ImageContent;
type FavoriteImageState = ImageContent;

// Import the final set store and actions from Redux
import * as actions from './redux/actions/PageContentActions';

export interface ImageExtraProps {
    UserId: string;
    modifyFavorites(e: any, props: any, action: boolean): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

export interface ImageExtraState {
    UserId: string;
};

class FavoritesImages extends React.Component<FavoriteImageProps & ImageExtraProps, FavoriteImageState & ImageExtraState> {
    public state: FavoriteImageState & ImageExtraState;   

    constructor(props: FavoriteImageProps & ImageExtraProps) {
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

    public render() {
        // Set default picture
        let picture = '';

        // Get teh appropriate picture dynamically
        if (this.props.Type === "Smart Toys") {
            if (typeof this.props.Type !== 'undefined' && typeof this.props.Image !== 'undefined') {
                picture = './images/' + this.props.Type + '/' + this.props.Image;
            }
        } else if (this.props.Type !== '' && this.props.ImageId !== '') {
            if (typeof this.props.Type !== 'undefined' && typeof this.props.Group !== 'undefined'
                && typeof this.props.Image !== 'undefined') {
                picture = './images/' + this.props.Type + '/' + this.props.Group + '/' + this.props.Image;
            }
        }

        // tslint:disable-next-line:no-console
        // console.log("Here are the final images!!!!!!:", defaultPicture);
        if (picture !== '') {
            return (
                <div id="card">
                    <div id="hero-container">
                        <img className="img-fluid rounded favoriteImages" src={require(`${picture}`)}
                            alt="Product photo" style={{ height: '250px' }} />
                    </div>
                    <div id="card-content">
                        <div id="card-info">
                            <h2 id="category">{this.props.Type}</h2>
                            <div id="rating">
                                <a href="/api/images" id="favoritesImage">
                                    <button className="btn btn-sm favorites_button">
                                        <i className="far fa-heart favoriteInActive"
                                            style={{ color: '#f1356b', fontSize: '15px' }}
                                            onClick={(e) => { this.props.modifyFavorites(e, this.props, false) }}>
                                            <strong id="icons"> Favorites</strong>
                                        </i>
                                    </button>
                                </a>
                                <a href="/myorders">
                                    <button className="btn btn-sm myorders_button">
                                        <i className="fas fa-shopping-basket" id="orders"
                                            style={{ color: '#ff6000', fontSize: '16px' }}>
                                            <strong id="icons"> Add</strong>
                                        </i>
                                    </button>
                                </a>
                            </div>
                        </div>
                        <h2 id="title">{this.props.Name}</h2>
                        <p id="description">{this.props.Description}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <h4>No item is as favorite selected</h4>
            );
        }
    }
}

// Set functions to use in Redux Dispatch
export function mapDispatchToProps(dispatch: any) {
    return {
        modifyFavorites: (e: any, props: any, action: boolean) => dispatch(actions.modifyFavorites(e, props, action))
    }
}

export default connect(null, mapDispatchToProps)(FavoritesImages);