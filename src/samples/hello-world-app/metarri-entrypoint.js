import createMetarriApp from '../../index';
import React from 'react';

const RootComponent = () => {
    return (<div>Hello World</div>);
};

createMetarriApp(RootComponent, {
    appName: 'Sample Hello World',
    appType: 'react',
    rootSelector: '#app',
});
