import React from "react";
import TodoInput from "./TodoInput";
import {useDispatch} from "react-redux";
import {addTaskList} from "../redux/actions/actions";

export default function NewTask() {
    const dispatch = useDispatch();
  const onAddNewTask = (data: any) => {
      dispatch(addTaskList(data))
  };
  return (
    <div className="flex flex-col flex-1 items-center gap-5  border-y border-l p-10 border-black">
      <p className="flex items-center mb-10 text-2xl font-bold">New task</p>
      <TodoInput onAddNewTask={onAddNewTask} />
    </div>
  );
}
