import React from 'react';

import classes from './Order.css';

const order = (props) => (
    <div className={classes.Order}> 
        <p>Ingridients: salad(1)</p>
        <p>Proce:<strong>USD 5.45</strong></p>
        <p>Ingridients: salad(1)</p>
    </div>
);

export default order;