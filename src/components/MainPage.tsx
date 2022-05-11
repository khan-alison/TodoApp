import React from "react";
import NewTask from "./NewTask";
import TodoList from "./TodoList";

export default function MainPage() {
  return (
    <div className="flex justify-center mx-48 my-32">
      <NewTask />
      <TodoList />
    </div>
  );
}
