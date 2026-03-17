import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner({ addToWatchList, watchList }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchTrending() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=b92bd2ced176e26956bd02b8ea9969c5`
      );
      const results = res.data.results;
      const random = results[Math.floor(Math.random() * 5)];
      setMovie(random);
    }
    fetchTrending();
  }, []);

  if (!movie) return null;

  const isInWatchList = watchList && watchList.some(m => m.id === movie.id);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
      <div
        className="h-[40vh] bg-cover bg-center rounded-2xl overflow-hidden shadow-2xl relative"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-8">
          <div className="flex gap-2 mb-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">TRENDING</span>
            <span className="bg-yellow-500 text-black text-xs font-bold px-2.5 py-0.5 rounded-full">⭐ {movie.vote_average?.toFixed(1)}</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
            {movie.original_title}
          </h1>
          <p className="text-slate-300 text-sm max-w-lg line-clamp-2 mb-4">
            {movie.overview}
          </p>
          <div className="flex gap-3">
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-white text-black font-bold px-5 py-2.5 rounded-full hover:bg-slate-200 transition-colors duration-200 text-sm shadow-lg"
            >
              ▶ Play Movie
            </a>
            <button
              onClick={() => addToWatchList && addToWatchList(movie)}
              disabled={isInWatchList}
              className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-sm shadow-lg transition-colors duration-200 ${
                isInWatchList
                  ? 'bg-green-600 text-white cursor-default'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              {isInWatchList ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;