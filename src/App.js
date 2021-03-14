import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {

  state = {
    show : true
  }

  //just testing unmount eject code
  // componentDidMount(){
  //   setTimeout( () => {
  //     this.setState({show: false});
  //   }, 5000);
  // }

  render(){
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <Checkout />
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
        </Layout>
      </div>
    );
  } 
}

export default App;
