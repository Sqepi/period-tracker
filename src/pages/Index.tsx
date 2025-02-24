import { useState } from "react";
import { format, addDays } from "date-fns";
import Calendar from "../components/PeriodTracker/Calendar";
import Statistics from "../components/PeriodTracker/Statistics";
import SymptomLogger from "../components/PeriodTracker/SymptomLogger";
import { useToast } from "../hooks/use-toast";
import Predictions from "../components/PeriodTracker/Predictions";
import PeriodHistory from "../components/PeriodTracker/PeriodHistory";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [periodDays, setPeriodDays] = useState<Date[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<{ [date: string]: string[] }>({});
  const { toast } = useToast();

  // Calculate cycle phases
  const lastPeriodStart = periodDays.length > 0 ? periodDays[periodDays.length - 1] : null;
  const averageCycleLength = periodDays.length >= 2 ? 28 : 0;
  
  // Ovulation occurs around day 14 of the cycle
  const ovulationPhase = lastPeriodStart ? addDays(lastPeriodStart, 14) : null;
  
  // Luteal phase starts after ovulation (typically day 15-28)
  const lutealPhase = ovulationPhase ? addDays(ovulationPhase, 1) : null;
  
  // Next period prediction
  const nextPeriodPrediction = lastPeriodStart ? addDays(lastPeriodStart, 28) : null;

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dateStr = format(date, "yyyy-MM-dd");
    const isPeriodDay = periodDays.some(
      (d) => format(d, "yyyy-MM-dd") === dateStr
    );

    if (isPeriodDay) {
      setPeriodDays(periodDays.filter((d) => format(d, "yyyy-MM-dd") !== dateStr));
      toast({
        title: "Period day removed",
        description: `Removed ${format(date, "MMMM d, yyyy")} from your period days.`,
      });
    } else {
      setPeriodDays([...periodDays, date]);
      toast({
        title: "Period day added",
        description: `Added ${format(date, "MMMM d, yyyy")} to your period days.`,
      });
    }
  };

  const handleSymptomToggle = (symptomId: string, dateStr: string) => {
    setSelectedSymptoms((prev) => {
      const dateSymptoms = prev[dateStr] || [];
      const newDateSymptoms = dateSymptoms.includes(symptomId)
        ? dateSymptoms.filter((id) => id !== symptomId)
        : [...dateSymptoms, symptomId];

      return {
        ...prev,
        [dateStr]: newDateSymptoms,
      };
    });

    toast({
      title: "Symptom Updated",
      description: `Updated symptoms for ${format(selectedDate, "MMMM d, yyyy")}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center animate-fadeIn">
          <h1 className="text-3xl font-bold text-primary mb-2">Period Tracker</h1>
          <p className="text-muted-foreground">Track your cycle and understand your body</p>
        </div>

        <Predictions
          lastPeriodStart={lastPeriodStart}
          ovulationPhase={ovulationPhase}
          lutealPhase={lutealPhase}
          nextPeriodPrediction={nextPeriodPrediction}
        />

        <Statistics
          averageCycleLength={averageCycleLength}
          lastPeriodStart={lastPeriodStart}
          nextPeriodPrediction={nextPeriodPrediction}
          lutealPhase={lutealPhase}
          ovulationPhase={ovulationPhase}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              periodDays={periodDays}
            />
            <PeriodHistory periodDays={periodDays} />
          </div>
          <SymptomLogger
            selectedDate={selectedDate}
            selectedSymptoms={selectedSymptoms}
            onSymptomToggle={handleSymptomToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
