import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();
    useEffect(async () => {
        const response = await fetch('/api/user/get-current-user');
        if (response.status === 200) {
            const current_user = await response.json();
            setCurrentUser(current_user);
        }
    }, [])

    return (
        <div className="top-bar">
            <div className="logo"
                onClick={() => {navigate('/')}}>
                Time2Movie
            </div>
            {/* <div className="tab">
                <div>
                    Home
                </div>
                <div>
                    Movies
                </div>
                <div>
                    Actors
                </div>
            </div> */}
            {currentUser ? 
            <div className="welcome">
                <img src={currentUser.image}/>
                <div>Welcome {currentUser.name} !</div>
                {currentUser.isAdmin ? 
                    <span onClick={() => navigate('/admin')}>Admin</span> 
                : ''}
            </div>
            :
            <div className="auth">
                <button onClick={() => {navigate('/signup')}}>Sign up</button>
                <button onClick={() => {navigate('/signin')}}>Sign in</button>
            </div>
}
        </div>
    )
}

export default TopBar;