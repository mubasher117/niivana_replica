import { createSelector } from '@reduxjs/toolkit';
import { createChannelMembersReducer } from 'pubnub-redux';
import { RootState } from 'store/configureStore';

export type MembershipHash = { [id: string]: { id: string }[] };

export interface ConversationMembers {
  [conversationId: string]: string[];
}

const getByConversationIdSlice = (state: RootState) =>
  state.conversationMembers;

export const getUsersByConversationId = createSelector(
  [getByConversationIdSlice],
  (users: { byId: MembershipHash }) => {
    return users.byId;
  },
);

const ConversationMembersStateReducer = createChannelMembersReducer();

export { ConversationMembersStateReducer };
