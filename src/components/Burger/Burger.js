import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    //converting object of key value pair into an array of buregerIngredients
    let transformedIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_, i) => {
                    return <BurgerIngredient key = {igKey + i} type = {igKey} />
                });
            })
            .reduce((arr, el) => {
                return arr.concat(el)  //this will just add the current element which we are looping into array.
            }, []);
    
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    console.log(transformedIngredients);

    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger; 