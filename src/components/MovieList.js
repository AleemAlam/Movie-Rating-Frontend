import React from 'react';

function MovieList(props){
    return(
        <div className="col-sm-4">
            {props.movies.map(movie => {
                return (
                    <h5 onClick={()=> props.onClick(movie)} key={movie.id}>{movie.title}</h5>
                );
            })}
        </div>
    );
}

export default MovieList;
