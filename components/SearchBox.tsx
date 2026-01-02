import React, { useState } from 'react';

interface SearchBoxProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-15 group-hover:opacity-25 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter GitHub username (e.g. octocat)"
          className="w-full pl-14 pr-36 py-6 bg-white border border-gray-100 rounded-[1.75rem] shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-xl font-semibold placeholder:text-gray-300 text-gray-900"
          disabled={isLoading}
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-blue-600 disabled:bg-gray-200 text-white px-8 py-3.5 rounded-2xl font-black transition-all transform active:scale-95 flex items-center gap-2 shadow-lg"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <>
              <span>Inspect</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBox;