import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../src/App.css'

const MovieDetail = () => {
    const [movie, setMovie] = useState([]);
    const IMDB_API_KEY = process.env.REACT_APP_IMDB_API_KEY;
    const { movieId } = useParams();

    const fetchEachMovie = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${IMDB_API_KEY}`)
            .then((response) => {
                setMovie(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        if (movieId) {
            fetchEachMovie();
        }
        //eslint-disable-next-line
    }, [movieId])

    // const renderMovieDetail = movie.map((item) => {
    const { poster_path, original_title, overview, tagline, spoken_languages, vote_average,
        vote_count, imdb_id, status, budget, genres, production_countries } = movie;

    return (
        <div className="container mt-5 pt-5">
            {/* {
                    loader ? <Loader /> : */}

            <div className="row">
                <div className="col-md-5 image-container">
                    <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={original_title} className="image-size" />
                </div>

                <div className="col-md-7 text-start ps-5 text-white movie-content">
                    <h2 className="pb-3">Title: {original_title}</h2>
                    <p>Tagline: {tagline}</p>
                    <p>Overview: {overview}</p>
                    <p>Vote Average: {vote_average}</p>
                    <p>Total Votes: {vote_count}</p>
                    <p>Status: {status}</p>
                    <p>IMDB Link: <a href={`https://www.imdb.com/title/${imdb_id}`} style={{ color: 'rgb(115 115 244)' }}>{imdb_id}</a></p>
                    <p>Budget: {budget === 0 ? "Unknown budget costs" : budget}</p>
                    <p>Production Countries:</p>


                    {
                        production_countries && production_countries.map((country) => {
                            return (
                                <li>{country.name}</li>
                            )
                        })
                    }
                    <p className='mt-3'>Genres: </p>
                    {
                        genres && genres.map((genre) => {
                            return (
                                <li>{genre.name}</li>
                            )
                        })
                    }
                    <p className='mt-3'>Languages: </p>
                    {
                        spoken_languages && spoken_languages.map((language) => {
                            return (
                                <li>{language.name}</li>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
