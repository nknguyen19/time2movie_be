import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddMovieForm from './AddMovieForm';

const Admin = () => {
    const [ currentUser, setCurrentUser ] = useState();
    const naviagte = useNavigate();
    const [ isAddingMovie, setIsAddingMovie ] = useState(false);

    useEffect(async () => {
        const response = await fetch('/api/user/get-current-user');
        if (response.status === 200) {
            const current_user = await response.json();
            setCurrentUser(current_user);
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
                <div className='add-movie-btn'
                    style={{ display: isAddingMovie ? 'none' : 'block' }}
                    onClick={() => setIsAddingMovie(true)}>
                    Add a movie
                </div>
                {isAddingMovie ? <AddMovieForm /> : ''}
                <img src="background.png" alt="image" />
            </div>
        </div>
    )
}

export default Admin;