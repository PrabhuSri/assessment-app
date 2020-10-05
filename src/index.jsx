import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '../src/_helpers';
import { App } from '../src/_containers/App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);