import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Slider from 'react-slick';
import MovieSlider from "./MovieSlider";

const Home = () => {
    const naviagate = useNavigate();
    const [settings, setSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    const [movieList, setMovieList] = useState([]);

    useEffect(async () => {
        const response = await fetch('/api/movie/get');
        const movie_list = await response.json();
        setMovieList(movie_list);
        console.log(movie_list);
    }, [])

    return (
        <div className="home">
            <TopBar />
            <div className="intro-slider">
                <Slider {...settings}>
                    {movieList.map(movie => (
                        <div className="movie-intro">
                            <div className="movie-title">
                                <h1>{movie.title.toUpperCase()}</h1>
                                <p>{movie.description}</p>
                            </div>
                            
                            <div className="movie-image">
                                <img src={movie.image}/>
                            </div>
                            
                        </div>
                    ))}
                </Slider>
            </div>

            <MovieSlider type="Trending now" />

            <MovieSlider type="Recommended for you" />


        </div>
    )
}

export default Home;