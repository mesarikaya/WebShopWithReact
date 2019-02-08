// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";

// Import necessary Redux store state interface, actions, bootstrap.css, stylesheets, basic image and font awesome
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import * as actions from './redux/actions/PageContentActions';
import './stylesheets/App.css';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
export interface Props {
    onGetContent(e: any, type: string, ageGroup: string): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

// Create App component 
class HamburgerMenu extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {

        return (
            <div className="HamburgerMenu">
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
                                    <a className="nav-link" role="button" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={(e) => { this.props.onGetContent(e, "Smart Toys", "all") }}><strong id="Smart_Toys">Smart Toys</strong></a>
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>
                {/* <!-- End of the hamburger menu --> */}
            </div>
        );
    }
}


// Set functions to use in Redux Dispatch
export function mapDispatchToProps(dispatch: any) {
    return {
        onGetContent: (e: any, type: string, ageGroup: string) => dispatch(actions.UpdatePageContent(e, type, ageGroup))
    }
}

export default connect(mapDispatchToProps)(HamburgerMenu);