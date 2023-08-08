import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/loginSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [currentLogin, setLogin] = useState('');

    const handleClickLogin = () => {
        if (currentLogin) {
            dispatch(login(currentLogin));
        } else {
            alert('Wrong type of Login');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={currentLogin}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary btn-block" onClick={handleClickLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
