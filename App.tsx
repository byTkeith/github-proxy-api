import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import RepoList from './components/RepoList';
import ErrorDisplay from './components/ErrorDisplay';
import AIInsights from './components/AIInsights';
import Logo from './components/Logo';
import { getRepositories } from './services/githubService';
import { analyzeDeveloper } from './services/geminiService';
import { Repository, ErrorResponse } from './types';

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [username, setUsername] = useState('');

  const handleSearch = async (searchUsername: string) => {
    setLoading(true);
    setError(null);
    setRepos([]);
    setInsights(null);
    setUsername(searchUsername);
    
    try {
      const data = await getRepositories(searchUsername);
      setRepos(data);
    } catch (err: any) {
      if (err.status) {
        setError(err);
      } else {
        setError({ 
          status: 500, 
          message: "An unexpected error occurred while fetching repositories." 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInsights = async () => {
    if (!username || repos.length === 0) return;
    setAnalyzing(true);
    try {
      const result = await analyzeDeveloper(username, repos);
      setInsights(result);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-100">
      <div className="max-w-6xl mx-auto">
        {/* Ke. Branded Header */}
        <header className="flex flex-col items-center text-center mb-16">
          <div className="mb-6 animate-in fade-in zoom-in duration-700">
            <Logo className="w-16 h-16" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.2em]">
              by Keith for Atipera recruitment
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-[900] text-gray-900 tracking-tight mb-6">
            Ke. <span className="text-blue-600">GitHub Proxy</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            High-performance proxy solution optimized for Spring Boot 4.0.1 and Java 25.
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-16">
          <SearchBox onSearch={handleSearch} isLoading={loading} />
        </div>

        {error ? (
          <div className="max-w-3xl mx-auto">
            <ErrorDisplay error={error} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Main Content: Repositories */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              {repos.length > 0 ? (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <RepoList repos={repos} />
                </div>
              ) : !loading && username && (
                <div className="text-center py-32 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Empty Profile</h3>
                  <p className="text-gray-400 font-medium">This user has no non-forked public repositories to display.</p>
                </div>
              )}
              
              {!loading && !username && (
                <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-semibold text-lg italic opacity-60">
                    Ready to inspect. Enter a username to begin.
                  </p>
                </div>
              )}
            </div>
            
            {/* Sidebar: Insights & Metadata */}
            <aside className="lg:col-span-4 space-y-8 order-1 lg:order-2 sticky top-8">
              <AIInsights 
                hasData={repos.length > 0}
                insights={insights}
                isLoading={analyzing}
                onGenerate={handleGenerateInsights}
              />
              
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">System Specifications</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-gray-400 uppercase">Architecture</span>
                    <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-100 transition-colors">Reactive Proxy</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-gray-400 uppercase">Framework</span>
                    <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full group-hover:bg-indigo-100 transition-colors">Boot 4.0.1</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-xs font-bold text-gray-400 uppercase">JVM Runtime</span>
                    <span className="font-mono text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full group-hover:bg-emerald-100 transition-colors">JDK 25</span>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-50">
                  <p className="text-[11px] leading-relaxed text-gray-400 font-medium">
                    Fully compliant with recruitment requirements: all forked repositories are excluded from the result set.
                  </p>
                </div>
              </div>

              {/* Recruitment Contact Card */}
              <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <h5 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Submission for</h5>
                <p className="text-xl font-bold mb-2">Atipera</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Software House Recruitment Task
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                  <span>Candidate: Keith</span>
                </div>
              </div>
            </aside>
          </div>
        )}

        <footer className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center gap-6">
          <Logo className="w-8 h-8 opacity-50" />
          <p className="text-gray-400 text-sm font-semibold tracking-wide">
            © 2025 Ke. GitHub Proxy | Prepared by Keith for Atipera.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;