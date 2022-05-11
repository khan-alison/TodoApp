
let initialState = {
    taskList:[]
}

export const reducers = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_TASK_LIST':
            return {
                ...state,
                taskList: [...state.taskList,action.payload],
            }


        default:
            return initialState;
    }
}