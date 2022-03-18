import React, { useState } from "react";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
    console.log(JSON.stringify({ 
        'username': username,
        'password': password,
    }))

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
                </div>
                <img src="background.png" alt="image" />
            </div>
        </div>
    );
}

export default Signup;