import {rootReducer} from "./rootReducers";


const todoListLocalStoreage = localStorage.getItem("data")
    // @ts-ignore
    ? JSON.parse(localStorage.getItem("data"))
    : [];


let initialState = {
    taskList:todoListLocalStoreage
}

export const reducers = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_TASK_LIST':
            return {
                ...state,
                taskList: [...state.taskList,action.payload],
            }

        case 'UPDATE_TASK_LIST':
            //@ts-ignore
            const index = state.taskList.findIndex((item:any)=>
                item.id == action.payload.id
            )
            //@ts-ignore
            state.taskList[index] = action.payload
            return {
                ...state,
                taskList: [...state.taskList],
            }
        case 'REMOVE_TASK_LIST':

            return {
                ...state,
                taskList: [...state.taskList.filter((item:any)=>
                      !action.payload.includes(item.id)
                )],
            }



        default:
            return initialState;
    }
}