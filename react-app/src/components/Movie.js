import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
    const { id } = useParams();
    const [ movie, setMovie ] = useState(null);
    useEffect(() => {
        console.log(id);
        fetch(`/api/movie/get/${id}`)
            .then(res => res.json())
            .then(res => setMovie(res));
    }, []);

    return movie ? (
        <div className="movie">
            <div className="home-title">
                Time2Movie
            </div>
            <div className="movie-wrap">
                <img src={movie.image}/>
                <div className="movie-info">
                    <div className="movie-name">
                        {movie.title.toUpperCase()}
                    </div>
                    <div className="movie-description">
                        {movie.description}
                    </div>
                </div>

            </div>
        </div>
    ) : (
        <div></div>
    )
}

export default Movie;