import React from "react";
import "./MoviesCard.css";

function MoviesCard({
    poster_path,
    original_title,
    vote_average,
    release_date
}) {
    return (
        <div className="movies-card">
            <img src={`	https://image.tmdb.org/t/p/w300/${poster_path}`} alt="" />
            <div>
                <p className="title">{original_title ? original_title.slice(0,30) : '-------'}</p>
                <div className="movies-inform">
                    <p>{release_date ? release_date : '------'}</p>
                    <div className="reyting">{vote_average ? vote_average : '--'}</div>
                </div>
            </div>
        </div>
    );
}

export default MoviesCard;
