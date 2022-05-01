import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MovieWrapper from './MovieWrapper';
import Loader from './Loader';

const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY;

const MovieListing = () => {

    const [image, setImage] = useState('');
    const [movies, setMovies] = useState([]);
    const [loader, setLoader] = useState(false);

    const week_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const current_date = new Date();
    const day = current_date.getDate();
    const week = week_days[current_date.getDay()];
    const month = months[current_date.getMonth()];
    const year = current_date.getFullYear();

    const fetchNasa = () => {
        setLoader(true)
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
            .then((response) => {
                setImage(response.data)
                setLoader(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const fetchMovies = () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${IMDB_API_KEY}&language=en-US&query=NASA&include_adult=false&1`)
            .then((response) => {
                setMovies(response.data.results)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchNasa();
        
        setTimeout(() => {
            fetchMovies();
        }, 1000);

        //eslint-disable-next-line
    }, [])

    return (
        <>
            <h4 className='yellow-color text-center mt-2 fw-bold'>NASA: <span className='blue-shade'>Picture of the Day</span></h4>
            <h4 className='blue-shade text-center fw-bold'>{`${week}, ${month}, ${day}, ${year}`}</h4>
            <img src={image.hdurl} className="img-fluid" alt="Nasa background image" />

            {
                loader ? <Loader /> :  
                <div className='wrapper'>
                    <MovieWrapper movies={movies} />
                </div>
            }
           
        </>
    )
}

export default MovieListing