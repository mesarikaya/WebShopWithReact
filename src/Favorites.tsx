// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';
import { Dispatch } from "redux";

// Import necessary Redux store state interface, actions, bootstrap.css, stylesheets, basic image and font awesome
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import * as actions from './redux/actions/PageContentActions';
import { ImageContent, StoreState } from './redux/types/storeState';
import './stylesheets/Favorites.css';

// Import the presentational components for this container  
import FavoritesImages from './FavoritesImages';
// import ImageList from './ImageList';
import Navbar from './Navbar';

// Creaate history variable to be able to go back and forth within routes
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({ forceRefresh: true });

// Import the final set store shape from Redux
import { store } from './redux/store';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
export interface Props {
    error: {
        message: string,
        status: string
    };
    favorites: ImageContent[];
    isLoading: boolean;
    pageData: ImageContent[];
    redirect: boolean;
    rows: any;
    shoppingBasket: ImageContent[];
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
class Favorites extends React.Component<Props & RouteComponentProps<PathProps>, StoreState> {
    public state: StoreState;

    constructor(props: Props & RouteComponentProps<PathProps>) {
        super(props);

        // Check if there is already content on the store state for pageData
        const currAppState = store.getState();

        // tslint:disable-next-line:no-console
        console.log("App state for content state: ", currAppState);
        this.state = {
            error: currAppState.error,
            favorites: currAppState.favorites,
            isLoading: true,
            pageData: currAppState.pageData,
            redirect: false,
            shoppingBasket: currAppState.shoppingBasket,
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
        const rows = [];
        for (const obj in data) {
            if (data.hasOwnProperty(obj)) {
                rows.push(<FavoritesImages
                    key={data[obj]._id}
                    Author={data[obj].Author}
                    Description={data[obj].Description.substring(0,150)+"..."}
                    Group={data[obj].Group}
                    Image={data[obj].Image}
                    ImageId={data[obj].ImageId}
                    Name={data[obj].Name}
                    Reserved={data[obj].Reserved}
                    Reserved_Until={data[obj].Reserved_Until}
                    Type={data[obj].Type}
                    UserId={this.props.username}
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
                    <button className="btn btn-sm login_button m-2"
                        onClick={(e) => { this.props.onLogout(e, this.state.pageData) }}>
                        <i className="fas fa-user-plus"><strong id="icons"> Log out</strong></i>
                    </button>
                </a>
            );
        }
    }

    public render() {

        const rows = this.setContent(this.props.favorites);
        // tslint:disable-next-line:no-console
        console.log("updating the App");

        return (
            <div className="Favorites">
                {/* <!- Navigation Bar --> */}
                <Navbar canReturnHome={true} searchText={''} showCategories={true}
                    pageData={this.props.pageData} userAuthorized={this.props.userAuthorized} returnHomePage={true}/>

                <div className="container pt-5">
                    <div className="row cardsRow justify-content-around" >
                        {rows}
                    </div>
                </div>

            </div>
        );
    }
}

// Create mapToState and mapDispatch for Redux
export function mapStateToProps(state: StoreState, OwnProps: Props & RouteComponentProps<PathProps>) {
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

// Set functions to use in Redux Dispatch
export function mapDispatchToProps(dispatch: any) {
    return {
        onGetContent: (e: any, type: string, ageGroup: string) => dispatch(actions.UpdatePageContent(e, type, ageGroup)),
        onLogout: (e: any, pageData: ImageContent[]) => dispatch(actions.signOutLocalUser(e, pageData)),
        onRefresh: (pageData: ImageContent[]) => dispatch(actions.refreshPage(pageData)),
        synchronizePageData: (pageData: ImageContent[]) => dispatch(actions.SynchronizePageData(pageData)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));