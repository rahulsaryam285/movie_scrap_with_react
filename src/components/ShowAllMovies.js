import React from 'react'
import noImage from './no_image.png'
export const ShowAllMovies = (props) => {
  return (
    <div>
      {
        props.data.map((item,index) => (
          <div key={index} className="movie" onClick={() => props.rahul(item.id)}>
            <img src={item.poster_path !== null ? "https://www.themoviedb.org/t/p/w220_and_h330_face/" + item.poster_path : noImage} alt="Movie-Poster" />
            <p className="movie-id">{item.id}</p>
            <div className="movie-data">
              <p className="title">{item.original_title}</p>
              <p className="other"><span>Popularity :- </span>{item.popularity}</p>
              <p className="lang other"><span>Language :- </span>{item.original_language}</p>
              <p className="other"><span>Release Data :- </span>{item.release_date}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
