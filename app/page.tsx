"use client";

import { CgMathPlus } from "react-icons/cg";
import { useState } from "react";
import Header from "../components/Header";
import WeekCalendar from "../components/WeekCalendar";
import TodoList from "../components/TodoList";
import AddTodoModal from "../components/AddTodoModal";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen max-w-5xl mx-auto">
      <Header />
      <WeekCalendar onDateSelect={setSelectedDate} />
      <TodoList date={selectedDate} />
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="md:fixed bottom-6 right-6 bg-white rounded-full p-3 shadow-lg"
        >
          <CgMathPlus size={30} />
        </button>
      </div>
      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
      />
    </div>
  );
}
