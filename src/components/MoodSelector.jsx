import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'

const MOODS = [
  { label: "😂 Funny", genre: 35, desc: "Need a good laugh?" },
  { label: "😱 Scared", genre: 27, desc: "Feeling brave tonight?" },
  { label: "💕 Romantic", genre: 10749, desc: "In the mood for love?" },
  { label: "🚀 Excited", genre: 28, desc: "Want some action?" },
  { label: "😢 Emotional", genre: 18, desc: "Ready to feel things?" },
  { label: "🤯 Mind-blown", genre: 878, desc: "Want Sci-Fi?" },
  { label: "🕵️ Curious", genre: 9648, desc: "Love a mystery?" },
  { label: "🎨 Inspired", genre: 16, desc: "Feel like animation?" },
];

function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    if (!selectedMood) return;
    async function fetchByMood() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=b92bd2ced176e26956bd02b8ea9969c5&with_genres=${selectedMood.genre}&sort_by=popularity.desc&page=1`
      );
      setMovies(res.data.results.slice(0, 8));
    }
    fetchByMood();
  }, [selectedMood]);

  function addToWatchList(movie) {
    setWatchList(prev => prev.some(m => m.id === movie.id) ? prev : [...prev, movie]);
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-2">How are you feeling?</h2>
        <p className="text-slate-400 text-center mb-8">Pick your mood and we'll find the perfect movie</p>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {MOODS.map((mood) => (
            <button
              key={mood.genre}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                selectedMood?.genre === mood.genre
                  ? 'bg-purple-600 border-purple-400 text-white scale-105 shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-2xl mb-1">{mood.label.split(' ')[0]}</div>
              <div className="font-semibold text-sm">{mood.label.split(' ').slice(1).join(' ')}</div>
              <div className="text-xs text-slate-400 mt-1">{mood.desc}</div>
            </button>
          ))}
        </div>

        {/* Movies for selected mood */}
        {selectedMood && movies.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {selectedMood.label} — Top Picks
            </h3>
            <div className="flex flex-wrap justify-center gap-5">
              {movies.map(movie => (
                <MovieCard
                  key={movie.id}
                  title={movie.original_title}
                  posterUrl={movie.poster_path}
                  movieObject={movie}
                  addToWatchList={addToWatchList}
                  watchList={watchList}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MoodSelector