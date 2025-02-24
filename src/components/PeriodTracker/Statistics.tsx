import React from "react";
import { Card } from "../ui/card";
import { Calendar, Clock, TrendingUp, Moon, Sun } from "lucide-react";
import { format, addDays } from "date-fns";

interface StatisticsProps {
  averageCycleLength: number;
  lastPeriodStart: Date | null;
  nextPeriodPrediction: Date | null;
  lutealPhase: Date | null;
  ovulationPhase: Date | null;
}

const Statistics: React.FC<StatisticsProps> = ({
  averageCycleLength,
  lastPeriodStart,
  nextPeriodPrediction,
  lutealPhase,
  ovulationPhase,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate-fadeIn">
      <Card className="p-4 bg-white/80 backdrop-blur-sm flex items-center space-x-3">
        <Clock className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Cycle Length</p>
          <p className="font-semibold">{averageCycleLength} days</p>
        </div>
      </Card>
      
      <Card className="p-4 bg-white/80 backdrop-blur-sm flex items-center space-x-3">
        <Calendar className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Last Period</p>
          <p className="font-semibold">
            {lastPeriodStart ? format(lastPeriodStart, "MMM d") : "Not set"}
          </p>
        </div>
      </Card>
      
      <Card className="p-4 bg-white/80 backdrop-blur-sm flex items-center space-x-3">
        <Sun className="w-5 h-5 text-yellow-500" />
        <div>
          <p className="text-sm text-muted-foreground">Ovulation</p>
          <p className="font-semibold">
            {ovulationPhase ? format(ovulationPhase, "MMM d") : "Calculating..."}
          </p>
        </div>
      </Card>

      <Card className="p-4 bg-white/80 backdrop-blur-sm flex items-center space-x-3">
        <Moon className="w-5 h-5 text-purple-500" />
        <div>
          <p className="text-sm text-muted-foreground">Luteal Phase</p>
          <p className="font-semibold">
            {lutealPhase ? format(lutealPhase, "MMM d") : "Calculating..."}
          </p>
        </div>
      </Card>
      
      <Card className="p-4 bg-white/80 backdrop-blur-sm flex items-center space-x-3">
        <TrendingUp className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Next Period</p>
          <p className="font-semibold">
            {nextPeriodPrediction ? format(nextPeriodPrediction, "MMM d") : "Calculating..."}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Statistics;
