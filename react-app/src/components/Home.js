import React from "react";

const Home = () => {
    return (
        <div className="home">
            <div className="home-intro">

                <div className="home-title">
                    Time2Movie
                </div>

                <div className="auth">
                    <button> 
                        <a href="/signup">Sign Up</a>
                    </button>
                    <button> 
                        <a href="/login">Sign In</a>
                    </button>
                </div>

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