import { BookmarkCheck } from 'lucide-react';

interface ProgressBarProps {
  completed: number;
  total: number;
  percent: number;
}

export default function ProgressBar({ completed, total, percent }: ProgressBarProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BookmarkCheck className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Your Progress</h2>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-400">
            {percent.toFixed(1)}%
          </p>
          <p className="text-sm text-slate-400">
            {completed} of {total} sessions
          </p>
        </div>
      </div>

      <div className="relative h-4 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>

      {percent === 100 && (
        <p className="mt-4 text-center text-emerald-400 font-semibold animate-bounce">
          Congratulations! You completed the Quran!
        </p>
      )}
    </div>
  );
}
