import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MovieWrapper from './MovieWrapper';

const MovieListing = () => {
    const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
    const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY;

    const [image, setImage] = useState('');
    const [movies, setMovies] = useState([]);

    const fetchNasa = async () => {
        const response = await axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
            setImage(response.data)
            .catch((error) => {
                console.error(error);
            });
        console.log("response is: ", response.data)
    }

    const fetchMovies = async () => {
        const response = await axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${IMDB_API_KEY}&language=en-US&query=NASA&include_adult=false&1`)
            setMovies(response.data.results)
            .catch((error) => {
                console.error(error);
            })
        console.log("response is: ", response.data)
    }

    useEffect(() => {
        fetchNasa();
        fetchMovies();

        //eslint-disable-next-line
    }, [])

    return (
        <>
            <img src={image.hdurl} alt="" />
            <div className='full-block'>
                <MovieWrapper movies={movies} />
            </div>
        </>
    )
}

export default MovieListing