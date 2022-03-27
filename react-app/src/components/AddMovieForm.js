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
          });
    }

    return(
        <div className="movie-form">
            <input type="text" placeholder="Title" onChange={(e) => setMovie({...movie, title: e.target.value.toLowerCase()})}/>
            <input type="number" placeholder="Episodes" onChange={(e) => setMovie({...movie, episodes: e.target.value.toLowerCase()})}/>
            <input type="date" placeholder="Release Date" onChange={(e) => setMovie({...movie, release: e.target.value.toLowerCase()})}/>
            <input type="text" placeholder="Country" onChange={(e) => setMovie({...movie, country: e.target.value.toLowerCase()})}/>
            <input type="text" placeholder="Director" onChange={(e) => setMovie({...movie, director: e.target.value.toLowerCase()})}/>
            <input type="text" placeholder="Starring" onChange={(e) => setMovie({...movie, starring: e.target.value.toLowerCase()})}/>
            <input type="file" name="file" onChange={(e) => setImageFile(e.target.files[0])}/>
            <textarea name="description" rows="5" placeholder="description" onChange={(e) => setMovie({...movie, description: e.target.value.toLowerCase()})}/>
            <div onClick={createMovie}>Create</div>
        </div>
    )
}

export default AddMovieForm;