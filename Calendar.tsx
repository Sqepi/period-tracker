import React from "react";
import { Card } from "@/components/ui/card";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, setYear, setMonth, isAfter, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Lock } from "lucide-react";

interface CalendarProps {
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
  periodDays: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDates, onDateSelect, periodDays }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [showYearPicker, setShowYearPicker] = React.useState(false);
  
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const isPeriodDay = (date: Date) => {
    return periodDays.some(
      (periodDate) => format(periodDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const isFutureDate = (date: Date) => {
    return isAfter(startOfDay(date), today);
  };

  const handleDateClick = (date: Date) => {
    if (isFutureDate(date)) {
      toast({
        title: "Cannot select future dates",
        description: "You can only track periods for past and current dates.",
        variant: "destructive"
      });
      return;
    }
    onDateSelect(date);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  const handleYearSelect = (year: number) => {
    setCurrentMonth(setYear(currentMonth, year));
    setShowYearPicker(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(setMonth(currentMonth, monthIndex));
  };

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <button onClick={previousMonth} className="p-2 hover:bg-accent rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <select
            value={currentMonth.getMonth()}
            onChange={(e) => handleMonthSelect(Number(e.target.value))}
            className="bg-transparent border-none text-lg font-semibold cursor-pointer hover:text-primary"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowYearPicker(!showYearPicker)}
            className="text-lg font-semibold hover:text-primary flex items-center gap-1"
          >
            {currentYear}
            <CalendarIcon className="w-4 h-4" />
          </button>
        </div>

        <button onClick={nextMonth} className="p-2 hover:bg-accent rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {showYearPicker && (
        <div className="absolute z-10 bg-white shadow-lg rounded-lg p-2 grid grid-cols-3 gap-2 mt-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`p-2 rounded hover:bg-accent ${
                year === currentYear ? "bg-primary text-white" : ""
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs text-muted-foreground p-2 text-center">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const isSelected = selectedDates.some(
            (selectedDate) => format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
          );
          const isPeriod = isPeriodDay(day);
          const isFuture = isFutureDate(day);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={isFuture}
              className={`p-2 rounded-full text-sm transition-all relative ${
                isSelected
                  ? "bg-primary text-white"
                  : isPeriod
                  ? "bg-primary/20 hover:bg-primary/30"
                  : isFuture
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-accent"
              }`}
            >
              {format(day, "d")}
              {isFuture && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1">
                  <Lock className="w-3 h-3 text-gray-400" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default Calendar;
function toast(_arg0: { title: string; description: string; variant: string; }) {
  throw new Error("Function not implemented.");
}

