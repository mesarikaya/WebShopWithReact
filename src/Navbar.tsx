// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import { Dispatch } from "redux";

// Import necessary Redux store state interface, actions, bootstrap.css, stylesheets, basic image and font awesome
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from './images/Logo.png';
import * as actions from './redux/actions/PageContentActions';
import { ImageContent} from './redux/types/storeState';
import './stylesheets/App.css';

// Create history variable to be able to go back and forth within routes
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory({ forceRefresh: true });

import HamburgerMenu from './HamburgerMenu';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
export interface Props {
    canReturnHome: boolean;
    searchText: string;
    showCategories: boolean;
    pageData: ImageContent[];
    returnHomePage: boolean;
    userAuthorized: boolean;
    onLogout(e: any, pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    searchProduct(e: any, searchText: any): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};


interface NavBarState {
    goToAccountPage: boolean;
    goToHomePage: boolean;
    searchText: string;

};

// Create Navbar component 
class Navbar extends React.Component<Props, NavBarState> {
    public state: NavBarState;
    constructor(props: Props) {
        super(props);

        this.state = {
            goToAccountPage: false,
            goToHomePage: false,
            searchText: ""
        };
    }

    // On search text change change the form state
    public onChange = (e: any) => {
        this.setState({
            searchText: e.target.value
        });
    }

    public setMenuItemListOrHomeButton() {

        // tslint:disable-next-line:no-console
        console.log("Show Categories?:", this.props.showCategories);

        // Check the state of the showCategories prop and show accordingly
        if (this.props.showCategories) {
            return (
                <HamburgerMenu returnHomePage={this.props.returnHomePage} />
            );
        } else if (this.props.showCategories===false) {
            return (
                <a href="/">
                    <button className="btn home_button" type="button">
                        <strong><i className="fas fa-home" /></strong>
                    </button>
                </a>
            );
        } 

        return (
            <HamburgerMenu returnHomePage={this.props.returnHomePage} />
        );
    }

    public openAccountPage(e: any) {
        // Deactivate default behavior
        if (e !== null) { e.preventDefault(); }
        this.setState({
            goToAccountPage: true
        });
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
                    <button className="btn btn-sm login_button m-2" onClick={(e) => { this.props.onLogout(e, this.props.pageData) }}>
                        <i className="fas fa-user-plus"><strong id="icons"> Log out</strong></i>
                    </button>
                </a>
            );
        }
    }

    public searchProduct = (e: any, searchText: string) => {
        this.props.searchProduct(e, searchText);

        // If not the home page, redirect
        if (this.props.canReturnHome) {
            this.setState({
                goToHomePage: true,
            });
        }

    };

    public render() {
        
        if (this.state.goToHomePage) {
            return (<Redirect to='/' />);
        }

        if (this.state.goToAccountPage) {
            return (<Redirect to='/account' />);
        }

        return (
            <React.Fragment>
                {/* <!- Navigation Bar --> */}
                <nav className="navbar navbar-light bg-light fixed-top">

                    <div className="container pt-3">
                        {/* <!- Search Form --> */}
                        <div className="row box">
                            <div className="col-12 col-sm-4 col-md-4 pt-2 nav_top">
                                <a href="/" className="navbar-brand" ><img className="img-fluid rounded-circle img_logo"
                                    src={Logo} alt="" style={{ maxWidth: '30px', height: '30px' }} /></a>
                                {this.setMenuItemListOrHomeButton()}
                            </div>

                            <div className="col-12 col-sm-12 col-md-4 d-flex search_box">
                                <section className="search_form" id="search_form">
                                    <form className="form-inline my-2 my-lg-0"
                                        onSubmit={(e) => { this.searchProduct(e, this.state.searchText); }}
                                    >
                                        <div className="input-group">
                                            <input type="search" className="form-control py-2 border-right-0 border search_input"
                                                placeholder="Search" aria-label="search" aria-describedby="search-form"
                                                onChange={(e) => { this.onChange(e) }}/>
                                            <div className="input-group-append">
                                                <button className="btn btn-sm search_button btn-outline-secondary border-0 border"
                                                    type="submit" style={{ background: 'white' }}>
                                                    <i className="fas fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </div>

                            <div className="col-12 col-sm-8 col-md-4 fawesome" >

                                {this.modifyLoginButton()}
                                
                                <a href="/favorites">
                                    <button className="btn btn-sm favorites_button">
                                        {/* <!-<span className="fa-layers fa-fw">  --> */}
                                            <i className="fas fa-heart">
                                                <strong id="icons"> Favorites </strong>
                                            </i>
                                            {/* <!- <span className="fa-layers-counter fa-layers-top-right">1,419</span> --> */}
                                        {/*</span> --> */}
                                    </button>
                                </a>
                                <a href="/shoppingBasket">
                                    <button className="btn btn-sm myorders_button">
                                        <i className="fas fa-shopping-basket" id="orders">
                                            <strong id="icons"> My Basket</strong>
                                        </i>
                                    </button>
                                </a>
                            </div>

                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

// Set functions to use in Redux Dispatch
export function mapDispatchToProps(dispatch: any) {
    return {
        onLogout: (e: any, pageData: ImageContent[]) => dispatch(actions.signOutLocalUser(e, pageData)),
        searchProduct: (e: any, searchText: any) => dispatch(actions.searchProduct(e, searchText))
    }
}

export default connect(null, mapDispatchToProps)(Navbar);