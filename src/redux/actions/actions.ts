export const addTaskList =  (payload: any)=>{
    return{
        type: 'ADD_TASK_LIST',
        payload,
    }
}

export const updateTaskList =  (payload: any)=>{
    return{
        type: 'UPDATE_TASK_LIST',
        payload,
    }
}

export const removeTaskList =  (payload: any)=>{
    return{
        type: 'REMOVE_TASK_LIST',
        payload,
    }
}