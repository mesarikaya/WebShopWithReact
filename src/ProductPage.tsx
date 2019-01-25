import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';

// Import bootstrap css

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '.././src/images/Logo.png';
import '.././src/stylesheets/ProductPage.css';

// Import necessary code from other modules
import { store } from './redux/store';

import * as actions from '.././src/redux/actions/PageContentActions';
import { ImageContent, StoreState } from '.././src/redux/types/storeState';

import createBrowserHistory from 'history/createBrowserHistory';
import { Dispatch } from 'redux';

const history = createBrowserHistory({ forceRefresh: true });

export interface ImageData {
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

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

export interface ProductPageProps {
    imageData: ImageData;
    synchronizePageData(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

interface ProductPageState {
    imageData: ImageData;
    originatedPage: string;
};

// Create mapToState and mapDispatch for Redux
export function mapStateToProps(state: StoreState & ProductPageState, OwnProps: ProductPageProps & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        images: state.images,
        isLoading: state.isLoading,
        pageData: state.pageData,
        redirect: state.redirect,
        userAuthorized: state.userAuthorized,
        username: state.username
    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        synchronizePageData: (pageData: ImageContent[]) => dispatch(actions.SynchronizePageData(pageData)),
    }
}

class ProductPage extends React.Component<ProductPageProps & RouteComponentProps<PathProps>, ProductPageState> {
    public state: ProductPageState & StoreState;

    constructor(props: ProductPageProps & RouteComponentProps<PathProps>) {
        super(props);
        this.state = {
            error: history.location.state.error,
            imageData: {
                Author: history.location.state.imageData.Author,
                Description: history.location.state.imageData.Description,
                Group: history.location.state.imageData.Group,
                Image: history.location.state.imageData.Image,
                Name: history.location.state.imageData.Name,
                Reserved: history.location.state.imageData.Reserved,
                Reserved_Until: history.location.state.imageData.Reserved_Until,
                Type: history.location.state.imageData.Type,
                key: history.location.state.imageData.key
            },
            images: history.location.state.images,
            isLoading: history.location.state.isLoading,
            originatedPage: history.location.state.originatedPage,
            pageData: history.location.state.pageData,
            redirect: history.location.state.redirect,
            userAuthorized: history.location.state.userAuthorized,
            username: history.location.state.username
        };
    }

    public componentDidMount() {
        // Send all the data on component load
        this.props.synchronizePageData(this.state.pageData);
    }

    // Action for back button - Return to the previous page
    public goBack(e: any) {
        // Deactivate default behavior
        if (e !== null) { e.preventDefault(); }
        // tslint:disable-next-line:no-console
        console.log("Calling the previous");
        const currAppState = store.getState();
        const dataToShare = {
            'error': currAppState.error,
            'images': currAppState.images,
            'isLoading': true,
            'pageData': currAppState.pageData,
            'redirect': currAppState.redirect,
            'userAuthorized': currAppState.userAuthorized,
            'username': currAppState.username
        };
        history.push(this.state.originatedPage, dataToShare);
    }
    public render() {
        // Set default picture
        let picture = './images/Books/0-1/At_the_zoo.png';

        // Get teh appropriate picture dynamically
        if (this.state.imageData.Type === "Smart Toys") {
            if (typeof this.state.imageData.Type !== 'undefined' && typeof this.state.imageData.Image !== 'undefined') {
                picture = './images/' + this.state.imageData.Type + '/' + this.state.imageData.Image;
            }
        } else {
            if (typeof this.state.imageData.Type !== 'undefined' && typeof this.state.imageData.Group !== 'undefined' && typeof this.state.imageData.Image !== 'undefined') {
                picture = './images/' + this.state.imageData.Type + '/' + this.state.imageData.Group + '/' + this.state.imageData.Image;
            }
        }

        return (
        <div className="ProductPage mt-5">
           {/*<!-- Navigation Bar -->*/}
            <nav className="navbar navbar-light bg-light fixed-top">

                <div className="container pt-3">
                    {/* <!- Search Form --> */}
                    <div className="row ProductPageBox">
                            
                            <div className="col-6 col-sm-6 col-md-3 align-self-center">

                            <a className="navbar-brand" href="#page-top"><img className="img-fluid rounded-circle" src={Logo} alt=""
                                style={{ maxWidth: '30px', height: '30px' }} /></a>

                                <a href="/home">
                                <button className="btn home_button" type="button">
                                    <strong><i className="fas fa-home"/></strong>
                                </button>
                            </a>
                        </div>

                        <div className="col-6 col-sm-6 col-md-1 align-self-center">
                                <a href="/back">
                                    <button className="btn back_button float-right" onClick={(e) => { this.goBack(e) }}>
                                        <strong><i className="fas fa-hand-point-left" /></strong>
                                </button>
                            </a>
                        </div>

                        <div className="col-12 col-sm-12 col-md-4 d-flex search_box text-center">
                            <section className="search_form" id="search_form">
                                <form className="form-inline my-2 my-lg-0">
                                    <div className="input-group">
                                        <input type="search" className="form-control py-2 border-right-0 border search_input" placeholder="Search" aria-label="search" aria-describedby="search-form" />
                                        <div className="input-group-append">
                                            <button className="btn btn-sm search_button btn-outline-secondary border-left-0 border" type="submit"><i className="fas fa-search" /></button>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>

                        <div className="col-12 col-sm-12 col-md-4 fawesome text-center" >
                            <a href="/account">
                                <button className="btn btn-sm login_button m-2"><i className="fas fa-user-plus"><strong id="icons"> Log in</strong></i></button>
                            </a>
                            {/* <!--<button className="btn btn-sm signup_button"><i className="far fa-user"> <strong id="icons"> Sign up</strong></i></button>--> */}

                            <a href="/api/images">
                                <button className="btn btn-sm favorites_button"><i className="fas fa-heart"><strong id="icons"> Favorites</strong></i></button>
                            </a>
                            <a href="/myorders">
                                <button className="btn btn-sm myorders_button"><i className="fas fa-shopping-basket" id="orders"><strong id="icons"> My Orders</strong></i></button>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

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
                                <button className="btn btn-sm add_to_basket_button">
                                    <i className="fas fa-cart-plus icon_big"><strong className="text-center" id="icons"> Add to basket </strong></i>
                                </button>
                            </a>
                            <a href="/add_to_favorites">
                                <button className="btn btn-sm favorites_button"><i className="fas fa-heart icon_big"><strong id="icons"> Add to Favorites</strong></i></button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
      )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
