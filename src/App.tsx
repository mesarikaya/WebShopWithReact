import axios from 'axios';

import * as React from 'react';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({ forceRefresh: true });

// Import bootstrap css

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '.././src/images/Logo.png';
import '.././src/stylesheets/App.css';

// Get the images section to feed the images
// var images = document.querySelector("#images");

// const API = 'https://hn.algolia.com/api/v1/search?query=';
// const DEFAULT_QUERY = 'redux';

// Set the default Props
export interface Props {
    error: any;
    images: string;
    isLoading: boolean;
    pageData: any;
};

interface State {
    error: any;
    images: string;
    isLoading: boolean;
    pageData: any;
};

/* export interface Contents {
    Type: any;
    Name: any;
    Author: any;
    Group: any;
    Reserved: any;
    Reserved_Until: any;
} */

interface ImageListProps {
    pageData: any;
    rows: any;
};


interface ImageListState {
    pageData: any;
    rows: any;
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

class App extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            error: null,
            images: "",
            isLoading: false,
            pageData: [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: ""}]        
        };
    }

    public componentDidMount() {
        // tslint:disable-next-line:no-console
        console.log("In the axios get call");
        this.setState({
            error: null,
            images: "",
            isLoading: false,
            pageData: [{ Type: "", Name: "", Author: "", Group: "", Reserved: "", Reserved_Until: "" }]
        });

        // Get all the images for the page
        this.getImages(null, "allItems", "all");
    }

    public getImages(e: any, type: string, ageGroup: string) {
        if (e !== null) { e.preventDefault(); }

        // tslint:disable-next-line:no-console
        console.log('The link was clicked.', 'Requesting: ' , type, "and", e);
        // Get all the images for the page

        /* if (type === "smart_toys") {
            e.target.collapse('hide');
        } */
        const params = new URLSearchParams();
        params.append('searchType', type);
        params.append('ageGroup', ageGroup);

        axios.get('/api/images',{
                params
            })
            .then(response => {
                // handle success
                // tslint:disable-next-line:no-console
                console.log("RELATED TYPE Inside the images axios", response);

                if (response.data.result === "No data") {
                    this.setState({ isLoading: false });
                }
                else if (response.status === 503) {
                    this.setState({ isLoading: false });
                }
                else {
                    this.setState({ pageData: response.data.result, isLoading: false });
                }
            })
            .catch(error =>
                // handle error
                // tslint:disable-next-line:no-console
                console.log("Error in get is:", error.response)
            )
            .then(() =>
                // tslint:disable-next-line:no-console
                console.log("state:", this.state)
            );
    };

    public setContent(data: any) {
        // Get all the items and set the image content
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

    public render() {
        const rows = this.setContent(this.state.pageData);

        // tslint:disable-next-line:no-console
        // console.log("Rows are:", rows);

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
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Books", "All") }}><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Books", "0-1") }}><i className="fas fa-child"> 0-1 year</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Books", "1-2") }}><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Books", "2-3") }}><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Books", "3-4") }}><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Books", "4-6") }}><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><strong id="Toys">Toys</strong>
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Toys", "All") }}><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Toys", "0-1") }}><i className="fas fa-child"> 0-1 year</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Toys", "1-2") }}><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Toys", "2-3") }}><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Toys", "3-4") }}><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Toys", "4-6") }}><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><strong id="Puzzles">Puzzles</strong></a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Puzzles", "All") }}><i className="fas fa-child"> All</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Puzzles", "1-2") }}><i className="fas fa-child"> 1-2 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Puzzles", "2-3") }}><i className="fas fa-child"> 2-3 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Puzzles", "3-4") }}><i className="fas fa-child"> 3-4 years</i></a>
                                                        <a className="dropdown-item" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e, "Puzzles", "4-6") }}><i className="fas fa-child"> 4-6 years</i></a>
                                                    </div>
                                                </li>
                                            </div>

                                            <div className="col-6 col-sm-3 category_item">
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link" role="button" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.getImages(e,"Smart Toys", "all") }}><strong id="Smart_Toys">Smart Toys</strong></a>
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
                    <ImageList pageData={this.state.pageData} rows={rows} />
                </div>

            </div>
        );
    }
}


class ImageList extends React.Component<ImageListProps, ImageListState> {
    public state: ImageListState;

    constructor(props: ImageListProps) {
        super(props);

        // tslint:disable-next-line:no-console
        // console.log("Here are the keys 2:", this.props.rows);
    }

    public render() {
        // Set the Image data of the page
        // const rows = this.setContent(this.props.pageData);


        // Send the Image List items to the Image component
        return (
            <div className="row images" >{this.props.rows}</div>
        );
    }
}

class Image extends React.Component<ImageProps, ImageState> {
    constructor(props: ImageProps) {
        super(props);
    }
    /*public componentDidMount() {
        this.setState({
            Author: this.state.Author, Group: this.state.Group,
            Image: this.state.Image, 
            Name: this.state.Name, Reserved: this.state.Reserved,
            Reserved_Until: this.state.Reserved_Until, Type: this.state.Type, key: this.state.key
        });

        // tslint:disable-next-line:no-console
        console.log("Here are the image locs:", './images/' + this.props.Type + '/' + this.state.Group + '/' + this.state.Image);
    }*/
    public openProductPage(e: any, data: any) {
        // Deactivate default behavior
        if (e !== null) { e.preventDefault(); }

        history.push('/productPage/' + data.Name, data );

        // tslint:disable-next-line:no-console
        console.log("history", history.location);

        // Call the product page URI
        /* axios.get('/api/product')
            .then(response => {
                // handle success
                // tslint:disable-next-line:no-console
                console.log("OPENING THE PRODUCT PAGE", response);
            })
            .catch(error =>
                // handle error
                // tslint:disable-next-line:no-console
                console.log("Error in getting the PRODUCT PAGE is:", error.response)
            )
            .then(() =>
                // tslint:disable-next-line:no-console
                console.log("state:", this.state)
            ); */
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

export default App;