import { createSelector } from '@reduxjs/toolkit';
import { createMembershipReducer } from 'pubnub-redux';
import { RootState } from 'store/configureStore';

export type MembershipHash = { [id: string]: { id: string }[] };

export interface MemberConversations {
  [userId: string]: string[];
}

const getByUserIdSlice = (state: RootState) => state.joinedConversations;

export const getConversationsByUserId = createSelector(
  [getByUserIdSlice],
  conversations => {
    return conversations.byId;
  },
);

const JoinedConversationsStateReducer = createMembershipReducer();
export { JoinedConversationsStateReducer };
