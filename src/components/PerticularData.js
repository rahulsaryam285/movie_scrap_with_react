import React, { useState } from 'react'
import noImage from './no_image.png';


export const PerticularData = (props) => {
    // const [generData, setGenerData] = useState([]);
    const [movie, setMovie] = useState(props.setOneMovie.oneData)
    let timeFormat = `${(movie["runtime"] / 60) ^ 0}:` + (movie["runtime"] % 60);
    let gener = movie["genres"];    
    let data1 = gener.map((i) => {
        return i["name"];
    });

    console.log(data1);
    return (
        <>
            <div className="one-movie-data">
                <img
                    src={movie["poster_path"] !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face${movie["poster_path"]}` : noImage}
                    alt="" />
                <div className="more-data">
                    <h1>{movie["original_title"]}</h1>
                    <p className="more-p"><span>Release Date :- </span>{movie["release_date"]}</p>
                    <p className="more-p"><span>Rating :- </span>{movie["vote_average"]}</p>
                    <p className="more-p"><span>Run-Time :- </span>{timeFormat} hr</p>
                    <div className="again-data">
                        <p className="more-p again-more-p"><span>Movie Language :- </span>{movie["original_language"]}</p>
                        <p className="more-p"><span>Gener :- </span>{data1}</p>
                    </div>
                </div>
            </div>
            <div className="overview">
                <p className="overview-P"><span>Movie Overview :-  </span>
                    {movie["overview"]}
                </p>
            </div>
        </>
    )
}
