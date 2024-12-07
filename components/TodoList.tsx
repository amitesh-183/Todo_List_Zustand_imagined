"use client";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { useTodoStore, Todo } from "../store/todoStore";
import AddTodoModal from "./AddTodoModal";

// Shimmer component
const ShimmerTodo = () => (
  <div className="animate-pulse">
    <div className="relative bg-white p-4 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
        <div className="flex-grow">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function TodoList({ date }: { date: string }) {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const filteredTodos = todos.filter((todo) => todo.date === date);

  // Simulate loading
  useState(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsEditModalOpen(true);
  };

  return (
    <div className="sm:p-4 p-2">
      <div className="sm:mb-3">
        <h1 className="text-2xl font-bold mb-2">Today&apos;s Tasks</h1>
        <p className="text-gray-600">
          Manage your daily tasks and stay productive
        </p>
      </div>
      <ul className="space-y-4 sm:p-4 py-2 px-1 md:h-[calc(100vh-18rem)] sm:h-[calc(100dvh-22rem)] h-[calc(100dvh-21rem)] overflow-y-auto overflow-x-hidden">
        {isLoading ? (
          <>
            <ShimmerTodo />
            <ShimmerTodo />
            <ShimmerTodo />
          </>
        ) : filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-gray-400 text-lg font-medium">
              No tasks yet
            </div>
            <p className="text-gray-400 mt-2">Add a new task to get started</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="relative bg-white sm:p-4 px-2 py-4 rounded-lg shadow group hover:shadow-lg transition-all duration-200"
            >
              <div
                className={`absolute top-0 right-0 px-3 border-b border-black/20 text-xs font-medium rounded-bl-lg
    ${
      todo.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
    }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-grow">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="relative h-5 w-5 rounded-full border-2 border-gray-600 
                      checked:bg-black checked:border-black transition-colors duration-200 
                      cursor-pointer appearance-none
                      after:content-['✓'] after:absolute after:text-white after:text-sm 
                      after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                      after:opacity-0 checked:after:opacity-100 after:transition-opacity"
                  />
                  <div className="flex-grow">
                    <h3
                      className={`font-bold ${
                        todo.completed ? "line-through text-gray-500/60" : ""
                      }`}
                    >
                      {todo.text}
                    </h3>
                    {todo.description && (
                      <p
                        className={`text-sm text-gray-600 mt-1 ${
                          todo.completed ? "line-through text-gray-600/50" : ""
                        }`}
                      >
                        {todo.description}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200 md:static md:transform-none
                    absolute right-0 translate-x-full group-hover:translate-x-0 bg-white h-full shadow-white/40 shadow-lg"
                >
                  <button
                    title="edit"
                    onClick={() => handleEdit(todo)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <MdEdit size={20} className="text-gray-600" />
                  </button>
                  <button
                    title="delete"
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <AiFillDelete size={20} className="text-red-600" />
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <AddTodoModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTodo(null);
        }}
        date={date}
        todo={selectedTodo}
        mode="edit"
      />
    </div>
  );
}
