import React from 'react'

function MovieCard({ posterUrl, title, addToWatchList, movieObject, watchList }) {
  const isInWatchList = watchList.some(movie => movie.id === movieObject.id);

  function handleAddToWatchList(e) {
    e.stopPropagation();
    addToWatchList(movieObject);
  }

  return (
    <div className='relative w-44 h-64 bg-cover bg-center rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 cursor-pointer border border-slate-700 hover:border-purple-500'
         style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${posterUrl})`}}>
      
      {/* Rating Badge */}
      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
        ⭐ {movieObject.vote_average?.toFixed(1)}
      </div>

      {/* Add to Watchlist Button */}
      <button
        onClick={handleAddToWatchList}
        disabled={isInWatchList}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-200 text-lg ${
          isInWatchList
            ? 'bg-green-500 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-pink-500 hover:scale-110'
        }`}
        title={isInWatchList ? 'Added' : 'Add to Watchlist'}
      >
        {isInWatchList ? '✓' : '+'}
      </button>

      {/* Title + Play button at bottom */}
      <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent'>
        <h4 className='text-white font-semibold text-sm line-clamp-2 leading-tight mb-2'>{title}</h4>
        <a
          href={`https://www.themoviedb.org/movie/${movieObject.id}`}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex items-center justify-center gap-1 w-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white text-xs font-bold py-1.5 rounded-lg transition-colors duration-200"
        >
          ▶ Play
        </a>
      </div>
    </div>
  )
}

export default MovieCard