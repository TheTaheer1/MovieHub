import React, { useState } from "react";
import { Link } from "react-router-dom";

const genreMap = {
  28: "Action", 12: "Adventure", 16: "Animation",
  35: "Comedy", 80: "Crime", 99: "Documentary",
  18: "Drama", 10751: "Family", 14: "Fantasy",
  36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

function WatchList({ watchList = [], removeFromWatchList, clearWatchList }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  let filtered = [...watchList].filter(m =>
    m.original_title.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === 'rating-desc') filtered.sort((a, b) => b.vote_average - a.vote_average);
  else if (sortBy === 'rating-asc') filtered.sort((a, b) => a.vote_average - b.vote_average);
  else if (sortBy === 'name') filtered.sort((a, b) => a.original_title.localeCompare(b.original_title));
  else if (sortBy === 'newest') filtered.reverse();

  const avgRating = watchList.length
    ? (watchList.reduce((s, m) => s + m.vote_average, 0) / watchList.length).toFixed(1)
    : '0.0';

  const topGenreId = watchList.length
    ? Object.entries(
        watchList.flatMap(m => m.genre_ids || []).reduce((acc, id) => { acc[id] = (acc[id] || 0) + 1; return acc; }, {})
      ).sort((a, b) => b[1] - a[1])[0]?.[0]
    : null;
  const topGenre = genreMap[topGenreId] || '—';

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Header */}
      <div className="relative bg-linear-to-br from-purple-900/60 via-slate-900 to-pink-900/40 border-b border-slate-700/50 py-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-black text-white mb-0.5 tracking-tight">🎯 My Watchlist</h1>
          <p className="text-slate-400 text-xs">{watchList.length} movie{watchList.length !== 1 ? 's' : ''} in your collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {watchList.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-28 h-28 bg-slate-800 rounded-full flex items-center justify-center text-5xl mb-6 border border-slate-700">
              🎬
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Nothing here yet</h3>
            <p className="text-slate-400 mb-8 text-center max-w-xs">Browse movies and hit <span className="text-purple-400 font-semibold">+</span> to save them here for later.</p>
            <Link to="/" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/30">
              Browse Movies
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-linear-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black text-yellow-400 mb-1">⭐ {avgRating}</div>
                <div className="text-slate-400 text-xs uppercase tracking-widest">Avg Rating</div>
              </div>
              <div className="bg-linear-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black text-purple-400 mb-1">{watchList.length}</div>
                <div className="text-slate-400 text-xs uppercase tracking-widest">Movies Saved</div>
              </div>
              <div className="bg-linear-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 rounded-2xl p-5 text-center">
                <div className="text-3xl font-black text-pink-400 mb-1 truncate">{topGenre}</div>
                <div className="text-slate-400 text-xs uppercase tracking-widest">Top Genre</div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap gap-3 mb-8 items-center justify-between bg-slate-800/40 backdrop-blur-sm border border-slate-700/60 rounded-2xl px-5 py-4">
              {/* Search */}
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-600 hover:border-purple-500 focus-within:border-purple-500 rounded-xl px-4 py-2.5 transition-colors w-72">
                <span className="text-slate-400">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search your movies..."
                  className="bg-transparent outline-none text-white placeholder-slate-500 w-full text-sm"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="text-slate-500 hover:text-white text-xs transition-colors">✕</button>
                )}
              </div>

              <div className="flex gap-3 items-center">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-slate-900/80 border border-slate-600 hover:border-purple-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none cursor-pointer transition-colors"
                >
                  <option value="default">🕐 Default Order</option>
                  <option value="newest">🆕 Recently Added</option>
                  <option value="rating-desc">⭐ Highest Rated</option>
                  <option value="rating-asc">📉 Lowest Rated</option>
                  <option value="name">🔤 A → Z</option>
                </select>

                {/* Clear All */}
                {clearWatchList && (
                  <button
                    onClick={() => { if (window.confirm('Remove all movies from your watchlist?')) clearWatchList(); }}
                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/25 hover:border-red-500/50 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  >
                    🗑️ Clear All
                  </button>
                )}
              </div>
            </div>

            {/* No results */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-slate-300 font-semibold">No results for "<span className="text-purple-400">{search}</span>"</p>
                <p className="text-slate-500 text-sm mt-1">Try a different title</p>
              </div>
            ) : (
              /* Movie Grid */
              <div className="flex flex-wrap justify-center gap-6">
                {filtered.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative group w-44 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300"
                  >
                    {/* Poster */}
                    <div className="relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                        alt={movie.original_title}
                        className="w-full h-64 object-cover"
                      />
                      {/* Rating badge */}
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </div>
                      {/* Remove button on hover */}
                      <button
                        onClick={() => removeFromWatchList(movie.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-500/80 hover:bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                    {/* Info */}
                    <div className="p-3">
                      <h4 className="text-white text-xs font-semibold line-clamp-2 leading-tight mb-2">
                        {movie.original_title}
                      </h4>
                      <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full text-xs">
                        {genreMap[(movie.genre_ids || [])[0]] || 'Unknown'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default WatchList;
