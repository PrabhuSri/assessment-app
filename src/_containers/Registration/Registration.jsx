import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';
import { validateEmail } from "../../_helpers";
import { commonConstants } from '../../_constants';

const Registration = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        gender: '',
        country: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.email && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="col-lg-12 register">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Username</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                        {submitted && !user.username &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="form-group col-md-6">
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                        {submitted && !user.password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && (!user.email || !validateEmail(user.email)) ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                    {submitted && user.email && !validateEmail(user.email) &&
                        <div className="invalid-feedback">Email is invalid</div>
                    }
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control'} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control'} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Gender</label>
                    <div className="col-sm-10 mt-10">
                        {
                            commonConstants.GENDER.map(g => {
                                return <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id={`gender_${g.key}`} value={g.value} />
                                    <label className="form-check-label" htmlFor={`gender_${g.key}`}>{g.value}</label>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="ddlCountry">Country</label>
                    <div className="col-sm-10">
                        <select id="ddlCountry" name="country" className="form-control">
                            <option selected>Choose...</option>
                            {
                                commonConstants.COUNTRY.map(c => <option value={c.code}>{c.value}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { Registration };