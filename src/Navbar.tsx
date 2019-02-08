// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";

// Import necessary Redux store state interface, actions, bootstrap.css, stylesheets, basic image and font awesome
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from './images/Logo.png';
import * as actions from './redux/actions/PageContentActions';
import { ImageContent} from './redux/types/storeState';
import './stylesheets/App.css';

// Create history variable to be able to go back and forth within routes
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({ forceRefresh: true });

import HamburgerMenu from './HamburgerMenu';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
export interface Props {
    showCategories: boolean;
    pageData: ImageContent[];
    userAuthorized: boolean;
    onLogout(e: any, pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

// Create Navbar component 
class Navbar extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public setMenuItemListOrHomeButton() {

        // Check the state of the showCategories prop and show accordingly
        if (this.props.showCategories) {
            return (
                <HamburgerMenu />
            );
        } else {
            return (
                <a href="/home">
                    <button className="btn home_button" type="button">
                        <strong><i className="fas fa-home" /></strong>
                    </button>
                </a>
            );
        }
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
                    <button className="btn btn-sm login_button m-2" onClick={(e) => { this.props.onLogout(e, this.props.pageData) }}>
                        <i className="fas fa-user-plus"><strong id="icons"> Log out</strong></i>
                    </button>
                </a>
            );
        }
    }

    public render() {

        return (
            <React.Fragment>
                {/* <!- Navigation Bar --> */}
                <nav className="navbar navbar-light bg-light fixed-top">

                    <div className="container pt-3">
                        {/* <!- Search Form --> */}
                        <div className="row box">
                            <div className="col-12 col-sm-4 col-md-4 pt-2 nav_top">
                                <a className="navbar-brand" ><img className="img-fluid rounded-circle img_logo" src={Logo} alt="" style={{ maxWidth: '30px', height: '30px' }} /></a>
                                {/* <!- Menu Items or Home button--> */}
                                {this.setMenuItemListOrHomeButton()}
                                {/* <!-- End of the hamburger menu --> */}
                            </div>

                            <div className="col-12 col-sm-12 col-md-4 d-flex search_box">
                                <section className="search_form" id="search_form">
                                    <form className="form-inline my-2 my-lg-0">
                                        <div className="input-group">
                                            <input type="search" className="form-control py-2 border-right-0 border search_input"
                                                placeholder="Search" aria-label="search" aria-describedby="search-form" />
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
                                
                                <a href="/api/images">
                                    <button className="btn btn-sm favorites_button">
                                        <i className="fas fa-heart">
                                            <strong id="icons"> Favorites</strong>
                                        </i>
                                    </button>
                                </a>
                                <a href="/myorders">
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
        onLogout: (e: any, pageData: ImageContent[]) => dispatch(actions.signOutLocalUser(e, pageData))
    }
}

export default connect(null, mapDispatchToProps)(Navbar);