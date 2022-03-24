import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [ currentUser, setCurrentUser ] = useState();
    const naviagte = useNavigate();

    useEffect(() => {
        const userid = document.getElementsByClassName('userid')[0].value;
        if (userid.length !== 0) {
            fetch(`/api/user/get-user/${userid}`)
            .then(res => res.json())
            .then(user => {
                if (!user.isAdmin) naviagte('/');
                else setCurrentUser(user);
            });
        }
        else {
            naviagte('/signin');
        }
    }, [])

    return (
        <div className='home'>
            <div className='home-intro'>
                <div className="home-title">
                    Time2Movie
                </div>
                <div className="welcome">
                    <img src={currentUser && currentUser.image}/>
                    <div>Welcome {currentUser && currentUser.name} !</div>
                </div>
                <div>
                    Add a movie
                </div>
                <img src="background.png" alt="image" />
            </div>
        </div>
    )
}

export default Admin;