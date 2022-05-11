import {rootReducer} from "./reducers/rootReducers";
import {createStore} from "redux";

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


store.subscribe(()=>{
    localStorage.setItem("data",JSON.stringify(store.getState().data.taskList))
})