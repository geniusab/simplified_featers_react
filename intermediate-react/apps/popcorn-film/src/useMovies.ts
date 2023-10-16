import { useEffect, useState } from "react";

const KEY = import.meta.env.VITE_API_KEY;

export function useMovies(query: string) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const result = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        // debug
        // throw new Error("Error fetching");
        if (!result.ok) throw new Error("Error fetching");
        const data = await result.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
      } catch (e) {
        if (e.name != "AbortError") {
          setError(e.message);
        }
      } finally {
        console.log("finally");
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return () => {
      console.log("cleanup complete");
      return controller.abort();
    };
  }, [query]);

  return {
    movies,
    isLoading,
    error,
  };
}
