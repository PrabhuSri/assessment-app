import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { PrivateRoute } from '../../_components';
import { Dashboard } from '../Dashboard';
import { Login } from '../Login';
import { Registration } from '../Registration';

import '../../../public/style.css'

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="container">
            <div className="col-md-8 offset-md-2">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Registration} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export { App };