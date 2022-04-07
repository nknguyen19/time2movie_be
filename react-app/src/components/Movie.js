import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../style/Movie.css'
import TopBar from "./TopBar";
import StarRating from "react-svg-star-rating";

const Movie = () => {
    const { id } = useParams();
    const [ movie, setMovie ] = useState(null);
    const [ rating, setRating ] = useState(0);
    const [ currentUser, setCurrentUser] = useState();

    const fetchMovie = async () => {
        const movie_response = await fetch(`/api/movie/get/${id}`);
        if (movie_response.status <= 200) {
            const fetch_movie = await movie_response.json();
            setMovie(fetch_movie);
            setRating(fetch_movie.ratings);
            console.log(fetch_movie);
        }
    }

    const fetchUser = async () => {
        const user_response = await fetch('/api/user/get-current-user');
        if (user_response.status <= 200) {
            const user = await user_response.json();
            setCurrentUser(user);
            console.log(user);
        }
    }
    useEffect(async () => {
        console.log(id);
        fetchMovie();
        fetchUser();
    }, []);

    useEffect(async () => {
        if (currentUser) {
            const review_response = await fetch(`/api/review/${currentUser._id}/${id}`);
            if (review_response.status <= 200) {
                const result = await review_response.json();
                setRating(result.ratings);
            }
        }
    }, [currentUser]);

    const updateMovieRating = (star) => {
        setRating(star);
        if (currentUser && movie) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userid: currentUser._id,
                    movieid: movie._id,
                    ratings: star
                })
            };
            fetch('/api/review/create', requestOptions)
                .then(res => res.json())
                .then(res => {
                    if (res.message) {
                    } 
                    else {
                        fetchMovie();
                    }
                });
        }
    }

    return movie ? (
        <div className="movie">
            <TopBar currentUser={currentUser}/>
            <div className="heading">
                <img src={movie.image}/>
                <div className="info">
                    <h1>{movie.title.toUpperCase()}</h1>
                    <h3>{(new Date(Date.parse(movie.release))).getFullYear()}</h3>
                    <h3>Director: {movie.director}</h3>
                    <h3>Starring: {movie.starring}</h3>
                    <div className="avg-rating">
                        <h3>Community Rating</h3>
                        <StarRating
                            isReadOnly
                            unit="float"
                            initialRating={movie.rating}
                        />
                    </div>

                    <div className="user-rating">
                        <h3>Your Rating</h3>
                        <StarRating
                            unit="float"
                            handleOnClick={updateMovieRating}
                            initialRating={rating}
                        />
                        {console.log(window.innerHeight * 0.03)}
                    </div>
                </div>

            </div>
            <p>{movie.description}</p>
        </div>
    ) : (
        <div></div>
    )
}

export default Movie;