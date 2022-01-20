import { createSelector } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  createChannelDataReducer,
  createChannelsListReducer,
  Channel,
} from 'pubnub-redux';
import { RequireFields } from 'utils/requiredFields';
import { RootState } from 'store/configureStore';

/**
 * Define which fields of PubNub's User object is accessed by this application.
 * Fields not specified in this definition are not used.
 * We use this oportunity to indicate that some fields which are optional in
 * the PubNub object definition are NOT optional in this application.
 */
export type ConversationType = RequireFields<
  Channel<{}>,
  'id' | 'name' | 'description' | 'custom' | 'updated' | 'eTag'
>;

/**
 * Describes a way to lookup a conversation from a conversationId
 */
export type ConversationsIndexedById = { [id: string]: ConversationType };

/**
 * create a reducer which holds all known conversation objects in a normalized form
 */
const conversationStateReducer = combineReducers({
  conversations: createChannelDataReducer<ConversationType>(),
  allConversations: createChannelsListReducer<{}>(),
});
export { conversationStateReducer };

/**
 * Slice selectors are used internally to access the state of the reducer
 */
const getConversationsSlice = (state: RootState) => state.conversations;
const getChannelsSlice = (state: RootState) =>
  state.conversations.conversations;
const getAllChannelsSlice = (state: RootState) =>
  state.conversations.allConversations;

/**
 * Returns an index which can be used to find conversation objects
 */
export const getConversationsById = createSelector(
  [getConversationsSlice],
  (conversations): ConversationsIndexedById => {
    return conversations.conversations.byId;
  },
);

/**
 * Returns an array of all channels
 */
export const getAllConversations = createSelector(
  [getChannelsSlice, getAllChannelsSlice],
  (channels, allChannels) => {
    return Object.keys(channels.byId).map(function (key) {
      return channels.byId[key];
    });
  },
);
