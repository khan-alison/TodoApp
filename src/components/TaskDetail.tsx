import React, {useState} from "react";
import TodoInput from "./TodoInput";
import {useDispatch, useSelector} from "react-redux";
import {removeTaskList, updateTaskList} from "../redux/actions/actions";

interface ITaskDetailProp{
    id:string,
    title:string,
    description:string,
    dueDate:string,
    piority:string,
    onChecked:any,
    check:string[];
}

export default function TaskDetail(props:ITaskDetailProp){
    const dispatch = useDispatch();
    const {taskList} = useSelector((state:any)=>state.data)
    const [show,setShow] = useState(false)
    const [check,setCheck] = useState(false)
    const onUpdate = (data:any)=>{
        dispatch(updateTaskList(data))
        setShow(false)
    }
    const handleShow = ()=>{
        setShow(!show)
    }

    const onSelectCheckBox = (e:any) => {
       if(e.target.checked){
           props.onChecked(props.id,true)
           setCheck(true)
       }else{
           props.onChecked(props.id,false)
           setCheck(false)

       }
    };

    const handleRemove = ()=>{
        dispatch(removeTaskList(props.id))
        // localStorage.setItem('data',JSON.stringify(taskList))
        props.onChecked(props.id,false)
        setCheck(false)
    }


    return (
       <div className="w-full">

           <div className="flex justify-between items-center h-12 border border-black p-3">
               <input onClick={onSelectCheckBox} checked={check} type="checkbox" name="" id="" />
               <div>
                   {props.title}
               </div>
               <div className="flex gap-3">
                   <button
                       onClick={handleShow}
                       className="flex items-center h-8 p-2 bg-green-500 rounded-md text-white">Detail</button>
                   <button
                       onClick={handleRemove}
                       className="flex items-center h-8 p-2 bg-red-500 rounded-md text-white">Remove</button>
               </div>
           </div>
           {show ?
               (<div className="border border-black p-3">
                   <TodoInput onUpdate={onUpdate} {...props} />
               </div>):""}
       </div>

)
}