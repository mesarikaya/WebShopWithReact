// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';
import { Dispatch } from "redux";

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '.././src/images/Logo.png';
import '.././src/stylesheets/App.css';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({ forceRefresh: true });

// Import necessary code from other modules
import * as actions from '.././src/redux/actions/PageContentActions';
import { ImageContent, StoreState } from '.././src/redux/types/storeState';

import { store } from './redux/store';

// CREATE Prop and State interfaces
// Set the default Props
export interface Props {
    error: any;
    images: string;
    isLoading: boolean;
    pageData: ImageContent[];
    onGetContent(e: any, type: string, ageGroup: string): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    synchronizePageData(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

interface ImageListProps {
    pageData: ImageContent[];
    rows: any;
    history: any;
};

interface ImageListState {
    pageData: ImageContent[];
    rows: any;
    history: any;
};

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

// Create mapToState and mapDispatch for Redux
export function mapStateToProps(state: StoreState, OwnProps: Props & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        images: state.images,
        isLoading: state.isLoading,
        pageData: state.pageData,
    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        onGetContent: (e: any, type: string, ageGroup: string) => dispatch(actions.UpdatePageContent(e, type, ageGroup)),
        synchronizePageData: (pageData: ImageContent[]) => dispatch(actions.SynchronizePageData(pageData)),
    }
}

// Create App component 
class App extends React.Component<Props & RouteComponentProps<PathProps>, StoreState> {
  
    constructor(props: Props & RouteComponentProps<PathProps> ) {
        super(props);

    }

    public componentDidMount() {
        // Check if there is already content on the store state for pageData
        const content = store.getState().pageData;
        const historyState = history.location.state;

        // If the page is opened back with goBack
        if (historyState !== undefined && historyState.pageData !== undefined) {
            this.props.synchronizePageData(history.location.state.pageData);
        }
        else if (content === undefined || content.length === 0 || content["0"].Type === "") {
            // If no content is in the state, load all the items
            this.props.onGetContent(null, "allItems", "all");
        }
        else { // Otherwise load what is in the current store state
            this.props.synchronizePageData(store.getState().pageData);
        }
    }

    /* public componentDidMount() {
        // Send all the data on component load
        if (this.props.pageData === undefined || this.props.pageData.length === 0 || this.props.pageData["0"].Type === "") {
            this.props.onGetContent(null, "allItems", "all");
        }
    } */

    public setContent(data: any) {
        // Get all the items and set the image content
        // tslint:disable-next-line:no-console
        let count = 0;
        const rows = [];
        for (const obj in data) {
            if (data.hasOwnProperty(obj)) {
                count += 1;
                if (count > 1000) { break; }
                rows.push(<Image key={data[obj].Name + " " + count.toString()}
                    Type={data[obj].Type}
                    Name={data[obj].Name}
                    Author={data[obj].Author}
                    Group={data[obj].Group}
                    Reserved={data[obj].Reserved}
                    Reserved_Until={data[obj].Reserved_Until}
                    Image={data[obj].Image}
                    Description={data[obj].Description}
                />);
            }
        }
        return rows;
    }

    public openAccountPage(e: any) {
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
        };
        // tslint:disable-next-line:no-console
        console.log("Data to share is: ", dataToShare);
        history.push('account', dataToShare);
    }

    public render() {
        const rows = this.setContent(this.props.pageData);

        // const { match, location, history } = this.props;

        // tslint:disable-next-line:no-console
        // console.log("Rows are:", rows, match,history, location);
        return (
            <div className="App">
                {/* <!- Navigation Bar --> */}
                <nav className="navbar navbar-light bg-light fixed-top">

                    <div className="container pt-3">
                        {/* <!- Search Form --> */}
                        <div className="row box">
                            <div className="col-12 col-sm-4 col-md-4 pt-2 nav_top">
                                <a className="navbar-brand" ><img className="img-fluid rounded-circle img_logo" src={Logo} alt="" style={{ maxWidth: '30px', height: '30px' }} /></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <strong id="Category_list">Categories</strong>
                                    <i className="fa fa-bars"/>
                                </button>
                                {/* <!- Menu Items --> */}
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <div className="row">
                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <strong id="Books">Books</strong>
                                                    </a>
                                                    <div className="dropdown-menu mx-auto" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Books", "All") }}><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Books", "0-1") }}><i className="fas fa-child"> 0-1 year</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Books", "1-2") }}><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Books", "2-3") }}><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Books", "3-4") }}><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Books", "4-6") }}><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><strong id="Toys">Toys</strong>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Toys", "All") }}><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Toys", "0-1") }}><i className="fas fa-child"> 0-1 year</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Toys", "1-2") }}><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Toys", "2-3") }}><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Toys", "3-4") }}><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Toys", "4-6") }}><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><strong id="Puzzles">Puzzles</strong></a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Puzzles", "All") }}><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Puzzles", "1-2") }}><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Puzzles", "2-3") }}><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Puzzles", "3-4") }}><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Puzzles", "4-6") }}><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link" role="button" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e,"Smart Toys", "all") }}><strong id="Smart_Toys">Smart Toys</strong></a>
                                                </li>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                                {/* <!-- End of the hamburger menu --> */}
                            </div>

                            <div className="col-12 col-sm-12 col-md-4 d-flex search_box">
                                <section className="search_form" id="search_form">
                                    <form className="form-inline my-2 my-lg-0">
                                        <div className="input-group">
                                            <input type="search" className="form-control py-2 border-right-0 border search_input" placeholder="Search" aria-label="search" aria-describedby="search-form" />
                                            <div className="input-group-append">
                                                <button className="btn btn-sm search_button btn-outline-secondary border-0 border" type="submit" style={{ background: 'white' }}><i className="fas fa-search"/></button>
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </div>

                            <div className="col-12 col-sm-8 col-md-4 fawesome" >
                                <a onClick={(e) => { this.openAccountPage(e) }}>
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

                <div className="container">
                    <ImageList pageData={this.props.pageData} rows={rows} history={this.props.history} />
                </div>

            </div>
        );
    }
}


class ImageList extends React.Component<ImageListProps, ImageListState> {

    constructor(props: ImageListProps) {
        super(props);
    }

    public render() {

        // Send the Image List items to the Image component
        return (
            <div className="row images" >{this.props.rows}</div>
        );
    }
}

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

        // tslint:disable-next-line:no-console
        // console.log("Here are the image locs:", './images/' + this.props.Type + '/' + this.state.Group + '/' + this.state.Image);
    }
    public openProductPage(e: any, imageData: any) {
        // Deactivate default behavior
        if (e !== null) { e.preventDefault(); }
        // tslint:disable-next-line:no-console
        console.log("Calling the product page");
        const currAppState = store.getState();
        const dataToShare = {
            'error': currAppState.error,
            'imageData': imageData,
            'images': currAppState.images,
            'isLoading': true,
            'originatedPage': '/',
            'pageData': currAppState.pageData,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));