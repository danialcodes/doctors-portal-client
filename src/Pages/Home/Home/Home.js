import React from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import AppionmentBanner from '../AppionmentBanner/AppionmentBanner';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <AppionmentBanner/>
            <Services></Services>
        </div>
    );
};

export default Home;