import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Slider from 'react-slick';
import MovieSlider from "./MovieSlider";
import MessageBox from "./MessageBox";

const Home = () => {
    const naviagate = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    const [settings, setSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    const [movieList, setMovieList] = useState([]);

    useEffect(async () => {
        const movie_list_response = await fetch('/api/movie/get');
        const movie_list = await movie_list_response.json();
        setMovieList(movie_list);

        const user_response = await fetch('/api/user/get-current-user');
        if (user_response.status <= 200) {
            const user = await user_response.json();
            setCurrentUser(user);
        }
    }, [])

    return (
        <div className="home">
            <TopBar currentUser={currentUser}/>
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

            {currentUser ? <MessageBox /> : ''}
        </div>
    )
}

export default Home;