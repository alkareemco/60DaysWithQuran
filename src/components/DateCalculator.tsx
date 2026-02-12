import { useState, useEffect } from 'react';
import { Calendar, Settings } from 'lucide-react';

interface DateCalculatorProps {
  startDate: string;
  sessionsPerDay: number;
  onUpdate: (startDate: string, sessionsPerDay: number) => void;
  totalSessions: number;
}

export default function DateCalculator({
  startDate,
  sessionsPerDay,
  onUpdate,
  totalSessions,
}: DateCalculatorProps) {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localSessionsPerDay, setLocalSessionsPerDay] = useState(sessionsPerDay);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalSessionsPerDay(sessionsPerDay);
  }, [startDate, sessionsPerDay]);

  const calculateEndDate = () => {
    if (!localStartDate || !localSessionsPerDay) return null;

    const start = new Date(localStartDate);
    const daysNeeded = Math.ceil(totalSessions / localSessionsPerDay);
    const end = new Date(start);
    end.setDate(start.getDate() + daysNeeded - 1);

    return {
      start,
      end,
      daysNeeded,
    };
  };

  const handleSave = () => {
    onUpdate(localStartDate, localSessionsPerDay);
    setShowSettings(false);
  };

  const result = calculateEndDate();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Schedule Calculator</h2>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <Settings className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {showSettings ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={localStartDate}
              onChange={(e) => setLocalStartDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Sessions Per Day
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={localSessionsPerDay}
              onChange={(e) => setLocalSessionsPerDay(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2 px-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            Save Settings
          </button>
        </div>
      ) : result ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <span className="text-slate-300">Start Date</span>
            <span className="text-white font-semibold">{formatDate(result.start)}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <span className="text-slate-300">Estimated Completion</span>
            <span className="text-emerald-400 font-semibold">{formatDate(result.end)}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <span className="text-slate-300">Total Days</span>
            <span className="text-white font-semibold">{result.daysNeeded} days</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
            <span className="text-slate-300">Sessions Per Day</span>
            <span className="text-white font-semibold">{localSessionsPerDay} sessions</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-400 mb-4">
            Set your start date and sessions per day to calculate your completion date
          </p>
          <button
            onClick={() => setShowSettings(true)}
            className="py-2 px-6 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
}
