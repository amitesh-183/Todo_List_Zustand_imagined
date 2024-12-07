"use client";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeekCalendar({
  onDateSelect,
}: {
  onDateSelect: (date: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDates = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return Array(7)
      .fill(null)
      .map((_, index) => {
        const d = new Date(date);
        d.setDate(diff + index);
        return d;
      });
  };

  const weekDates = getWeekDates(selectedDate);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date.toISOString().split("T")[0]);
  };

  return (
    <div className="flex justify-between items-center rounded-b-3xl bg-white p-4 md:px-20">
      {weekDates.map((date, index) => {
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const isFutureDate = date > selectedDate;

        return (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer font-bold duration-150 ease-linear ${
              isSelected ? "bg-black text-white" : isFutureDate ? "" : ""
            } rounded-lg p-2 transition-colors duration-200`}
            onClick={() => handleDateClick(date)}
          >
            <span
              className={`text-xs ${
                isSelected ? "bg-black text-white" : "text-gray-600/40"
              }`}
            >
              {daysOfWeek[date.getDay()]}
            </span>
            <span
              className={`text-lg font-bold pt-1 ${
                isSelected
                  ? "text-white"
                  : isFutureDate
                  ? "text-gray-600/40"
                  : ""
              }`}
            >
              {date.getDate()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
