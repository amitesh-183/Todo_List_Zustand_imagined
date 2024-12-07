"use client";
import { useEffect, useState } from "react";
import { useTodoStore, Todo } from "../store/todoStore";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  todo?: Todo | null;
  mode?: "add" | "edit";
}

export default function AddTodoModal({
  isOpen,
  onClose,
  date,
  todo,
  mode = "add",
}: AddTodoModalProps) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const { addTodo, editTodo } = useTodoStore();

  useEffect(() => {
    if (todo && mode === "edit") {
      setText(todo.text);
      setDescription(todo.description);
    }
  }, [todo, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      if (mode === "edit" && todo) {
        editTodo(todo.id, text, description);
      } else {
        addTodo(text, date, description);
      }
      setText("");
      setDescription("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {mode === "edit" ? "Edit Todo" : "Add New Todo"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your todo"
            className="w-full p-2 border rounded mb-4"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
            className="w-full p-2 border rounded mb-4 h-24 resize-none"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded"
            >
              {mode === "edit" ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
