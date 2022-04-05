import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../style/Movie.css'
import TopBar from "./TopBar";
import StarRating from "react-svg-star-rating";

const Movie = () => {
    const { id } = useParams();
    const [ movie, setMovie ] = useState(null);
    const [ rating, setRating ] = useState(0);
    useEffect(() => {
        console.log(id);
        fetch(`/api/movie/get/${id}`)
            .then(res => res.json())
            .then(res => setMovie(res));
    }, []);

    const updateMovieRating = (star) => {
        setRating(star + 1);
    }

    return movie ? (
        <div className="movie">
            <TopBar />
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
                            initialRating={movie.rating}
                        />
                    </div>

                    <div className="user-rating">
                        <h3>Your Rating</h3>
                        <StarRating
                            unit="float"
                            handleOnClick={updateMovieRating}
                            initialRating={movie.rating}
                        />
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