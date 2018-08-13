import axios from 'axios';
import * as React from 'react';

// Import bootstrap css

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '.././src/images/Logo.png';
import '.././src/stylesheets/App.css';


// const API = 'https://hn.algolia.com/api/v1/search?query=';
// const DEFAULT_QUERY = 'redux';

class App extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            error: null,
            isLoading: false,
            page_data: []
        };
    }

    public componentDidMount() {
        // tslint:disable-next-line:no-console
        console.log("In the axios get call");
        this.setState({ isLoading: true });
        // axios.get(API+DEFAULT_QUERY)
        //    .then(response => {
        //        // handle success
        //        // tslint:disable-next-line:no-console
        //        console.log("Inside the  external axios", response);
        //        this.setState({ page_data: response.data.hits, isLoading: false });
        //    })
        //    .catch(error =>
        //        // handle error
        //        // this.setState({ error: error, isLoading: false })
        //        // tslint:disable-next-line:no-console
        //        console.log("Error in get is:", error.response)
        //    )
        //    .then(() =>
        //        // tslint:disable-next-line:no-console
        //        console.log("state:", this.state)
        // );

        // Get all the images for the page
        axios.get('/api/images')
            .then(response => {
                // handle success
                // tslint:disable-next-line:no-console
                console.log("Inside the images axios", response);
                // this.setState({ page_data: response.data.hits, isLoading: false });
            })
            .catch(error =>
                // handle error
                // this.setState({ error: error, isLoading: false })
                // tslint:disable-next-line:no-console
                console.log("Error in get is:", error.response)
            )
            .then(() =>
                // tslint:disable-next-line:no-console
                console.log("state:", this.state)
            );

    }


    public render() {
        return (
            <div className="App">
                {/* <!- Navigation Bar --> */}
                <nav className="navbar navbar-light bg-light fixed-top">

                    <div className="container pt-3">
                        {/* <!- Search Form --> */}
                        <div className="row box">
                            <div className="col-12 col-sm-4 col-md-4 pt-2 nav_top">
                                <a className="navbar-brand" href="#page-top"><img className="img-fluid rounded-circle img_logo" src={Logo} alt="" style={{ maxWidth: '30px', height: '30px' }} /></a>
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
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><strong id="Books">Books</strong></a>
                                                    <div className="dropdown-menu mx-auto" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 0-1 year</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><strong id="Toys">Toys</strong></a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 0-1 year</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><strong id="Puzzles">Puzzles</strong></a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" href="/"><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/"><strong id="Smart_Toys">Smart Toys</strong></a>
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
                                                <button className="btn search_button btn-outline-secondary border-left-0 border" type="submit"><i className="fas fa-search"/></button>
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </div>

                            <div className="col-12 col-sm-8 col-md-4 fawesome" >
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

                <div className="container">
                    <div className="row images">
                        <div className="col-12 col-sm-6 col-md-3 text-center p-2 image_add_ons">
                            <a className="" href="/product_page">
                                <img className="img-fluid rounded" src={require('./images/Books/0-1/At_the_zoo.png')} alt="test" />
                            </a>
                            <a className="add_to_cart_img" href="/add_to_basket"/>
                            <a className="add_to_favorites_img" href="/add_to_favorites"/>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center p-2" >
                            <a className="" href="/product_page">
                                <img className="img-fluid rounded" src={require('./images/Books/0-1/At_the_zoo.png')} alt="testing" />
                            </a>
                            <a className="add_to_cart_img" href="/add_to_basket"/>
                            <a className="add_to_favorites_img" href="/add_to_favorites"/>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center p-2">
                            <a className="" href="/product_page">
                                <img className="img-fluid rounded" src={require('./images/Books/0-1/At_the_zoo.png')} alt="test" />
                            </a>
                            <a className="add_to_cart_img" href="/add_to_basket"/>
                            <a className="add_to_favorites_img" href="/add_to_favorites"/>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center p-2">
                            <a className="add_to_cart_img" href="/add_to_basket">
                                <img className="img-fluid rounded" src={require('./images/Books/0-1/At_the_zoo.png')} alt="test" />
                            </a>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center p-2">
                            <a className="add_to_cart_img" href="/add_to_basket">
                                <img className="img-fluid rounded" src={require('./images/Books/0-1/At_the_zoo.png')} alt="test" />
                            </a>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 text-center p-2">
                            <a className="add_to_cart_img" href="/add_to_basket">
                                <img className="img-fluid rounded" src={require('./images/Books/0-1/At_the_zoo.png')} alt="test" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;