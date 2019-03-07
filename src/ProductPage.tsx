import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './stylesheets/ProductPage.css';

// Import necessary code from other modules
import { store } from './redux/store';

// Import the presentational components for this container  
import Navbar from './Navbar';

import * as actions from './redux/actions/PageContentActions';
import { ImageContent, StoreState } from './redux/types/storeState';

// import createBrowserHistory from 'history/createBrowserHistory';
import { Dispatch } from 'redux';

import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/";

// const history = createBrowserHistory({ forceRefresh: true });

type ImageData = ImageContent;

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

export interface ProductPageProps {
    goToAccountPage: boolean;
    imageData: ImageData;
    pageData: ImageContent[];
    shoppingBasket: ImageContent[];
    userAuthorized: boolean;
    modifyFavorites(e: any, props: any, action: boolean): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    modifyShoppingBasket(e: any, props: any, action: boolean): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    onLogout(e: any, pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    synchronizePageData(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

interface ProductPageState {
    goToAccountPage: boolean;
    imageData: ImageData;
    originatedPage: string;
    userAuthorized: boolean;
};

class ProductPage extends React.Component<ProductPageProps & RouteComponentProps<PathProps>, ProductPageState> {
    public state: ProductPageState & StoreState;

    constructor(props: ProductPageProps & RouteComponentProps<PathProps>) {
        super(props);

        const currAppState = store.getState();

        const imageDataJSON = {
            Author: '',
            Description: '',
            Group: '',
            Image: '',
            ImageId: '',
            Name: '',
            Reserved: '',
            Reserved_Until: '',
            Type: '',
            UserId: '',
            key: ''
        };

        /*const historyState = history.location.state;
        const originatedPageStr = (typeof (historyState) !== "undefined" && typeof (historyState.originatedPage) !== "undefined") ? historyState.originatedPage : "/";
        const pageDataJSON = (typeof (historyState) !== "undefined" && typeof (historyState.pageData) !== "undefined") ? historyState.pageData : currAppState.pageData;

        const imageDataJSON = {
            Author: '',
            Description: '',
            Group: '',
            Image: '',
            ImageId: '',
            Name: '',
            Reserved: '',
            Reserved_Until: '',
            Type: '',
            UserId: '',
            key: ''
        };

        if (typeof (historyState) !== "undefined" && typeof (historyState.imageData) !== "undefined") {
            imageDataJSON= {
                Author: historyState.imageData.Author,
                Description: historyState.imageData.Description,
                Group: historyState.imageData.Group,
                Image: historyState.imageData.Image,
                ImageId: historyState.imageData.ImageId,
                Name: historyState.imageData.Name,
                Reserved: historyState.imageData.Reserved,
                Reserved_Until: historyState.imageData.Reserved_Until,
                Type: historyState.imageData.Type,
                UserId: historyState.imageData.UserId,
                key: historyState.imageData.key
            }
        }

        // tslint:disable-next-line:no-console
        console.log("originated state is: ", typeof historyState);*/

        this.state = {
            error: currAppState.error,
            favorites: currAppState.favorites,
            goToAccountPage: false,
            imageData: imageDataJSON,
            isLoading: true,
            originatedPage: '/',
            pageData: currAppState.pageData,
            redirect: false,
            shoppingBasket: currAppState.shoppingBasket,
            userAuthorized: false,
            username: "guest"
        };
    }

    public componentDidMount() {

        // Send all the data on component load
        // this.props.synchronizePageData(this.state.pageData);
        // tslint:disable-next-line:no-console  
        console.log("Location parsing for verification: ", this.props.match.params);
        const params = JSON.parse(JSON.stringify(this.props.match.params));
        // tslint:disable-next-line:no-console  
        console.log("Location parsing for verification: ", params);

        // Send all the data on component load
        this.getProduct(params);
    }

    public getProduct = (params: any) => {

        return (axios.get(`${url}product`, {
            params
        }).then((response) => {

            // handle success
            // tslint:disable-next-line:no-console  
            console.log("success in aios in get product", params, response);
            if (response.status) {
                const result = response.data.result[0];
                // tslint:disable-next-line:no-console  
                console.log("shared result", result);
                this.setState({
                    imageData: {
                        Author: result.Author,
                        Description: result.Description,
                        Group: result.Group,
                        Image: result.Image,
                        ImageId: result._id,
                        Name: result.Name,
                        Reserved: result.Reserved,
                        Reserved_Until: result.Reserved_Until,
                        Type: result.Type,
                        UserId: this.state.username,
                        key: result._id
                    }
                });
            }
        }).catch(error => {
            // handle error
            // tslint:disable-next-line:no-console
            console.log("Error in get product is:", error.response);
        }));
    };

    public modifyLoginButton() {
        if (this.props.userAuthorized === false) {
            return (
                <a onClick={(e) => { this.openAccountPage(e) }}>
                    <button className="btn btn-sm login_button m-2">
                        <i className="fas fa-user-plus"><strong id="icons"> Log in</strong></i>
                    </button>
                </a>
            );
        } else {
            return (
                <a>
                    <button className="btn btn-sm login_button m-2"
                        onClick={(e) => { this.props.onLogout(e, this.state.pageData) }}>
                        <i className="fas fa-user-plus"><strong id="icons"> Log out</strong></i>
                    </button>
                </a>
            );
        }
    }

    public openAccountPage(e: any) {
        // Deactivate default behavior
        if (e !== null) { e.preventDefault(); }

        this.setState({ goToAccountPage: true });
    }

    public render() {
        if (this.state.goToAccountPage) {
            return (<Redirect to='/account' />);
        } else {
            // Set default picture
            let picture = '';

            // Get the appropriate picture dynamically
            if (this.state.imageData.Type === "Smart Toys") {
                if (this.state.imageData.Image !== '' && typeof this.state.imageData.Type !== 'undefined' && typeof this.state.imageData.Image !== 'undefined') {
                    picture = './images/' + this.state.imageData.Type + '/' + this.state.imageData.Image;
                }
            } else {
                if (this.state.imageData.Image !== '' && typeof this.state.imageData.Type !== 'undefined' && typeof this.state.imageData.Group !== 'undefined' && typeof this.state.imageData.Image !== 'undefined') {
                    picture = './images/' + this.state.imageData.Type + '/' + this.state.imageData.Group + '/' + this.state.imageData.Image;
                }
            }


            if (picture !== '') {
                return (
                    <div className="ProductPage mt-5">
                        {/* <!- Navigation Bar --> */}
                        <Navbar canReturnHome={true} searchText={''} showCategories={false}
                            pageData={this.props.pageData} userAuthorized={this.props.userAuthorized} returnHomePage={true} />

                        {/*<!-- Container for Selected image details -->*/}
                        <div className="container ">
                            <div className="row">
                                <div className="col-12 col-sm-4 col-md-4 text-center p-2">
                                    <a>
                                        <img className="img-fluid rounded mb-3" src={require(`${picture}`)} alt="testing" />
                                    </a>
                                </div>
                                <div className="col-12 col-sm-8 col-md-8">
                                    <h4 className="text-center mb-3" id="product_name">{this.state.imageData.Name}</h4>
                                    <div className="product_details">
                                        <p> <strong>Author:</strong> <span id="Author">{this.state.imageData.Author}</span></p>
                                        <p> <strong>Age Group:</strong> <span id="Age_Group">{this.state.imageData.Group}</span></p>
                                        <p> <strong>Description:</strong> <span id="Description">{this.state.imageData.Description}</span></p>
                                    </div>

                                    <div className="row justify-content-center">
                                        <a className="mr-5" href="/add_to_basket">
                                            <button className="btn btn-sm add_to_basket_button"
                                                onClick={(e) => { this.props.modifyShoppingBasket(e, this.state.imageData, true) }}>
                                                <i className="fas fa-cart-plus icon_big">
                                                    <strong className="text-center" id="icons"> Add to basket </strong>
                                                </i>
                                            </button>
                                        </a>
                                        <a href="/add_to_favorites">
                                            <button className="btn btn-sm favorites_button"
                                                onClick={(e) => { this.props.modifyFavorites(e, this.state.imageData, true) }}>
                                                <i className="fas fa-heart icon_big">
                                                    <strong id="icons"> Add to Favorites</strong>
                                                </i>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="col-12 col-sm-6 col-md-3 text-center p-2 image_add_ons">
                        <h4>No items to show</h4>
                    </div>
                );
            }
        }


    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        modifyFavorites: (e: any, props: any, action: boolean) => dispatch(actions.modifyFavorites(e, props, action)),
        modifyShoppingBasket: (e: any, props: any, action: boolean) => dispatch(actions.modifyShoppingBasket(e, props, true)),
        onLogout: (e: any, pageData: ImageContent[]) => dispatch(actions.signOutLocalUser(e, pageData)),
        synchronizePageData: (pageData: ImageContent[]) => dispatch(actions.SynchronizePageData(pageData)),
    }
}

// Create mapToState and mapDispatch for Redux
export function mapStateToProps(state: StoreState & ProductPageState, OwnProps: ProductPageProps & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        favorites: state.favorites,
        isLoading: state.isLoading,
        pageData: state.pageData,
        redirect: state.redirect,
        shoppingBasket: state.shoppingBasket,
        userAuthorized: state.userAuthorized,
        username: state.username
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
