import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import { ShowAllMovies } from "./components/ShowAllMovies";
import { PerticularData } from "./components/PerticularData";
// import icon from "./icons8-search.svg";
import debounce from 'lodash.debounce'

function App() {
  const [oneMovie, setOneMovie] = useState({
    oneData: "",
    loading: false,
  });
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [display, setDisplay] = useState(true)
  const [query, setQuery] = useState('')

  // useEffect(() => {
  //   // fetchData(page);
  //   movieHandler(page)
  // }, []);

  // function fetchData(page) {

  // }

  function movieHandler(e) {
    let mainQuery = e.target.value;
    setQuery(mainQuery);
    // console.log(query);
    // console.log(page);
    setDisplay(false)
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5d98a7a1405b8032e28c31e19e4d10a9&language=en-US&query=${mainQuery}&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(page);
          if (page > 1) {
            let resultArray = [...data, ...result.results];
            setData(resultArray);
          } else {
            setData(result.results);
          }
          setLoader(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function movieScrolling (page){
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5d98a7a1405b8032e28c31e19e4d10a9&language=en-US&query=${query}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(page);
          if (page > 1) {
            let resultArray = [...data, ...result.results];
            setData(resultArray);
          } else {
            setData(result.results);
          }
          setLoader(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const debounceHandler = useCallback(
    debounce(movieHandler,2000),[]
  )

  function loadMoreData(e) {
    // console.log(page);
    if (page >= 1 && page < 19) {
      let bottom =
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;
      if (bottom < 2 && loader == false) {
        let pageLoad = page + 1;
        // movieHandler(pageLoad);
        movieScrolling(pageLoad)
        setPage(pageLoad);
        setLoader(true);
      }
    }
  }

  const rahul = (itemData) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${itemData}?api_key=5d98a7a1405b8032e28c31e19e4d10a9`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setOneMovie({
            oneData: result,
            loading: false,
          });
        },
        (error) => {
          setError(error);
          setOneMovie({
            loading: true,
          });
        }
      );

    setOneMovie({
      oneData: "",
    });
  };

  return (
    <div className="App">
      <header>
        <p>Top 375 Movies Data</p>
        <div className="search-div">
          <input type="text" placeholder="Search all movie" onChange={debounceHandler} />
          {/* <img src={icon} alt="search-img"/> */}
        </div>
      </header>
      <section style={{display : display ? "block" : "none" }}>
        <div id="message">
          <p>Wel-Come</p>
          <p>Please Type on Search Field</p>
        </div>
      </section>
      <section id="show-all-data">
        <div className="movies-data">
          <div id="all-movie" onScroll={loadMoreData}>
            {/* All movies Data */}
            <ShowAllMovies data={data} rahul={rahul} />
          </div>

          <div id="one-data">
            {/* Perticular movie data  */}
            {oneMovie.oneData === "" ? (
              ""
            ) : (
              <PerticularData setOneMovie={oneMovie} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
