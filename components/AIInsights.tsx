
import React from 'react';

interface AIInsightsProps {
  insights: string | null;
  onGenerate: () => void;
  isLoading: boolean;
  hasData: boolean;
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights, onGenerate, isLoading, hasData }) => {
  if (!hasData) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-1 shadow-lg overflow-hidden">
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-[14px]">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Developer Insights</h3>
        </div>

        {insights ? (
          <div className="prose prose-sm text-gray-600 leading-relaxed animate-in fade-in duration-700">
            {insights.split('\n').map((para, i) => (
              <p key={i} className="mb-3">{para}</p>
            ))}
          </div>
        ) : (
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-6 italic">
              Analyze this developer's stack and expertise using Gemini AI.
            </p>
            <button
              onClick={onGenerate}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span>Generate Profile Analysis</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
