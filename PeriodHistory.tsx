import React from "react";
import { Card } from "@/components/ui/card";
import { format, differenceInDays } from "date-fns";
import { Calendar, ArrowRight } from "lucide-react";

interface PeriodHistoryProps {
  periodDays: Date[];
}

const PeriodHistory: React.FC<PeriodHistoryProps> = ({ periodDays }) => {
  // Grupojmë ditët e periodave sipas cikleve
  const cycles = periodDays.reduce((acc: { start: Date; end: Date; length: number }[], day) => {
    
    // Kontrollojmë nëse kjo ditë është pjesë e ciklit ekzistues
    const existingCycle = acc.find(cycle => {
      const diffFromStart = Math.abs(differenceInDays(cycle.start, day));
      const diffFromEnd = Math.abs(differenceInDays(cycle.end, day));
      return diffFromStart <= 7 || diffFromEnd <= 7;
    });

    if (existingCycle) {
      // Përditësojmë ciklin ekzistues
      existingCycle.start = day < existingCycle.start ? day : existingCycle.start;
      existingCycle.end = day > existingCycle.end ? day : existingCycle.end;
      existingCycle.length = differenceInDays(existingCycle.end, existingCycle.start) + 1;
      return acc;
    }

    // Krijojmë një cikël të ri
    return [...acc, { start: day, end: day, length: 1 }];
  }, []);

  // Rendisim ciklet nga më i fundit tek më i vjetri
  const sortedCycles = cycles.sort((a, b) => b.start.getTime() - a.start.getTime());

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm animate-fadeIn">
      <h3 className="text-lg font-semibold mb-4">Period History</h3>
      <div className="space-y-4">
        {sortedCycles.map((cycle, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-accent/20">
            <Calendar className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{format(cycle.start, "MMMM d")}</span>
                <ArrowRight className="w-4 h-4 mx-2" />
                <span className="font-medium">{format(cycle.end, "MMMM d, yyyy")}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Duration: {cycle.length} days
              </p>
            </div>
          </div>
        ))}
        {sortedCycles.length === 0 && (
          <p className="text-center text-muted-foreground">
            No period history available yet. Start tracking your periods to see your history.
          </p>
        )}
      </div>
    </Card>
  );
};

export default PeriodHistory; 