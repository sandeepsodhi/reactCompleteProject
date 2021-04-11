import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{

    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngrediets();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce( (sum,el) => {
                        return sum + el;
                    } , 0);
        return sum > 0 ;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true});
    }

    purchaseCancelledHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingridients can not be loaded!</p> :<Spinner />
        
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings} />
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
            price = {this.props.price.toFixed(2)}
            purchaseCancelled = {this.purchaseCancelledHandler}
            purchaseContinue = {this.purchaseContinueHandler}
            ingredients = {this.props.ings} /> 
        }
        
        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = { this.purchaseCancelledHandler }  >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),       
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngrediets: () => dispatch(burgerBuilderActions.initIngredients())     
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));