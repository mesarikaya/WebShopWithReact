// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';
import { Dispatch } from "redux";

// Import necessary Redux store state interface, actions, bootstrap.css, stylesheets, basic image and font awesome
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from './images/Logo.png';
import * as actions from './redux/actions/PageContentActions';
import { ImageContent, StoreState } from './redux/types/storeState';
import './stylesheets/App.css';

// Import the presentational components for this container  
import Image from './Image';
import ImageList from './ImageList';

// Creaate history variable to be able to go back and forth within routes
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({ forceRefresh: true });

// Import the final set store shape from Redux
import { store } from './redux/store';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
export interface Props {
    error: any;
    isLoading: boolean;
    pageData: ImageContent[];
    redirect: boolean;
    userAuthorized: boolean;
    username: string;
    onGetContent(e: any, type: string, ageGroup: string): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    onLogout(e: any, pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    onRefresh(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    synchronizePageData(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

// Create App component 
class App extends React.Component<Props & RouteComponentProps<PathProps>, StoreState> {
    public state: StoreState;

    constructor(props: Props & RouteComponentProps<PathProps>) {
        super(props);

        // Check if there is already content on the store state for pageData
        const currAppState = store.getState();

        // tslint:disable-next-line:no-console
        console.log("App state for content state: ", currAppState);
        this.state = {
            error: currAppState.error,
            isLoading: true,
            pageData: currAppState.pageData,
            redirect: false,
            userAuthorized: false,
            username: "guest"
        };

        // Check if there is any data in the store. If not, show all the content
        const content = currAppState.pageData;
        if (content === undefined || content.length === 0 || content["0"].Type === "") {
            // If no content is in the state, load all the items
            this.props.onGetContent(null, "allItems", "all");
        }
    }

    public componentDidMount() {

        // update login status on page refresh
        this.props.onRefresh(this.state.pageData);
    }

    public setContent(data: any) {
        // Get all the items and set the image content
        let count = 0;
        const rows = [];
        for (const obj in data) {
            if (data.hasOwnProperty(obj)) {
                count += 1;
                // if (count > 1000) { break; }
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

        history.push('account');
    }

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
                    <button className="btn btn-sm login_button m-2" onClick={(e) => { this.props.onLogout(e, this.state.pageData) }}>
                        <i className="fas fa-user-plus"><strong id="icons"> Log out</strong></i>
                    </button>
                </a>
            );
        }

    }

    public render() {

        const rows = this.setContent(this.props.pageData);
        // tslint:disable-next-line:no-console
        console.log("updating the App");

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

                                {this.modifyLoginButton()}
                                
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

// Create mapToState and mapDispatch for Redux
export function mapStateToProps(state: StoreState, OwnProps: Props & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        isLoading: state.isLoading,
        pageData: state.pageData,
        redirect: state.redirect,
        userAuthorized: state.userAuthorized,
        username: state.username
    }
}

// Set functions to use in Redux Dispatch
export function mapDispatchToProps(dispatch: any) {
    return {
        onGetContent: (e: any, type: string, ageGroup: string) => dispatch(actions.UpdatePageContent(e, type, ageGroup)),
        onLogout: (e: any, pageData: ImageContent[]) => dispatch(actions.signOutLocalUser(e, pageData)),
        onRefresh: (pageData: ImageContent[]) => dispatch(actions.refreshPage(pageData)),
        synchronizePageData: (pageData: ImageContent[]) => dispatch(actions.SynchronizePageData(pageData)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));