import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import MovieCard from "./MovieCard.jsx";
import axios from "axios";
import Pagination from "./Pagination";

const GENRES = [
  { id: null, label: "All" },
  { id: 28, label: "Action" },
  { id: 35, label: "Comedy" },
  { id: 27, label: "Horror" },
  { id: 10749, label: "Romance" },
  { id: 878, label: "Sci-Fi" },
  { id: 18, label: "Drama" },
  { id: 16, label: "Animation" },
  { id: 53, label: "Thriller" },
];

function Movies({ addToWatchList, watchList, searchQuery, pageNo, setPageNo }) {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  function movePageAhead() { setPageNo(pageNo + 1); }
  function movePageBehind() { setPageNo(pageNo - 1); }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let url;
      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=b92bd2ced176e26956bd02b8ea9969c5&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`;
      } else if (selectedGenre) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=b92bd2ced176e26956bd02b8ea9969c5&language=en-US&with_genres=${selectedGenre}&page=${pageNo}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=b92bd2ced176e26956bd02b8ea9969c5&language=en-US&page=${pageNo}`;
      }
      const response = await axios.get(url);
      setMovies(response.data.results);
      setLoading(false);
    }
    getData();
  }, [pageNo, searchQuery, selectedGenre]);

  return (
    <div className="min-h-screen bg-slate-900 pb-12">
      <Banner addToWatchList={addToWatchList} watchList={watchList} />

      <div className="max-w-7xl mx-auto px-4">
        {/* Genre Filter */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-4">
            {GENRES.map((g) => (
              <button
                key={g.id}
                onClick={() => { setSelectedGenre(g.id); setPageNo(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedGenre === g.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white text-center mt-4 mb-8">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : selectedGenre
            ? `${GENRES.find(g => g.id === selectedGenre)?.label} Movies`
            : '🎬 Now Playing'}
        </h2>

        {/* Movie Grid */}
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : movies.length === 0 ? (
          <p className="text-center text-slate-400 text-lg mt-16">No movies found.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {movies.map((movieObj) => (
              <MovieCard
                key={movieObj.id}
                title={movieObj.original_title}
                posterUrl={movieObj.poster_path}
                movieObject={movieObj}
                addToWatchList={addToWatchList}
                watchList={watchList}
              />
            ))}
          </div>
        )}

        {/* Pagination — hide during search */}
        {!searchQuery && !loading && (
          <Pagination pageAhead={movePageAhead} pageBehind={movePageBehind} pageNo={pageNo} />
        )}

        {/* Back to top */}
        {!loading && movies.length > 0 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-500 text-white w-11 h-11 rounded-full shadow-lg flex items-center justify-center text-lg transition-colors z-40"
            title="Back to top"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}

export default Movies;