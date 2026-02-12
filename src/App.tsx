import { useState, useEffect } from 'react';
import { BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import { quranSchedule } from './data/schedule';
import DateCalculator from './components/DateCalculator';
import SessionCard from './components/SessionCard';
import ProgressBar from './components/ProgressBar';

function App() {
  const [completedSessions, setCompletedSessions] = useState<Set<number>>(new Set());
  const [startDate, setStartDate] = useState<string>('');
  const [sessionsPerDay, setSessionsPerDay] = useState(5);

  useEffect(() => {
    const saved = localStorage.getItem('quranProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedSessions(new Set(data.completed || []));
      setStartDate(data.startDate || '');
      setSessionsPerDay(data.sessionsPerDay || 5);
    }
  }, []);

  const toggleSession = (index: number) => {
    const newCompleted = new Set(completedSessions);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSessions(newCompleted);

    localStorage.setItem('quranProgress', JSON.stringify({
      completed: Array.from(newCompleted),
      startDate,
      sessionsPerDay
    }));
  };

  const updateSettings = (newStartDate: string, newSessionsPerDay: number) => {
    setStartDate(newStartDate);
    setSessionsPerDay(newSessionsPerDay);
    localStorage.setItem('quranProgress', JSON.stringify({
      completed: Array.from(completedSessions),
      startDate: newStartDate,
      sessionsPerDay: newSessionsPerDay
    }));
  };

  const progressPercent = (completedSessions.size / quranSchedule.length) * 100;

  const groupedByDay = quranSchedule.reduce((acc, session, index) => {
    if (!acc[session.day]) {
      acc[session.day] = [];
    }
    acc[session.day].push({ ...session, index });
    return acc;
  }, {} as Record<number, Array<typeof quranSchedule[0] & { index: number }>>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BookOpen className="w-10 h-10 text-emerald-400" />
            <h1 className="text-4xl font-bold text-white">Quran Reading Tracker</h1>
          </div>
          <p className="text-slate-300 text-lg">Complete the Quran in 60 days</p>
        </header>

        <DateCalculator
          startDate={startDate}
          sessionsPerDay={sessionsPerDay}
          onUpdate={updateSettings}
          totalSessions={quranSchedule.length}
        />

        <ProgressBar
          completed={completedSessions.size}
          total={quranSchedule.length}
          percent={progressPercent}
        />

        <div className="grid gap-6">
          {Object.entries(groupedByDay).map(([day, sessions]) => {
            const dayCompleted = sessions.every(s => completedSessions.has(s.index));
            const dayProgress = sessions.filter(s => completedSessions.has(s.index)).length;

            return (
              <div key={day} className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-2xl font-bold text-white">Day {day}</h2>
                    {dayCompleted && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <span className="text-sm text-slate-400">
                    {dayProgress} of {sessions.length} sessions
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {sessions.map((session) => (
                    <SessionCard
                      key={session.index}
                      session={session}
                      isCompleted={completedSessions.has(session.index)}
                      onToggle={() => toggleSession(session.index)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
