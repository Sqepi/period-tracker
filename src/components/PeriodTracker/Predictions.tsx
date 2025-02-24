import React from "react";
import { Card } from "@/components/ui/card";
import { format, differenceInDays } from "date-fns";
import { Calendar, Sun, Moon, Heart, AlertCircle } from "lucide-react";

interface PredictionsProps {
  lastPeriodStart: Date | null;
  ovulationPhase: Date | null;
  lutealPhase: Date | null;
  nextPeriodPrediction: Date | null;
}

const Predictions: React.FC<PredictionsProps> = ({
  lastPeriodStart,
  ovulationPhase,
  lutealPhase,
  nextPeriodPrediction,
}) => {
  const today = new Date();

  const getPhaseInfo = () => {
    if (!lastPeriodStart) return null;

    const daysSinceStart = differenceInDays(today, lastPeriodStart);

    if (daysSinceStart <= 5) {
      return {
        phase: "Menstrual Phase",
        description: "Your period is happening. Take care of yourself with rest and self-care.",
        icon: <Calendar className="w-6 h-6 text-red-500" />,
      };
    } else if (ovulationPhase && differenceInDays(ovulationPhase, today) <= 3) {
      return {
        phase: "Ovulation Phase",
        description: "You're likely ovulating. Energy levels are typically high during this time.",
        icon: <Sun className="w-6 h-6 text-yellow-500" />,
      };
    } else if (lutealPhase && differenceInDays(today, lutealPhase) >= 0) {
      return {
        phase: "Luteal Phase",
        description: "Your body is preparing for the next cycle. You might experience PMS symptoms.",
        icon: <Moon className="w-6 h-6 text-purple-500" />,
      };
    } else {
      return {
        phase: "Follicular Phase",
        description: "Your body is preparing for ovulation. Energy and mood often improve during this time.",
        icon: <Heart className="w-6 h-6 text-pink-500" />,
      };
    }
  };

  const phaseInfo = getPhaseInfo();

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm animate-fadeIn">
      <div className="flex items-start space-x-4">
        {phaseInfo ? (
          <>
            <div className="p-2 bg-white rounded-full shadow-sm">
              {phaseInfo.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Current Phase: {phaseInfo.phase}
              </h3>
              <p className="text-muted-foreground mb-4">{phaseInfo.description}</p>
              
              <div className="space-y-2">
                {nextPeriodPrediction && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span>Next period expected on {format(nextPeriodPrediction, "MMMM d")}</span>
                  </div>
                )}
                {ovulationPhase && (
                  <div className="flex items-center text-sm">
                    <Sun className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>Ovulation expected around {format(ovulationPhase, "MMMM d")}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-muted-foreground" />
            <p>Track your period to see predictions and phase information.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Predictions; 