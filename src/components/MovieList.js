import React from 'react';

function MovieList(props){
    
    const movieClicked = movie => {
        props.movieClicked(movie)
    }

    return(
        <div className="col-sm-4">
            {props.movies.map((movie, i) => {
                return (
                    <div key={movie.id}>
                        <h5 className="click" onClick={()=>{movieClicked(movie)}}>{i+1}. {movie.title}</h5>
                    </div>
                );
            })}
            <button className="btn btn-primary" onClick={props.addMovie}>Add a Movie</button>
        </div>
    );
}

export default MovieList;
