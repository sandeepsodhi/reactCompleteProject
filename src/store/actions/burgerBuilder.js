import * as actionsTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionsTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionsTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionsTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionsTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-proj-cdc0a-default-rtdb.firebaseio.com/ingredients.json') 
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    };
}