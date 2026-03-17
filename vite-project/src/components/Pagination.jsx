import React from "react";

function Pagination({ pageNo, pageAhead, pageBehind }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      <button
        onClick={pageBehind}
        disabled={pageNo === 1}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
          pageNo === 1
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            : 'bg-slate-800 text-white hover:bg-purple-600 border border-slate-600 hover:border-purple-500'
        }`}
      >
        ← Prev
      </button>

      <span className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold">
        Page {pageNo}
      </span>

      <button
        onClick={pageAhead}
        className="px-5 py-2 rounded-full text-sm font-semibold bg-slate-800 text-white hover:bg-purple-600 border border-slate-600 hover:border-purple-500 transition-all duration-200"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;