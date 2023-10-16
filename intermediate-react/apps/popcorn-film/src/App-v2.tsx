// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { StarRating } from "./components/StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import { useKey } from "./useKey";

const KEY = import.meta.env.VITE_API_KEY;

const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  // const [watched, setWatched] = useState(() => {
  //   const storedValue = JSON.parse(localStorage.getItem("watched")) || [];
  //   return storedValue;
  // });

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorage([], "watched");
  // interstellar

  function handleSelectMovie(id) {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched(prev => [movie, ...prev]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(movie) {
    setWatched(prev => prev.filter(watched => watched.imdbID !== movie.imdbID));
  }

  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, [watched]);

  //  /==

  return (
    <>
      <NavBar movies={movies}>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onAddWatched={handleAddWatched}
              onCloseMovie={handleSelectMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);
  const inputEl = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  // useEffect(() => {
  //   // inputEl.current.focus();
  //   function callback(e) {
  //     if (document.activeElement === inputEl.current) return;
  //     if (e.code === "Enter") {
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   }
  //   document.addEventListener("keydown", callback);
  //   return () => document.removeEventListener("keydown", callback);
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(open => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list">
      {movies?.map(movie => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`Poster of ${movie.title} movie`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button onClick={() => onDeleteWatched(movie)} className="btn-delete">
        X
      </button>
    </li>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Main({ movies, children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  console.log(message);
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function MovieDetails({ selectedId, onAddWatched, onCloseMovie, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  // const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const isWatched = watched.filter(watched => watched.imdbID === selectedId)[0];

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // IT DOES NOT WORK
  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);
  // work
  const [isTop, setIsTop] = useState(imdbRating > 8);
  console.log(isTop);

  useEffect(() => {
    if (userRating) {
      // countRef.current = countRef.current + 1;
      countRef.current++;
    }
    console.log(countRef);
  }, [userRating]);

  useEffect(() => {
    setIsTop(imdbRating > 8);
  }, [imdbRating]);

  const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    if (!isWatched) {
      const newWatchedMovie = {
        imdbID: selectedId,
        title,
        year,
        poster,
        imdbRating: Number(imdbRating),
        runtime: Number(runtime.split(" ").at(0)),
        userRating,
        countRatingDesign: countRef.current,
      };

      onAddWatched(newWatchedMovie);
      // onCloseMovie();
      setAvgRating(Number(imdbRating));
      setAvgRating(prev => (prev + userRating) / 2);
      countRef.current = 0;
    }
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);

        setIsLoading(false);
      }
      getMovieDetails();
    },

    [selectedId]
  );

  useEffect(() => {
    if (!title) return;
    document.title = `Movie ${title}`;
    return () => (document.title = "Popcorn");
  }, [title]);

  useKey("Escape", onCloseMovie);
  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Escape") {
  //       onCloseMovie(null);
  //       console.log("closing");
  //     }
  //   }
  //   document.addEventListener("keydown", callback);
  //   return () => document.removeEventListener("keydown", callback);
  // }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={() => onCloseMovie(selectedId)}
            >
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <p>{avgRating}</p>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />

              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
