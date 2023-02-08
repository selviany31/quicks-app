import { createSlice } from "@reduxjs/toolkit"
import { createDataTodo, getDataTodo, updateDataTodo } from "../action/todo"

const initialState = {
    todos: [],
    loading: false,
    loadingCreate: false,
    success: false
}

export const inboxSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getDataTodo.pending, (state) => {
            state.loading = true;
        })
        .addCase(getDataTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todos = action.payload
        })
        .addCase(getDataTodo.rejected, (state) => {
            state.loading = false;
            state.todos = [];
        })
        .addCase(createDataTodo.pending, (state) => {
            state.loadingCreate = true;
        })
        .addCase(createDataTodo.fulfilled, (state, action) => {
            state.loadingCreate = false
            state.success = true
        })
        .addCase(createDataTodo.rejected, (state) => {
            state.loadingCreate = false;
            state.success = false
        })
        .addCase(updateDataTodo.pending, (state) => {
            state.loadingCreate = true;
        })
        .addCase(updateDataTodo.fulfilled, (state, action) => {
            state.loadingCreate = false
            state.success = true
        })
        .addCase(updateDataTodo.rejected, (state) => {
            state.loadingCreate = false;
            state.success = false
        })
    }
})

// export const { updateChat, deleteChat, editChat } = inboxSlice.actions

export default inboxSlice.reducer