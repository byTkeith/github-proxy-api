
import React from 'react';
import { Repository } from '../types';

interface RepoListProps {
  repos: Repository[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900">Repositories ({repos.length})</h3>
      </div>
      {repos.map((repo) => (
        <div key={repo.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {repo.name}
                  </h4>
                  {repo.language && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded tracking-wider">
                      {repo.language}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                  by <span className="font-semibold text-gray-700">{repo.ownerLogin}</span>
                </p>
                {repo.description && (
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {repo.description}
                  </p>
                )}
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Branches
                  </h5>
                  <div className="space-y-3">
                    {repo.branches.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No branches found or inaccessible.</p>
                    ) : (
                      repo.branches.map((branch) => (
                        <div key={branch.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                          <span className="text-sm font-semibold text-gray-700 font-mono">
                            {branch.name}
                          </span>
                          <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-400 font-mono overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] sm:max-w-none">
                            {branch.lastCommitSha}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="View on GitHub"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
