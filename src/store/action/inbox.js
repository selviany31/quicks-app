import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataInbox = createAsyncThunk(
    "inbox/getInbox",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3004/inbox`)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const getDetailInbox = createAsyncThunk(
    "inbox/getDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3004/inbox/${id}`)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)