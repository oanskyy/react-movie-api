import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Send a GET request when the button is clicked
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
      console.log("Data:", data);

      if (!response.ok) {
        throw new Error("somethings off");
      }

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      console.log("data.results", data.results);
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content =  <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error.message}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />} */}
        {/* {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>} */}
        {/* {!isLoading && error && <p>{error.message}</p>} */}
        {/* {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
