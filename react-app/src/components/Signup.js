import React, { useState } from "react";
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const naviagte = useNavigate();

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
            .then(res => console.log(res));
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
                naviagte('/');
            });
    }

    return (
        <div className="signup">
            <div className="signup-wrap">
                <div className="signup-title">
                    Time2Movie
                </div>

                <div className="auth">
                    <button> 
                        <a href="/login">Sign In</a>
                    </button>
                </div>

                <div className="signup-form">
                    <h3>Sign up for <div>Time2Movie</div></h3>
                    <p>Time2Movie is totally free to use. Sign up using your email address or phone number below to get started.</p>
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
                </div>
                <img src="background.png" alt="image" />
            </div>
        </div>
    );
}

export default Signup;