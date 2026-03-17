import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function NavBar({ searchQuery, setSearchQuery, watchListCount, resetPage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isWatchlist = location.pathname === '/watchlist';

  function handleLogoClick() {
    setSearchQuery('');
    resetPage();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <nav className="flex justify-between items-center px-6 py-2.5 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700/50 shadow-xl">
      {/* Logo */}
      <button onClick={handleLogoClick} className="text-2xl font-black hover:opacity-75 transition-opacity duration-200 bg-transparent border-none cursor-pointer">
        🎬 <span style={{background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>MovieHub</span>
      </button>

      {/* Search Bar */}
      <div className={`flex items-center bg-slate-800 border rounded-full px-3 py-1.5 gap-2 w-60 transition-colors duration-200 ${
        isWatchlist
          ? 'border-slate-700 opacity-40 cursor-not-allowed'
          : 'border-slate-600 hover:border-purple-500 focus-within:border-purple-500'
      }`}>
        <span className="text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => !isWatchlist && setSearchQuery(e.target.value)}
          placeholder={isWatchlist ? 'Search your watchlist below' : 'Search movies...'}
          disabled={isWatchlist}
          className="bg-transparent outline-none text-white placeholder-slate-400 w-full text-sm disabled:cursor-not-allowed"
        />
        {searchQuery && !isWatchlist && (
          <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white transition-colors text-sm">✕</button>
        )}
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-5 font-semibold text-base">
        <Link to="/" className="text-slate-300 hover:text-white transition-colors duration-200">
          🏠 Home
        </Link>
        <Link to="/watchlist" className="relative text-slate-300 hover:text-white transition-colors duration-200">
          🎯 Watchlist
          {watchListCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {watchListCount}
            </span>
          )}
        </Link>
        <Link to='/mood' className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full transition-colors duration-200">
          ✨ Mood
        </Link>
      </div>
    </nav>
  )
}

export default NavBar