// Import necessary packages
// Import necessary packages
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { ImageContent } from './redux/types/storeState';

/** CREATE Prop and State interfaces to use in the component */
// Set the default Props
type ShoppingBasketItemProps = ImageContent;
type ShoppingBasketItemState = ImageContent;

// Import the final set store and actions from Redux
import * as actions from './redux/actions/PageContentActions';

export interface ImageExtraProps {
    UserId: string;
    modifyShoppingBasket(e: any, props: any, action: boolean): (dispatch: Dispatch<actions.UpdatePageContentAction>) => Promise<void>;
};

export interface ImageExtraState {
    UserId: string;
};

class ShoppingBasketItems extends React.Component<ShoppingBasketItemProps & ImageExtraProps, ShoppingBasketItemState & ImageExtraState> {
    public state: ShoppingBasketItemState & ImageExtraState;   

    constructor(props: ShoppingBasketItemProps & ImageExtraProps) {
        super(props);
        this.state = {
            Author: this.props.Author,
            Description: this.props.Description,
            Group: this.props.Group,
            Image: this.props.Image,
            ImageId: this.props.ImageId,
            Name: this.props.Name,
            Reserved: this.props.Reserved,
            Reserved_Until: this.props.Reserved_Until,
            Type: this.props.Type,
            UserId: this.props.UserId
        };
    }
    public componentDidMount() {
        this.setState({
            Author: this.state.Author,
            Description: this.state.Description,
            Group: this.state.Group,
            Image: this.state.Image,
            ImageId: this.state.ImageId,
            Name: this.state.Name,
            Reserved: this.state.Reserved,
            Reserved_Until: this.state.Reserved_Until,
            Type: this.state.Type,
            UserId: this.props.UserId
        });
    }

    public render() {
        
        // Set default picture
        let picture = '';

        // Get teh appropriate picture dynamically
        if (this.props.Type === "Smart Toys") {
            if (typeof this.props.Type !== 'undefined' && typeof this.props.Image !== 'undefined') {
                picture = './images/' + this.props.Type + '/' + this.props.Image;
            }
        } else if (this.props.Type !== '' && this.props.ImageId !== '') {
            if (typeof this.props.Type !== 'undefined' && typeof this.props.Group !== 'undefined'
                && typeof this.props.Image !== 'undefined') {
                picture = './images/' + this.props.Type + '/' + this.props.Group + '/' + this.props.Image;
            }
        }
        // tslint:disable-next-line:no-console
        // console.log("Here are the final images!!!!!!:", defaultPicture);
        if (picture !== '') {
            return (
                <tbody>
                    <tr>
                        <th scope="row"><img className="img-fluid rounded shoppingBasketImages" src={require(`${picture}`)}
                            alt="Product photo" style={{ height: '50px', width: '50px' }} /></th>
                        <td>{this.props.Type}</td>
                        <td>{this.props.Name}</td>
                        <td>{this.props.Author}</td>
                        <td />
                        <td><button type="button" className="btn btn-outline-danger"
                            onClick={(e) => { this.props.modifyShoppingBasket(e, this.props, false) }}>X</button></td>
                    </tr>
                </tbody>
            );
        }else {
            return (<h4>No item is in the shopping list</h4>);
        }
    }
}

// Set functions to use in Redux Dispatch
export function mapDispatchToProps(dispatch: any) {
    return {
        modifyShoppingBasket: (e: any, props: any, action: boolean) => dispatch(actions.modifyShoppingBasket(e, props, action))
    }
}

export default connect(null, mapDispatchToProps)(ShoppingBasketItems);