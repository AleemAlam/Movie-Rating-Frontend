import React, { Component } from 'react';

class MovieDetails extends Component{
    render(){
        return(
            <div>
                {this.props.movie ? (
                    <div>
                        <h2>{this.props.movie.title}</h2>
                        <p>{this.props.movie.description}</p>
                    </div>
                    
                ):null }
            </div>
        );
    }
}

export default MovieDetails;
