import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface Symptom {
  id: string;
  name: string;
  icon: string;
  category: 'physical' | 'mental';
}

interface SymptomLoggerProps {
  selectedDate: Date;
  selectedSymptoms: { [date: string]: string[] };
  onSymptomToggle: (symptomId: string, date: string) => void;
}

const symptoms: Symptom[] = [
  // Simptomat Fizike
  { id: "cramps", name: "Cramps", icon: "💫", category: "physical" },
  { id: "headache", name: "Headache", icon: "🤕", category: "physical" },
  { id: "fatigue", name: "Fatigue", icon: "😴", category: "physical" },
  { id: "bloating", name: "Bloating", icon: "🎈", category: "physical" },
  { id: "breast_tenderness", name: "Breast Tenderness", icon: "💞", category: "physical" },
  { id: "backache", name: "Backache", icon: "🔄", category: "physical" },
  { id: "nausea", name: "Nausea", icon: "🤢", category: "physical" },
  { id: "acne", name: "Acne", icon: "😖", category: "physical" },
  { id: "appetite", name: "Increased Appetite", icon: "🍽️", category: "physical" },
  { id: "insomnia", name: "Insomnia", icon: "🌙", category: "physical" },

  // Simptomat Mendore
  { id: "mood_swings", name: "Mood Swings", icon: "🎭", category: "mental" },
  { id: "anxiety", name: "Anxiety", icon: "😰", category: "mental" },
  { id: "depression", name: "Depression", icon: "😢", category: "mental" },
  { id: "irritability", name: "Irritability", icon: "😠", category: "mental" },
  { id: "stress", name: "Stress", icon: "😫", category: "mental" },
  { id: "emotional", name: "Emotional", icon: "🥺", category: "mental" },
  { id: "low_energy", name: "Low Energy", icon: "🔋", category: "mental" },
  { id: "concentration", name: "Poor Concentration", icon: "🤔", category: "mental" }
];

const SymptomLogger: React.FC<SymptomLoggerProps> = ({
  selectedDate,
  selectedSymptoms,
  onSymptomToggle,
}) => {
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const currentDateSymptoms = selectedSymptoms[dateStr] || [];
  
  const physicalSymptoms = symptoms.filter(s => s.category === 'physical');
  const mentalSymptoms = symptoms.filter(s => s.category === 'mental');

  const SymptomSection = ({ title, symptoms }: { title: string, symptoms: Symptom[] }) => (
    <div>
      <h4 className="text-md font-semibold mb-3 text-primary">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {symptoms.map((symptom) => (
          <Button
            key={symptom.id}
            className={`transition-all ${
              currentDateSymptoms.includes(symptom.id)
                ? "bg-primary hover:bg-primary-hover"
                : ""
            }`}
            onClick={() => onSymptomToggle(symptom.id, dateStr)}
          >
            <span className="mr-1">{symptom.icon}</span>
            {symptom.name}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Symptoms</h3>
        <div className="text-sm text-muted-foreground">
          {format(selectedDate, "MMMM d, yyyy")}
        </div>
      </div>
      <div className="space-y-6">
        <SymptomSection title="Physical Symptoms" symptoms={physicalSymptoms} />
        <SymptomSection title="Mental & Emotional Symptoms" symptoms={mentalSymptoms} />
      </div>
    </Card>
  );
};

export default SymptomLogger;
