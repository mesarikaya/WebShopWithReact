import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom';

// Import bootstrap css
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from './images/Logo.png';
import './stylesheets/Signup.css';

library.add(faUser);
library.add(faKey);

// Import necessary code from other modules
import { store } from './redux/store';

// Import the presentational components for this container
import Error from './Error';

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

export interface SignupPageProps {
    error: {
        message: string,
        status: string
    };
    synchronizePageData(pageData: ImageContent[]): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
    updateLocalUserAuthenticationStatus(e: any, formFields: any): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

interface FormFields {
    city: string,   
    confirm_password: string,
    country: string,
    email: string,
    firstName: string,
    houseNumber: string,
    mobileNumber: string,
    password: string,
    security_answer: string,
    streetName: string,
    surname: string,
    zipCode: string,
}

interface SignupPageState {
    activeFormPage: boolean[];
    ariaValueNow: number;
    hasError: boolean;
    originatedPage: string;
    formFields: FormFields;
};

class Signup extends React.Component<SignupPageProps & RouteComponentProps<PathProps>, SignupPageState> {
    public state: SignupPageState & StoreState;

    constructor(props: SignupPageProps & RouteComponentProps<PathProps>) {
        super(props);
        const currAppState = store.getState();
        this.state = {
            activeFormPage: [true, false, false],
            ariaValueNow: 25,
            error: {
                message: '',
                status: '',
            },
            favorites: currAppState.favorites,
            formFields: {
                city: "",
                confirm_password: "",
                country: "",
                email: "",
                firstName: "",
                houseNumber: "",
                mobileNumber: "",
                password: "",
                security_answer: "",
                streetName: "",
                surname: "",
                zipCode: "",
            },
            hasError: false,
            isLoading: currAppState.isLoading,
            originatedPage: currAppState.originatedPage,
            pageData: currAppState.pageData,
            redirect: currAppState.redirect,
            shoppingBasket: currAppState.shoppingBasket,
            userAuthorized: currAppState.userAuthorized,
            username: currAppState.username
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
            error: currAppState.error,
            favorites: currAppState.favorites,
            images: currAppState.images,
            isLoading: true,
            pageData: currAppState.pageData,
            redirect: currAppState.redirect,
            shoppingBasket: currAppState.shoppingBasket,
            userAuthorized: currAppState.userAuthorized,
            username: currAppState.state.username
        };
        history.push(this.state.originatedPage, dataToShare);
    }

    public onChange = (e: any) => {
        // Match the named inputs to the same named props
        const formFields = { ...this.state.formFields };
        formFields[e.target.name] = e.target.value;
        this.setState({
            formFields
        });
    }

    public setAriaValue(value: number) {

        if (value === 25) {
            this.setState({
                activeFormPage: [true, false, false],
                ariaValueNow: value,
            });
        } else if (value === 50) {
            this.setState({
                activeFormPage: [false, true, false],
                ariaValueNow: value,
            });
        } else if (value === 75) {
            this.setState({
                activeFormPage: [false, false, true],
                ariaValueNow: value,
            });
        }
    }

    public addAriaValue(value: number) {

        this.setAriaValue(value + this.state.ariaValueNow);

    }

    public setHasError() {

        if ((this.props.error.status === 'Error' || this.props.error.status === 'Success') && this.state.hasError===false) {
            this.setState({
                hasError: true
            });
        }
    }


    public render() {
        const width = this.state.ariaValueNow + "%";
        this.setHasError();
        const hasError = this.state.hasError;

        return (<div className="Signup mt-5">
            {/*<!-- Navigation Bar -->*/}
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">

                <div className="container pt-3">
                    {/*<!--Search form-->*/}
                    <div className="row nav-box">
                        <div className="col-6 nav-left">
                            <a className="navbar-brand" href="#page-top">
                                <img className="img-fluid rounded-circle" src={Logo} alt=""
                                    style={{ maxWidth: '30px', height: '30px' }} />
                            </a>

                            <a href="/home">
                                <button className="btn home_button" type="button">
                                    <strong id="Category_list"><i className="fas fa-home" /> Home</strong>
                                </button>
                            </a>
                        </div>

                        <div className="col-6 nav-right">
                            <a href="/back">
                                <button className="btn back_button" type="button" onClick={(e) => { this.goBack(e) }}>
                                    <strong id="Category_list"><i className="fas fa-hand-point-left" /> Back</strong>
                                </button>
                            </a>
                        </div>

                    </div>
                </div>
            </nav>

            {/*<!-- Contact Section -->*/}
            <section>
                <div className="container justify-content-center">
                    <div className="row box_ ">
                        <div className="col-12 col-sm-9 col-md-8 mx-auto">
                            
                            <form name="sigupForm" id="signupForm" noValidate={false}
                                onSubmit={(e) => { this.props.updateLocalUserAuthenticationStatus(e, this.state.formFields); }}>
                                <div id="accordion">
                                    <div className="card ">
                                        <div className="card-header " id="headingOne">
                                            <h3 className="mb-0">
                                                <button className="btn btn-link mr-5" type="button" data-toggle="collapse"
                                                    data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={(e) => this.setAriaValue(25)}>
                                                    Account info
                                                </button>
                                                <button className="btn btn-link mr-5" type="button" data-toggle="collapse"
                                                    data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" onClick={(e) => this.setAriaValue(50)}>
                                                    Delivery info
                                                </button>
                                                <button className="btn btn-link" type="button" data-toggle="collapse"
                                                    data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree" onClick={(e) => this.setAriaValue(75)}>
                                                    Complete
                                                </button>
                                            </h3>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width }}
                                                    aria-valuenow={this.state.ariaValueNow} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </div>

                                        {/*<!-- Step 1 Account information-->*/}
                                        <div id="collapseOne" className={this.state.activeFormPage[0] ? 'collapse show' : 'collapse'}
                                            aria-labelledby="headingOne" data-parent="#accordion" >
                                            <div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordion" className="card">
                                                <h4 className="text-center mb-4 mt-3">Account Details:</h4>
                                                {/*<!--<div className="alert alert-danger">
                                                <a className="close font-weight-light" data-dismiss="alert" href="#">×</a>Password is too short.
                                                </div>-->*/}
                                                <div className="row justify-content-center">
                                                    <div className="control-group col-10 col-sm-10 col-md-7">
                                                        <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                                            <div className="input-group text-center">
                                                                <input className="form-control py-2 border-right-0 border" id="signup_username"
                                                                    type="text" placeholder="Username"
                                                                    name="email" required={true} data-validation-required-message="Please enter username."
                                                                    onChange={(e) => { this.onChange(e) }} />
                                                                <div className="input-group-addon userIcon" style={{ background: "white" }}>
                                                                    <div className="input-group-text border-0 border" style={{ background: "white" }}>
                                                                        <i className="fas fa-user" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="help-block text-danger"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="control-group col-10 col-sm-10 col-md-7">
                                                        <div className="form-group floating-label-form-group controls">
                                                            <div className="input-group text-center">
                                                                <input className="form-control py-2 border-right-0 border" id="signup_password" type="password"
                                                                    name="password" placeholder="Password" required={true}
                                                                    data-validation-required-message="Please enter your password."
                                                                    onChange={(e) => { this.onChange(e) }} />
                                                                <div className="input-group-addon passwordIcon" style={{ background: "white" }}>
                                                                    <div className="input-group-text border-0 border" style={{ background: "white" }}>
                                                                        <i className="fas fa-key" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="help-block text-danger"/>
                                                        </div>
                                                        <div className="form-group floating-label-form-group controls">
                                                            <div className="input-group justify-content-center">
                                                                <input className="form-control py-2 border-right-0 border" id="signup_confirm_password" type="password"
                                                                    name="confirm_password" placeholder="Confirm Password"
                                                                    required={true} data-validation-required-message="Please reenter your password."
                                                                    onChange={(e) => { this.onChange(e) }}
                                                                />
                                                                <div className="input-group-addon passwordIcon" style={{ background: "white" }}>
                                                                    <div className="input-group-text border-0 border" style={{ background: "white" }}><i className="fas fa-key"/></div>
                                                                </div>
                                                            </div>
                                                            <p className="help-block text-danger"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="control-group col-10 col-sm-10 col-md-7 text-center">
                                                        <div className="form-group">
                                                            <input className="form-control input-lg text-center" placeholder="Security Answer"
                                                                name="security_answer" type="text" onChange={(e) => { this.onChange(e) }}/>
                                                        </div>
                                                        <div id="success"/>
                                                        <div className="form form-group float-right">
                                                            <button type="button" className="btn btn-primary btn-xl"
                                                                id="Step1NextButton" value="Send" onClick={(e) => this.addAriaValue(25)}>Next</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*<!-- Step 2 Personal Details -->*/}
                                        <div id="collapseTwo" className={this.state.activeFormPage[1] ? 'collapse show' : 'collapse'} aria-labelledby="headingTwo" data-parent="#accordion">
                                            <div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordion" className="card">
                                                <h4 className="text-center mb-4 mt-3">Address Details:</h4>
                                                {/*<!--<div className="alert alert-danger">
                                                <a className="close font-weight-light" data-dismiss="alert" href="#">×</a>Password is too short.
                                                </div>-->*/}
                                                <div className="control-group col-12">

                                                    <div className="row justify-content-center">
                                                        <div className="form-group col-md-6">
                                                            <input type="text" className="form-control" id="inputName"
                                                                placeholder="First Name" name="firstName" onChange={(e) => { this.onChange(e) }} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <input type="text" className="form-control" id="inputSurname"
                                                                placeholder="Surname" name="surname" onChange={(e) => { this.onChange(e) }} />
                                                        </div>
                                                    </div>

                                                    <div className="row justify-content-center">
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" id="inputStreet"
                                                                placeholder="Street (E.g. Hoofdstraat)" name="streetName" onChange={(e) => { this.onChange(e) }} />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <input type="text" className="form-control" id="inputHouse_number"
                                                                placeholder="House #" name="houseNumber" onChange={(e) => { this.onChange(e) }} />
                                                        </div>
                                                    </div>

                                                    <div className="row justify-content-center">
                                                        <div className="form-group col-md-6">
                                                            <input type="text" className="form-control" id="inputCity"
                                                                placeholder="City" name="city" onChange={(e) => { this.onChange(e) }} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <select id="inputCountry" name="country"className="form-control" onChange={(e) => { this.onChange(e) }}>
                                                                <option defaultValue="country">Country</option>
                                                                <option value="The Netherlands">The Netherlands</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="row justify-content-center">
                                                        <div className="form-group col-6">
                                                            <input type="text" className="form-control" id="inputZip"
                                                                placeholder="Zip/Postcode" name="zipCode" onChange={(e) => { this.onChange(e) }} />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <input className="form-control" type="tel" placeholder="+31-(555)-55-5555"
                                                                id="inputMobile" name="mobileNumber" onChange={(e) => { this.onChange(e) }} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group float-right">
                                                        <button type="button" className="btn btn-primary" onClick={(e) => this.addAriaValue(25)}>Next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<!-- Step 3 Confirm and Signup-->*/}
                                        <div id="collapseThree" className={this.state.activeFormPage[2] ? 'collapse show' : 'collapse'} aria-labelledby="headingThree" data-parent="#accordion">
                                            <div id="collapseThree" aria-labelledby="headingThree" data-parent="#accordion" className="card">
                                                <h3 className="text-center mb-4 mt-3">Step 3: Complete Sign up</h3>
                                                {/*<!--<div className="alert alert-danger">
                                  <a className="close font-weight-light" data-dismiss="alert" href="#">×</a>Password is too short.
                              </div>-->*/}
                                                <div className="row justify-content-center">
                                                    <a className="btn wrapword" data-toggle="collapse" id="policy_titles"
                                                        href="#information_handling_policy" role="button" aria-expanded="false"
                                                        aria-controls="information_handling_policy">
                                                        <p>How is my information data is handled? <i className="fas fa-chevron-down"
                                                            style={{ color: "#21ce99" }} /></p>
                                                    </a>
                                                    <p className="collapse wrapword" id="information_handling_policy" style={{ width: "80%" }}>
                                                        All of your data is 128-bit encrypted & stored securely.
                                                        We do not sell your personally identifiable information.
                                                    </p>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <a className="btn wrapword text-center" data-toggle="collapse" id="policy_titles"
                                                        href="#information_handling_policy2" role="button" aria-expanded="false"
                                                        aria-controls="information_handling_policy">
                                                        <p>Will my contact info be advertised? <i className="fas fa-chevron-down" style={{ color: "#21ce99" }}/></p>
                                                    </a>
                                                    <p className="collapse wrapword text-center" id="information_handling_policy2" style={{ width: "80%" }}>
                                                        No. We will only contact you with important updates about your account.
                                                    </p>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="checkbox text-center">
                                                        <label className="wrapword" style={{ width: "100%" }}>
                                                            <input name="terms" type="checkbox" />I have read and agree to the <a href="#">terms of service</a>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div id="success"/>
                                                    <div className="form-group ">
                                                        <button type="submit" className="btn btn-primary btn-xl" id="signupButton" value="signup">Signup</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <Error hasError={hasError} error={this.props.error} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
      );
    }
}


// Create mapToState and mapDispatch for Redux
export function mapStateToProps(state: StoreState & SignupPageState, OwnProps: SignupPageProps & RouteComponentProps<PathProps>) {
    return {
        error: state.error,
        favorites: state.favorites,
        formFields: state.formFields,
        isLoading: state.isLoading,
        originatedPage: state.originatedPage,
        pageData: state.pageData,
        redirect: state.redirect,
        shoppingBasket: state.shoppingBasket,
        userAuthorized: state.userAuthorized,
        username: state.username,
    }
}

export function mapDispatchToProps(dispatch: any) {
    return {
        synchronizePageData: (pageData: ImageContent[]) => dispatch(actions.SynchronizePageData(pageData)),
        updateLocalUserAuthenticationStatus: (e: any, formFields: any) => dispatch(actions.UpdateLocalUserAuthenticationStatus(e, formFields))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));