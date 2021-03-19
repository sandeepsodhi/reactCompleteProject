import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address:  {
            street : '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            customer: {
                name: "Sodhi",
                address: {
                    street: 'test street 1',
                    zipCode: '124',
                    country: 'Canada'
                },
                email: 'sodhi@mailinator.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order) 
            .then(response => {
                this.setState({loading:false});
                this.props.history.push('/');
                // console.log(response);
            })
            .catch(error => {
                this.setState({loading:false});
                // console.log(error);
        });
    }

    render(){
        let form =(<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked = {this.orderHandler}>ORDER</Button>
        </form>);
        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}> 
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;