import React from "react";

export default function TodoInput(){
    return (
        <div className="flex flex-col flex-1 items-center  border-y border-l p-10 border-black">
            <p className="flex items-center mb-10 text-2xl font-bold">New task</p>
            <div className="w-full h-full">
                <input type="text"
                       className="border border-black-500 rounded-md w-full p-1.5 px-3
                            focus:outline-none"
                       placeholder="Add new task ...."/>
                <div>
                    <label htmlFor="">Description</label>
                    <input type="textar"/>
                </div>
            </div>
        </div>
    )
}