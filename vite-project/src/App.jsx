import MoodSelector from "./components/MoodSelector";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Watchlist from "./components/Watchlist";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [watchList, setWatchList] = useState(() => {
    const saved = localStorage.getItem('movieWatchList');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    localStorage.setItem('movieWatchList', JSON.stringify(watchList));
  }, [watchList]);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const addToWatchList = (movieObj) => {
    if (watchList.some(m => m.id === movieObj.id)) {
      showToast(`"${movieObj.original_title}" is already in your watchlist!`, 'error');
    } else {
      setWatchList(prev => [...prev, movieObj]);
      showToast(`"${movieObj.original_title}" added to watchlist! 🎉`);
    }
  };

  const removeFromWatchList = (movieId) => {
    setWatchList(prev => prev.filter(m => m.id !== movieId));
  };

  const clearWatchList = () => {
    setWatchList([]);
  };

  return (
    <>
    <BrowserRouter>
      <NavBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} watchListCount={watchList.length} resetPage={() => setPageNo(1)}/>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white text-sm font-semibold shadow-2xl transition-all duration-300 ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {toast.msg}
        </div>
      )}

      <Routes>
        <Route path='/' element={<Movies addToWatchList={addToWatchList} watchList={watchList} searchQuery={searchQuery} pageNo={pageNo} setPageNo={setPageNo}/>}/>
       <Route path='/watchlist' element={<Watchlist watchList={watchList} removeFromWatchList={removeFromWatchList} clearWatchList={clearWatchList}/>}/>
        <Route path='/mood' element={<MoodSelector/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;