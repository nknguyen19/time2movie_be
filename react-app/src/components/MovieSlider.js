import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import StarRating from 'react-svg-star-rating';

const MovieSlider = (props) => {
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    });

    useEffect(async () => {
        const response = await fetch('/api/movie/get'); // filter here
        const movie_list = await response.json();
        setMovieList(movie_list);
        console.log(movie_list);
    }, [])

    return(
        <div className="movie-slider">
            <h2> {props.type} </h2>
            <Slider {...settings}>
                {movieList.map(movie => (
                    <div className="movie-item">
                        <div className="movie-info"
                            onClick={(e) => navigate(`/movie/${movie._id}`)}>
                            <div className="movie-image">
                                <img src={movie.image}/>
                            </div>

                            <div className="rating">
                                <p>{(new Date(Date.parse(movie.release))).getFullYear()}</p>
                                <StarRating
                                    isReadOnly
                                    initialRating={movie.rating}
                                    />
                            </div>
                            <h5>{movie.title.toUpperCase()}</h5>
                            <p>{movie.description.substring(0, 250) + '...'}</p>
                            <div className="info">

                            </div>
                        </div>
                    </div>
                    ))}
            </Slider>
        </div>
    )
}

export default MovieSlider