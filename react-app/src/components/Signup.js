import React, { useState } from "react";
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const createUser = () => {
        if (username.length === 0 || password === 0) { // TODO: handle input error
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username,
                password: password,
            })
        };
        fetch('/api/user/create', requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.message) {
                    setErrorMessage(res.message);
                }
                else {
                    document.getElementsByClassName('userid')[0].value = res._id;
                    navigate('/');
                }
            });
    }
    
    const loginFacebook = (info) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: info.email,
                password: info.id,
                name: info.name,
                avatar: info.picture.data.url,
                is_facebook_login: true,
            })
        };
        fetch('/api/user/login-facebook', requestOptions)
            .then(res => res.json())
            .then(res => {
                document.getElementsByClassName('userid')[0].value = res._id;
                navigate('/');
            });
    }

    return (
        <div className="signup">
            <div className="signup-wrap">
                <div className="signup-form">
                    <h3>Sign up</h3>
                    <p>Time2Movie is totally free to use. Sign up using your email address or phone number below to get started.</p>
                    <span>{errorMessage}</span>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <div className="signup-btn" onClick={createUser}>
                        Create account
                    </div>
                    <div className="or"><hr/> Or <hr/></div>
                    <FacebookLogin 
                        className="facebook-signup"
                        appId="466280858581721"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={loginFacebook} />
                    <p>Already have an account?<a href="/signin">Sign in</a></p>
                </div>
                <img src="signup-background.jpg" alt="image" />
            </div>
        </div>
    );
}

export default Signup;