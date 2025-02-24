import React, { useState } from 'react';
import Calendar from './components/PeriodTracker/Calendar';
import Statistics from './components/PeriodTracker/Statistics';
import PeriodHistory from './components/PeriodTracker/PeriodHistory';
import { addDays } from 'date-fns';

const App: React.FC = () => {
  const [periodDays, setPeriodDays] = useState<Date[]>([]);
  const [averageCycleLength] = useState(28);
  const [lastPeriodStart, setLastPeriodStart] = useState<Date | null>(null);
  const [nextPeriodPrediction, setNextPeriodPrediction] = useState<Date | null>(null);
  const [lutealPhase, setLutealPhase] = useState<Date | null>(null);
  const [ovulationPhase, setOvulationPhase] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    const isSelected = periodDays.some(
      d => d.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );

    if (isSelected) {
      setPeriodDays(periodDays.filter(
        d => d.toISOString().split('T')[0] !== date.toISOString().split('T')[0]
      ));
    } else {
      const newPeriodDays = [...periodDays, date].sort((a, b) => a.getTime() - b.getTime());
      setPeriodDays(newPeriodDays);

      // Përditëso datën e fundit të periodës
      const mostRecentDate = newPeriodDays[newPeriodDays.length - 1];
      setLastPeriodStart(mostRecentDate);

      // Llogarit parashikimin e periodës së ardhshme
      setNextPeriodPrediction(addDays(mostRecentDate, averageCycleLength));

      // Llogarit fazën luteale (14 ditë para periodës së ardhshme)
      setLutealPhase(addDays(mostRecentDate, averageCycleLength - 14));

      // Llogarit fazën e ovulimit (14 ditë pas fillimit të periodës)
      setOvulationPhase(addDays(mostRecentDate, 14));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          Period Tracker
        </h1>

        <Statistics
          averageCycleLength={averageCycleLength}
          lastPeriodStart={lastPeriodStart}
          nextPeriodPrediction={nextPeriodPrediction}
          lutealPhase={lutealPhase}
          ovulationPhase={ovulationPhase}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Calendar 
            selectedDates={periodDays}
            onDateSelect={handleDateSelect}
            periodDays={periodDays}
          />
          <PeriodHistory periodDays={periodDays} />
        </div>
      </div>
    </div>
  );
};

export default App; 