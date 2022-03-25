import { image } from "image-downloader";
import React, { useState } from "react";
import axios from 'axios';

const AddMovieForm = () => {
    const [ movie, setMovie ] = useState({})
    const [ imageFile, setImageFile] = useState();

    const createMovie = () => {
        const data = new FormData();
        data.append('file', imageFile);
        data.append('movie', JSON.stringify(movie));
        axios({
            method: "post",
            url: '/api/movie/create',
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(res => console.log(res));
    }

    return(
        <div className="movie-form">
            <input type="text" placeholder="Title" onChange={(e) => setMovie({...movie, title: e.target.value})}/>
            <input type="number" placeholder="Episodes" onChange={(e) => setMovie({...movie, episodes: e.target.value})}/>
            <input type="date" placeholder="Release Date" onChange={(e) => setMovie({...movie, release: e.target.value})}/>
            <input type="text" placeholder="Country" onChange={(e) => setMovie({...movie, country: e.target.value})}/>
            <input type="text" placeholder="Director" onChange={(e) => setMovie({...movie, director: e.target.value})}/>
            <input type="text" placeholder="Starring" onChange={(e) => setMovie({...movie, starringx: e.target.value})}/>
            <input type="file" name="file" onChange={(e) => setImageFile(e.target.files[0])}/>
            <div onClick={createMovie}>Create</div>
        </div>
    )
}

export default AddMovieForm;