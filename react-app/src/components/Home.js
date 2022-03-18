import React, { useState, useEffect } from "react";
const Home = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const userid = document.getElementsByClassName('userid')[0].value;
        if (userid.length !== 0) {
            console.log (userid);
            fetch(`/api/user/get-user/${userid}`)
            .then(res => res.json())
            .then(user => setCurrentUser(user));
        }

    }, [])

    return (
        <div className="home">
            <div className="home-intro">

                <div className="home-title">
                    Time2Movie
                </div>

                {currentUser ? 
                <div className="welcome">
                    <img src={currentUser.image}/>
                    <div>Welcome {currentUser.name} !</div>
                </div>
                :
                <div className="auth">
                    <button> 
                        <a href="/signup">Sign Up</a>
                    </button>
                    <button> 
                        <a href="/login">Sign In</a>
                    </button>
                </div>}    

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