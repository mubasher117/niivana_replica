import { createSelector } from '@reduxjs/toolkit';
import {
  createMessageReducer,
  Message as PubNubMessageEnvelope,
} from 'pubnub-redux';
import { RootState } from 'store/configureStore';
import { AppMessage } from 'types/messageModel';
// export type {
//   AppMessage,
//   TextMessage,
//   GiphyMessage,
// } from 'sharedTypes/messageModel';

export type MessageEnvelope = Required<
  Pick<PubNubMessageEnvelope, 'channel' | 'message' | 'timetoken'>
> & {
  message: AppMessage;
};

/**
 * create a reducer which holds all known messsage envelope objects in a normalized form
 */
export const MessageStateReducer = createMessageReducer<MessageEnvelope>();

/**
 * THis Slice selector is used internally to access the state of the reducer,
 * primarily as the base selector function for creating other selectors.
 */
const getMessagesSlice = (state: RootState) => state.messages;
// const selectSlice = (state: RootState) => state.messageState;

/**
 * Returns an index which can be used to find user objects
 */
export const getMessagesById = createSelector([getMessagesSlice], messages => {
  return messages.byId;
});
