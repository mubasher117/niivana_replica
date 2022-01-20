import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  channel: null,
  inboxedChannels: [],
  activeChatTitle: ""
}

export const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload
    },
    addInboxChannel: (state, action) => {
      let channelIndex = state.inboxedChannels.findIndex(
        channel => channel.id === action.payload.id
      )
      if (channelIndex === -1) {
        state.inboxedChannels.push(action.payload)
      }
    },
    emptyInboxChannel: state => {
      state.inboxedChannels = []
    },
    setActiveChatTitle: (state, action) => {
      state.activeChatTitle = action.payload
    }
  }
})

export const { setChannel, addInboxChannel, emptyInboxChannel, setActiveChatTitle } = chat.actions
export default chat.reducer
