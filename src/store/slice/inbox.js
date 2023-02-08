import { createSlice } from "@reduxjs/toolkit"
import { getDataInbox, getDetailInbox } from "../action/inbox"

const initialState = {
    inboxes: [],
    detailInbox: {},
    loading: false,
    successUpdate: false
}

export const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {
        updateChat: (state, action) => {
            state.detailInbox = {...state.detailInbox, chats: state.detailInbox.chats.concat(action.payload)}
        },
        deleteChat: (state, action) => {
            state.detailInbox = {...state.detailInbox, chats: state.detailInbox.chats.filter((el, i) => el.id !== action.payload)}
        },
        editChat: (state, action) => {
            state.detailInbox = {...state.detailInbox, chats: state.detailInbox.chats.map(i => i.id === action.payload.id ? Object.assign({}, i, {message: action.payload.message}): i)}
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getDataInbox.pending, (state) => {
            state.loading = true;
            state.successUpdate = false
        })
        .addCase(getDataInbox.fulfilled, (state, action) => {
            state.loading = false
            state.inboxes = action.payload
            state.successUpdate = false
        })
        .addCase(getDataInbox.rejected, (state) => {
            state.loading = false;
            state.inboxes = [];
        })
        .addCase(getDetailInbox.pending, (state) => {
            state.loading = true;
        })
        .addCase(getDetailInbox.fulfilled, (state, action) => {
            state.loading = false
            state.detailInbox = action.payload
        })
        .addCase(getDetailInbox.rejected, (state) => {
            state.loading = false;
            state.detailInbox = {};
        })
    }
})

export const { updateChat, deleteChat, editChat } = inboxSlice.actions

export default inboxSlice.reducer