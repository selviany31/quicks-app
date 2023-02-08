import { combineReducers } from "@reduxjs/toolkit";
import inboxReducer from './slice/inbox'
import todoReducer from './slice/todo'

const rootReducer = combineReducers({
    dataInbox: inboxReducer,
    dataTodo: todoReducer
})

export default rootReducer;