import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

interface ITodoInputTask {
  onAddNewTask?:(data:any)=>void;
  onUpdate?:(data:any)=>void;
  id?:string,
  title?:string,
  description?:string,
  dueDate?:string,
  piority?:string
}

export default function TodoInput(props: ITodoInputTask) {
  const dispatch = useDispatch()
  const { taskList } = useSelector((state: any) => state.data);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [piority, setPiority] = useState("Normal");
  const [dateVal, setDateVal] = useState(true);
  const [titleVal, setTitleVal] = useState(true);
  const [disable,setDisable] = useState(true)

  const generateRadomStr = () =>{
    return (Math.random() + 1).toString(36).substring(7)
  }
  const isDateBeforeToday = (date: any) => {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  };

  const handleChangeTitle = (e: any) => {
    if (e.target.value == "") {
      setTitleVal(false);
      setTitle(e.target.value);
    } else {
      setTitle(e.target.value);
      setTitleVal(true);
    }
  };

  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleChangeDueDate = (e: any) => {
    const isPast = isDateBeforeToday(new Date(e.target.value));
    if (isPast ) {
      setDateVal(false);
      setDueDate(e.target.value);
    } else {
      setDueDate(e.target.value);
      setDateVal(true);
    }
  };

  useEffect(()=>{
      if(props.onAddNewTask){
        if (!title || isDateBeforeToday(new Date(dueDate))) {
          setDisable(true)
        } else {
          setDisable(false)
        }
      }else{
        setDisable(false)
      }
  },[title,dueDate])


  const handleChangePiority = (e: any) => {
    setPiority(e.target.value);
  };

  const handleAddNewTask = () => {
    const data = {
      id: props.id ?? generateRadomStr(),
      title: title||props.title,
      description: description||props.description,
      dueDate: dueDate|| props.dueDate,
      piority: piority||props.piority,
    }

    if ( props.onAddNewTask) {
      props.onAddNewTask(data)
      setTitle("")
      setDescription("")
      setDueDate(new Date().toISOString().slice(0, 10));
      setPiority("Normal")
    }

    if ( props.onUpdate) {
      props.onUpdate(data)
    }

  };
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div>
        <div>
          <div className="relative">
            <input
              type="text"
              id="outlined_success"
              aria-describedby="outlined_success_help"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-600 appearance-none dark:text-black dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-green-600 peer border border-black-500 rounded-md w-full p-2 px-3
            focus:outline-none"
              placeholder=" "
              value={props.onUpdate ? (title=="" ? "":title)||props.title : props.title||title}
              //   value={props.title || ""}
              onChange={handleChangeTitle}

            />
            <label
              htmlFor="outlined_success"
              className="absolute text-sm text-green-600 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Title
            </label>
          </div>
        </div>
        {titleVal ? (
          <p></p>
        ) : (
          <p
            id="outlined_success_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          >
            Title is require
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="text-sm font-bold mb-3">
          Description
        </label>
        <textarea
          name=""
          className={`resize rounded-md w-full ${props.onUpdate ? 'h-15': "h-40"} border-black p-2 focus:outline-none border `}
          onChange={handleChangeDescription}
          // ref={desRef}
          value={props.onAddNewTask ? props.description || description : description || props.description}
        ></textarea>
      </div>
      <div className="flex">
        <div className="flex flex-col flex-1 pr-10">
          <label htmlFor="" className="text-sm font-bold mb-3">
            Due Date
          </label>
          <input
            type="date"
            className="focus:outline-none border p-1.5 rounded-md"
            // ref={dateRef}
            onChange={handleChangeDueDate}
            value={props.onAddNewTask ?   dueDate || props.dueDate :props.dueDate || dueDate}
          />
          {dateVal ? (
            <p></p>
          ) : (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              Date shouldn't in the past
            </p>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="" className="text-sm font-bold mb-3">
            Piority
          </label>
          <select
              // ref={priorityRef}
            value={props.onAddNewTask ? "Normal"|| props.piority :props.piority || "Normal"}
            className="border focus:outline-none border  p-1.5 rounded-md"
            onChange={handleChangePiority}
          >
            <option value="Easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleAddNewTask}
        disabled={disable}
        // disabled={(titleVal && dateVal) || !props.onUpdate ? false : true}
        className={disable?
            "flex items-center justify-center bg-green-300 w-full py-2 rounded-lg text-white mt-10 cursor-not-allowed":
             "flex items-center justify-center bg-green-500 w-full py-2 rounded-lg text-white mt-10 cursor-pointer"


        }
      >
        {props.onAddNewTask ? "Add" : "Update"}
      </button>
    </div>
  );
}
