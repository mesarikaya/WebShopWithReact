import * as React from 'react';

// Import bootstrap css

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '.././src/images/Logo.png';
import '.././src/stylesheets/ProductPage.css';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({ forceRefresh: true });

export interface ProductPageProps {
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

interface ProductPageState {
    Author: string;
    Description:string;
    Group: string;
    Image: string;
    key: string;
    Name: string;
    Reserved: string;
    Reserved_Until: string;
    Type: string;
};



class ProductPage extends React.Component<ProductPageProps, ProductPageState> {
    public state: ProductPageState;

    constructor(props: ProductPageProps) {
        super(props);
        this.state = {
            Author: history.location.state.Author,
            Description: history.location.state.Description,
            Group: history.location.state.Group,
            Image: history.location.state.Image,
            Name: history.location.state.Name,
            Reserved: history.location.state.Reserved,
            Reserved_Until: history.location.state.Reserved_Until,
            Type: history.location.state.Type,
            key: history.location.state.key,
        };
    }

    public render() {
        // Set default picture
        let picture = './images/Books/0-1/At_the_zoo.png';

        // Get teh appropriate picture dynamically
        if (this.state.Type === "Smart Toys") {
            if (typeof this.state.Type !== 'undefined' && typeof this.state.Image !== 'undefined') {
                picture = './images/' + this.state.Type + '/' + this.state.Image;
            }
        } else {
            if (typeof this.state.Type !== 'undefined' && typeof this.state.Group !== 'undefined' && typeof this.state.Image !== 'undefined') {
                picture = './images/' + this.state.Type + '/' + this.state.Group + '/' + this.state.Image;
            }
        }

        return (
        <div className="ProductPage">
           {/*<!-- Navigation Bar -->*/}
                <nav className="navbar navbar-light bg-light fixed-top">

                    <div className="container pt-3">
                        {/* <!- Search Form --> */}
                        <div className="row box">
                            <div className="col-12 col-sm-4 col-md-4 pt-2 nav_top">
                                <a className="navbar-brand" ><img className="img-fluid rounded-circle img_logo" src={Logo} alt="" style={{ maxWidth: '30px', height: '30px' }} /></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <strong id="Category_list">Categories</strong>
                                    <i className="fa fa-bars" />
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
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 0-1 year</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><strong id="Toys">Toys</strong>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 0-1 year</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><strong id="Puzzles">Puzzles</strong></a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" ><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link" role="button" data-toggle="collapse" data-target=".navbar-collapse.show" ><strong id="Smart_Toys">Smart Toys</strong></a>
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
                                                <button className="btn search_button btn-outline-secondary border-left-0 border" type="submit"><i className="fas fa-search" /></button>
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
                                <a href="/back">
                                    <button className="btn btn-sm back_button">
                                        <i className="fas fa-hand-point-left"><strong id="icons"> Back</strong></i>
                                    </button>
                                </a>
                            </div>

                        </div>
                    </div>
                </nav>

            <div className="container ">
                <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 text-center p-2">
                        <a className="" href="/product_page">
                            <img className="img-fluid rounded" src={require(`${picture}`)} alt="testing" />
                        </a>
                    </div>
                        <div className="col-12 col-sm-8 col-md-8">
                            <h4 className="text-center mb-3" id="product_name">{this.state.Name}</h4>
                        <div className="product_details">
                                <p> <strong>Author:</strong> <span id="Author">{this.state.Author}</span></p>
                                <p> <strong>Age Group:</strong> <span id="Age_Group">{this.state.Group}</span></p>
                                <p> <strong>Description:</strong> <span id="Description">{this.state.Description}</span></p>
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

export default ProductPage;
