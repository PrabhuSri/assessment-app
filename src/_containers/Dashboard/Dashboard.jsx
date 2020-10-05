import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';

const Dashboard = () => {
    const user = useSelector(state => state.authentication.user);

    return (
        <div className="col-lg-12 dashboard">
            <h1>{user.username}'s Dashboard</h1>
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { Dashboard };