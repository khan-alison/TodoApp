import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TaskDetail from "./TaskDetail";
import {removeTaskList} from "../redux/actions/actions";

export default function TodoList() {
  const dispatch = useDispatch()
  const { taskList } = useSelector((state: any) => state.data);
  const [check,setCheck] = useState([])
  const [searchWord, setSearchWord] = useState("");
  const onSearchChange = (e:any)=>{
      setSearchWord(e.target.value)
  }

    const filterArray = taskList.filter((item:any)=>{
      if(searchWord == ""){
        return item
      }else{
        //@ts-ignore
        return item.title.toLowerCase().includes(searchWord)
      }
    })

  const onCheck = (data:any,status:boolean)=>{
    if(status){
      //@ts-ignore
      setCheck([...check,data])
    }else{
      setCheck(check.filter((item:any)=>
      item!=data))
    }
  }

  const handleRemove = ()=>{
    dispatch(removeTaskList(check))
    setCheck([])
  }

  return (
    <div className="flex flex-1 flex-col gap-5 items-center relative border p-10 border-black">
      <p className="flex items-center mb-10 text-2xl font-bold">New task</p>
      <input className="block px-2.5 pb-2.5 mb-5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-600 appearance-none dark:text-black dark:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-green-600 peer border border-black-500 rounded-md w-full p-2 px-3
            focus:outline-none" onChange={onSearchChange} placeholder="Search..." type="text" />
      {taskList &&
        taskList.length > 0 &&
          filterArray.map((item: any, index: number)  =>
          <TaskDetail onChecked={onCheck} check={check} key={index} {...item} />
        )}
      {
        check.length > 0 &&
          <div className="absolute bottom-0 bg-gray-200 w-full h-20 flex justify-between items-center px-12">
            <span>Bulk Actions:</span>
            <div className="flex gap-6">
              <div className="flex items-center h-8 p-2 bg-green-500 rounded-md text-white cursor-pointer">Done</div>
              <div
                  onClick={handleRemove}
                  className="flex items-center h-8 p-2 bg-red-500 rounded-md text-white cursor-pointer">Remove</div>
            </div>
          </div>
      }
    </div>
  );
}
