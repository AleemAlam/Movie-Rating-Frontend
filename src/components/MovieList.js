import React from 'react';
let FontAwesome = require('react-fontawesome');

function MovieList(props){
    
    const movieClicked = movie => {
        props.movieClicked(movie)
    }


    const removeClick = (movie) =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movie/${movie.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 996df406ea6d010db63de0a8c1893ab0e6261948'
            },
            }).then( res => props.deleteMovie(movie))
            .catch(error => console.log(error))
    }

    return(
        <div className="col-sm-4">
            {props.movies.map(movie => {
                return (
                    <div key={movie.id}>
                        <h5 className="click" onClick={()=>{movieClicked(movie)}}>{movie.title}</h5>
                        <FontAwesome className="click" name="edit" />
                        <FontAwesome className="click" name="trash" onClick={()=>{removeClick(movie)}}/>
                    </div>
                );
            })}
        </div>
    );
}

export default MovieList;
