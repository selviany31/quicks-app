import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataTodo = createAsyncThunk(
    "todo/getTodo",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3004/todo`)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const createDataTodo = createAsyncThunk(
    "todo/createTodo",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3004/todo`, data)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const updateDataTodo = createAsyncThunk(
    "todo/updateTodo",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3004/todo/${id}`, data)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)