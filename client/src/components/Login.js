import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {login} from "../slices/loginSlice";

const Login = () => {
    const dispatch = useDispatch();
    const [currentLogin,setLogin] = useState('');
    const handleClickLogin = () => {
        if (currentLogin) {
            dispatch(login(currentLogin));
        } else {
            alert("Wrong type of Login");
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="input-container">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={currentLogin}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>
            <button onClick={handleClickLogin}>Login</button>
        </div>
    );
};

export default Login;