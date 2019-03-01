import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';

// Import bootstrap css
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from './images/Logo.png';
import './stylesheets/Account.css';

// Import Social Login buttons
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton'; 

library.add(faUser);
library.add(faKey);

// Import necessary code from other modules
import { store } from './redux/store';

import * as actions from './redux/actions/PageContentActions';
import { ImageContent, StoreState } from './redux/types/storeState';

import createBrowserHistory from 'history/createBrowserHistory';
import { Dispatch } from 'redux';

const history = createBrowserHistory({ forceRefresh: true });

// These props are provided by the router
interface PathProps {
    history: any;
    location: any;
    match: any;
}

export interface AccountPageProps {
    formFields: FormFields;
    originatedPage: string;
    redirect: boolean
    userAuthorized: boolean;
    signInLocalUser(e: any, formFields: any, pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    synchronizePageData(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};


interface FormFields {
    email: string,
    password: string
}

interface AccountPageState {
    error: string;
    formFields: FormFields;
    isLoading: boolean;
    originatedPage: string;
    pageData: ImageContent[];
    redirect: boolean;
    userAuthorized: boolean;
    username: string;
};


class Account extends React.Component < AccountPageProps & RouteComponentProps < PathProps >, AccountPageState > {
    public state: AccountPageState & StoreState;

    constructor(props: AccountPageProps & RouteComponentProps<PathProps>) {
        super(props);

        const currAppState = store.getState();
        
        this.state = {
            error: currAppState.error,
            favorites: currAppState.favorites,
            formFields: {
                email: "",
                password: "",
            },
            isLoading: true,
            originatedPage: currAppState.originatedPage,
            pageData: currAppState.pageData,
            redirect: currAppState.redirect,
            shoppingBasket: currAppState.shoppingBasket,
            userAuthorized: currAppState.userAuthorized,
            username: "guest"
        };
    }

    public componentDidMount() {
        // Send all the store data on component load
        this.props.synchronizePageData(this.state.pageData);
    }

    public openSignupPage(e: any) {
        // Deactivate default behavior
        if (e !== null) { e.preventDefault(); }
        history.push('/signup');
    }

    public onChange = (e: any) => {
        // Match the named inputs to the same named props
        const formFields = { ...this.state.formFields };
        formFields[e.target.name] = e.target.value;
        this.setState({
            formFields
        });
    }

    public render() {
        const signedInRedirect = this.props.userAuthorized && this.props.redirect;
       
        if (signedInRedirect) {
            // tslint:disable-next-line:no-console
            console.log("in redux", this.state.userAuthorized, this.state.redirect);
            return (<Redirect to='/' />);
        }
        else {
            return (<div className="Account mt-5">
                {/*<!-- Navigation Bar -->*/}
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">

                    <div className="container pt-3">
                        {/*<!--Search form-->*/}
                        <div className="row nav-box">
                            <div className="col-6 nav-left">
                                <a href="/home" className="navbar-brand">
                                    <img className="img-fluid rounded-circle" src={Logo} alt=""
                                    style={{ maxWidth: '30px', height: '30px' }} />
                                </a>
                            </div>

                            <div className="col-6 nav-right">
                                <a href="/home">
                                    <button className="btn home_button" type="button">
                                        <strong id="Category_list"><i className="fas fa-home" /> Home</strong>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/*<!-- Contact Section -->*/}
                <section id="box">
                    <div className="container pt-4">
                        <div className="row justify-content-around">
                            <div className="col-12 col-sm-12 col-md-5 left text-center">
                                <h2 className="text-uppercase text-secondary mt-2 mb-0 text-center">Sign in</h2>
                                <hr className="clearfix pt-2" />
                                <div className="row justify-content-center">
                                    <div className="col-12 col-sm-6 col-md-6 login-left text-center">

                                        <p className="text-secondary mt-2 mb-0 text-center"><strong>Local sign-in</strong></p>

                                        <hr className="clearfix pt-2" />
                                        <div className="row justify-content-center">
                                            <form className="needs-validation" noValidate={false} name="loginForm" id="contactForm"
                                                onSubmit={(e) => {
                                                    this.props.signInLocalUser(e, this.state.formFields, this.state.pageData);
                                                }}>
                                                <div className="control-group">
                                                    <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                                        <div className="input-group text-center">
                                                            <input className="form-control py-2 border-right-0 border" id="username"
                                                                type="text" placeholder="Username" name="email" required={true}
                                                                data-validation-required-message="Please enter username."
                                                                onChange={(e) => { this.onChange(e) }} />
                                                            <div className="input-group-addon userIcon" style={{ background: 'white' }}>
                                                                <div className="input-group-text border-0 border" style={{ background: 'white' }}>
                                                                    <FontAwesomeIcon icon="user" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="help-block text-danger" />
                                                    </div>
                                                </div>
                                                <div className="control-group">
                                                    <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                                        <div className="input-group text-center">
                                                            <input className="form-control py-2 border-right-0 border" id="password"
                                                                type="password" name="password" placeholder="Password" required={true}
                                                                data-validation-required-message="Please enter your password."
                                                                onChange={(e) => { this.onChange(e) }} />
                                                            <div className="input-group-addon passwordIcon" style={{ background: 'white' }}>
                                                                <div className="input-group-text border-0 border" style={{ background: 'white' }}>
                                                                    <FontAwesomeIcon icon="key" aria-hidden="true" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="help-block text-danger" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-check ml-3">
                                                        <input className="form-check-input" type="checkbox" value="" id="remember_me" />
                                                        <label className="form-check-label" htmlFor="remember_me"
                                                            style={{ paddingLeft: '0px', fontSize: '10px' }}>
                                                            Remember me
                                                    </label>
                                                    </div>
                                                </div>
                                                <div id="success" />
                                                <div className="form form-group">
                                                    <button type="submit" className="btn btn-primary btn-xl"
                                                        id="sendLoginRequestButton" value="Send">Sign in</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 login-right">
                                        <p className="text-secondary mt-2 mb-0 text-center"><strong>Social sign-in</strong></p>

                                        <hr className="clearfix pt-2" />
                                        <div className="row justify-content-center">
                                            <div className="btn-group-vertical">
                                                <FacebookButton pageData={this.state.pageData} />
                                                <GoogleButton pageData={this.state.pageData} />
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-5 right">
                                <h2 className="text-uppercase text-secondary mt-2 mb-0 text-center">Not a member?</h2>
                                <hr className="clearfix pt-2" />

                                <div className="row justify-content-center" style={{ marginBottom: '0px', marginTop: '1px', padding: 0 }}>
                                    <p> Register now! </p>
                                </div>
                                <div className="row justify-content-center" style={{ marginBottom: '5px', marginTop: '2px' }}>
                                    <p> Enjoy our personalized services!</p>
                                </div>
                                <div className="row justify-content-center" style={{ marginBottom: '0px' }}>
                                    <div className="signup_benefits ml-3">
                                        <p id="benefits"><i className="fas fa-check" /> Quick and fast order</p>
                                        <p id="benefits"><i className="fas fa-check" /> List of favorite products</p>
                                        <p id="benefits"><i className="fas fa-check" /> Shopping card saved in memory</p>
                                        <p id="benefits"><i className="fas fa-check" /> Overview of orders</p>
                                    </div>
                                </div>
                                <div className="row justify-content-center" >
                                    <a className="ml-2" href="/signup">
                                        <button className="btn btn-success" type="button" onClick={(e) => { this.openSignupPage(e) }}>
                                            <strong id="signup_button">Sign up</strong>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>);
        }
    }
}

// Create mapToState and mapDispatch for Redux
export function mapStateToProps(state: StoreState & AccountPageState, OwnProps: AccountPageProps & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        favorites: state.favorites,
        formFields: state.formFields,
        isLoading: state.isLoading,
        pageData: state.pageData,
        redirect: state.redirect,
        userAuthorized: state.userAuthorized,
        username: state.username,
    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        signInLocalUser: (e: any, formFields: any, pageData: ImageContent[]) => dispatch(actions.signInLocalUser(e, formFields, pageData)),
        synchronizePageData: (pageData: ImageContent[]) => dispatch(actions.SynchronizePageData(pageData)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
