import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = (props) => {
    const navigate = useNavigate();

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
            {props.currentUser ? 
            <div className="welcome">
                <img src={props.currentUser.image}/>
                <div>Welcome {props.currentUser.name} !</div>
                {props.currentUser.isAdmin ? 
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