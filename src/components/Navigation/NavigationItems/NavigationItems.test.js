import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

//This function available by default from jest in test file, first argument is just a name, and second is a function
describe('<NavigationItems />',() => {
    
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    //it is used for writing each test case, first parameter just a string, second is function containing testing logic.
    it('should render two <NavigationItemv /> elements if not authenticated',() => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItemv /> elements if authenticated',() => {
        //wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});

