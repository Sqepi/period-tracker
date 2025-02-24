import React from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useToast } from "@/components/ui/toast";

interface SymptomLoggerProps {
  selectedDate: Date;
  selectedSymptoms: { [date: string]: string[] };
  onSymptomToggle: (symptomId: string, dateStr: string) => void;
}

const PHYSICAL_SYMPTOMS = [
  { id: "cramps", label: "Cramps" },
  { id: "headache", label: "Headache" },
  { id: "backache", label: "Backache" },
  { id: "nausea", label: "Nausea" },
  { id: "fatigue", label: "Fatigue" },
  { id: "bloating", label: "Bloating" },
  { id: "breast_tenderness", label: "Breast Tenderness" }
];

const MENTAL_SYMPTOMS = [
  { id: "mood_swings", label: "Mood Swings" },
  { id: "anxiety", label: "Anxiety" },
  { id: "depression", label: "Depression" },
  { id: "irritability", label: "Irritability" },
  { id: "stress", label: "Stress" },
  { id: "insomnia", label: "Insomnia" }
];

const SymptomLogger: React.FC<SymptomLoggerProps> = ({
  selectedDate,
  selectedSymptoms,
  onSymptomToggle
}) => {
  const { toast } = useToast();
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const dateSymptoms = selectedSymptoms[dateStr] || [];

  const handleSymptomClick = (symptomId: string) => {
    onSymptomToggle(symptomId, dateStr);
    toast({
      title: "Symptom updated",
      description: `Updated symptoms for ${format(selectedDate, "MMMM d, yyyy")}`,
    });
  };

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm animate-fadeIn">
      <h3 className="text-lg font-semibold mb-4">
        Symptoms for {format(selectedDate, "MMMM d, yyyy")}
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-2">Physical Symptoms</h4>
          <div className="grid grid-cols-2 gap-2">
            {PHYSICAL_SYMPTOMS.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => handleSymptomClick(symptom.id)}
                className={`p-2 rounded-lg text-sm transition-all ${
                  dateSymptoms.includes(symptom.id)
                    ? "bg-primary text-white"
                    : "bg-accent hover:bg-accent/80"
                }`}
              >
                {symptom.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium mb-2">Mental Symptoms</h4>
          <div className="grid grid-cols-2 gap-2">
            {MENTAL_SYMPTOMS.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => handleSymptomClick(symptom.id)}
                className={`p-2 rounded-lg text-sm transition-all ${
                  dateSymptoms.includes(symptom.id)
                    ? "bg-primary text-white"
                    : "bg-accent hover:bg-accent/80"
                }`}
              >
                {symptom.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SymptomLogger;
