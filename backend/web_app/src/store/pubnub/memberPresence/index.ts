import { createSelector } from '@reduxjs/toolkit';
import { createPresenceReducer, Presence } from 'pubnub-redux';
import { RootState } from 'store/configureStore';

export interface ConversationPresence {
  [conversationId: string]: {
    name: string;
    occupants: Presence[];
    occupancy: number;
  };
}

/**
 * Create a reducer to precense information for conversation members
 */
const MemberPresenceReducer = createPresenceReducer();
export { MemberPresenceReducer };

const getByPresenceSlice = (state: RootState) => state.memberPresence;

export const getPresenceByConversationId = createSelector(
  [getByPresenceSlice],
  (presence: { byId: ConversationPresence }) => {
    return presence.byId;
  },
);
