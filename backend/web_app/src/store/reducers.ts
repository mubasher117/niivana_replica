import { themeReducer } from './../styles/theme/slice/index';
/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'app/sharedSlice/auth/slice';
import { bookingReducer } from 'app/sharedSlice/booking/slice';
import { conversationStateReducer } from './pubnub/conversation';
import { ConversationMembersStateReducer } from './pubnub/conversationMembers';
import { JoinedConversationsStateReducer } from './pubnub/joinedConversation';
import { MemberPresenceReducer } from './pubnub/memberPresence';
import { MessageStateReducer } from './pubnub/messages';
import { NetworkStatusReducer } from './pubnub/network';
import { UsersReducer } from './pubnub/user';
import { pubnubInternalReducer } from 'app/sharedSlice/pubnubInternal/slice';

export function createReducer() {
  return combineReducers({
    theme: themeReducer,
    booking: bookingReducer,
    auth: authReducer,
    conversations: conversationStateReducer,
    networkStatus: NetworkStatusReducer,
    messages: MessageStateReducer,
    memberPresence: MemberPresenceReducer,
    pubnubUsers: UsersReducer,
    joinedConversations: JoinedConversationsStateReducer,
    conversationMembers: ConversationMembersStateReducer,
    pubnubInternal: pubnubInternalReducer,
  });
}
