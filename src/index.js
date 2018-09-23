import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './assets/css/styles.css';
import 'semantic-ui-css/semantic.min.css';
import Splash from './components/Splash/Splash';
import Home from './components/Home/Home';
import reducer from './reducers/root_reducer';

const store = createStore(reducer, applyMiddleware(thunk))

const routes = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Splash} />>
                <Route path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(routes, document.getElementById('root'));
