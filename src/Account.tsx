import * as React from 'react';

// Import bootstrap css

import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '.././src/images/Logo.png';
import '.././src/stylesheets/Account.css';

library.add(faUser);
library.add(faKey);


class Account extends React.Component {
    public render() {
        return (<div className="Account">
            {/*<!-- Navigation Bar -->*/}
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">

                <div className="container pt-3">
                    {/*<!--Search form-->*/}
                    <div className="row nav-box">
                        <div className="col-6 nav-left">
                            <a className="navbar-brand" href="#page-top"><img className="img-fluid rounded-circle" src={Logo} alt=""
                                style={{ maxWidth: '30px', height: '30px' }} /></a>

                            <a href="/home">
                                <button className="btn home_button" type="button">
                                    <strong id="Category_list"><i className="fas fa-home"/> Home</strong>
                                </button>
                            </a>
                        </div>

                        <div className="col-6 nav-right">
                            <a href="/back">
                                <button className="btn back_button" type="button">
                                    <strong id="Category_list"><i className="fas fa-hand-point-left"/> Back</strong>
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
                        <div className="col-12 col-sm-12 col-md-5 left mx-auto">
                            <h2 className="text-uppercase text-secondary mt-2 mb-0 text-center">Sign in</h2>
                            <hr className="clearfix pt-2" />
                            <div className="row justify-content-center">
                                <div className="col-12 col-sm-6 col-md-6 login-left text-center">

                                    <p className="text-secondary mt-2 mb-0 text-center"><strong>Local sign-in</strong></p>

                                    <hr className="clearfix pt-2" />
                                    <div className="row justify-content-center">
                                        <form className="needs-validation" noValidate={true} name="loginForm" id="contactForm" method="POST">
                                            <div className="control-group">
                                                <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                                    <div className="input-group text-center">
                                                        <input className="form-control py-2 border-right-0 border" id="username" type="text" placeholder="Username" name="username" required={true}  data-validation-required-message="Please enter username." />
                                                        <div className="input-group-addon" style={{ background: 'white' }}>
                                                            <div className="input-group-text"><FontAwesomeIcon icon="user" /></div>
                                                        </div>
                                                    </div>
                                                    <p className="help-block text-danger"/>
                                                </div>
                                            </div>
                                            <div className="control-group">
                                                <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                                    <div className="input-group text-center">
                                                        <input className="form-control py-2 border-right-0 border" id="password" type="password" name="password" placeholder="Password" required={true} data-validation-required-message="Please enter your password." />
                                                        <div className="input-group-addon" style={{ background: 'white' }}>
                                                            <div className="input-group-text"><FontAwesomeIcon icon="key" /></div>
                                                        </div>
                                                    </div>
                                                    <p className="help-block text-danger"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-check ml-3">
                                                    <input className="form-check-input" type="checkbox" value="" id="remember_me" />
                                                    <label className="form-check-label" htmlFor="remember_me" style={{ paddingLeft: '0px' }}>
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <div id="success"/>
                                            <div className="form form-group">
                                                <button type="submit" className="btn btn-primary btn-xl" id="sendLoginRequestButton" value="Send">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 login-right">
                                    <p className="text-secondary mt-2 mb-0 text-center"><strong>Social sign-in</strong></p>

                                    <hr className="clearfix pt-2" />
                                    <div className="row justify-content-center">
                                        <div className="btn-group-vertical">
                                            <button className="btn btn-sm btn-social btn-facebook">
                                                <i className="fab fa-facebook-f" aria-hidden="true"/>  <a className="sign-in-letter ml-2">    Sign-in</a>
                                            </button>
                                            <button className="btn btn-sm btn-social btn-google">
                                                <i className="fab fa-google" aria-hidden="true"/> <a className="sign-in-letter">Sign-in</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-5 right">
                            <h2 className="text-uppercase text-secondary mt-2 mb-0 text-center" >Not a member?</h2>
                            <hr className="clearfix pt-2" />

                            <div className="row justify-content-center" style={{ marginBottom: '15px' }}>
                                <p> Register and enjoy the personal services!</p>
                            </div>
                            <div className="row justify-content-center" style={{ marginBottom: '5px' }}>
                                <div className="signup_benefits ml-3">
                                    <p id="benefits"><i className="fas fa-check"/> Quick and fast order</p>
                                    <p id="benefits"><i className="fas fa-check"/> List of favorite products</p>
                                    <p id="benefits"><i className="fas fa-check"/> Shopping card saved in memory</p>
                                    <p id="benefits"><i className="fas fa-check"/> Overview of orders</p>
                                </div>
                            </div>
                            <div className="row justify-content-center" >
                                <a className="ml-2" href="/signup">
                                    <button className="btn btn-success" type="button">
                                        <strong id="signup_button">Sign up</strong>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
    }
}

export default Account;
