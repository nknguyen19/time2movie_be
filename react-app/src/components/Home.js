import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";

const Home = () => {
    const naviagate = useNavigate();

    return (
        <div className="home">
            <TopBar />
            <div className="home-intro">

            

                <div className="home-message">
                    <div className="message1">
                        Unlimited movies, TV shows and more.
                    </div>
                    <div className="message2">
                        Someone please help me write these lines =((((
                    </div>
                    <div className="message3">
                        omae wa mou shindeiru
                    </div>
                </div>
                <img src="background.png" alt="image" />
            </div>
            
        </div>
    )
}

export default Home;