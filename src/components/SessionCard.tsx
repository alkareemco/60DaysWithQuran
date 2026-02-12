import { Check } from 'lucide-react';
import { Session } from '../data/schedule';

interface SessionCardProps {
  session: Session & { index: number };
  isCompleted: boolean;
  onToggle: () => void;
}

export default function SessionCard({ session, isCompleted, onToggle }: SessionCardProps) {
  return (
    <div
      onClick={onToggle}
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
        ${isCompleted
          ? 'bg-emerald-500/20 border-emerald-500/50 opacity-75'
          : 'bg-slate-700/30 border-slate-600/50 hover:border-emerald-500/30 hover:bg-slate-700/50'
        }
      `}
    >
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="mb-2">
        <h3 className="text-lg font-bold text-white mb-1">
          Session {session.session}
        </h3>
        <p className="text-sm text-slate-400">
          Pages {session.pages}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-emerald-400 font-medium">
          From: {session.startSurah}
        </p>
        <p className="text-xs text-emerald-400 font-medium">
          To: {session.endSurah}
        </p>
      </div>

      <button
        className={`
          mt-3 w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors
          ${isCompleted
            ? 'bg-slate-600/50 text-slate-300 hover:bg-slate-600/70'
            : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }
        `}
      >
        {isCompleted ? 'Completed' : 'Mark Complete'}
      </button>
    </div>
  );
}
