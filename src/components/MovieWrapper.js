import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/App.css';

const MovieWrapper = ({ movies }) => {
    const renderMovies = movies.map((movie) => {
        const { id, poster_path, original_title, overview, popularity, release_date } = movie;
        return (
            <div className='movies'>
                <Link to={`movie/${id}`}>
                    <div>
                        <img src={!poster_path ? "./gallery.png" : `https://image.tmdb.org/t/p/original/${poster_path}`} className="poster-path" alt={original_title} />
                    </div>
                    <h1 className={`original-title yellow-color text-center ${!poster_path && "extra-margin"}`}>{original_title}</h1>

                    <h4 className='fw-bold'>Description:</h4>
                    <p>{overview}</p>

                    <p>Popularity: <span className='yellow-color'>{popularity}</span></p>
                    <p>Release Date: <span className='yellow-color'>{release_date}</span></p>
                </Link>
            </div>
        );
    })

    return <>{renderMovies}</>
}

export default MovieWrapper