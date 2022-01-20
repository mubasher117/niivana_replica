/**
 *
 * Conversation
 *
 */
import { createSelector } from '@reduxjs/toolkit';
import { CustomText } from 'app/components/CustomText';
import { FlexDiv } from 'app/components/FlexDiv';
import * as React from 'react';
import { RootState } from 'store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConversations,
  ConversationType,
} from 'store/pubnub/conversation';
import {
  getConversationsByUserId,
  MembershipHash,
} from 'store/pubnub/joinedConversation';
import { ConversationItem } from './ConversationItem';
import { getMessagesById } from 'store/pubnub/messages';
import { AppMessage } from 'types/messageModel';
import { useAuthSlice } from 'app/sharedSlice/auth/slice';
import { pubnubInternalActions } from 'app/sharedSlice/pubnubInternal/slice';
import { selectUserList } from 'app/sharedSlice/pubnubInternal/slice/selectors';
import { selectPubbunUserId } from 'app/sharedSlice/auth/slice/selectors';
import { fetchMessages } from 'utils/pubnub';

interface Props {
  setState: (state: string) => void;
  setChatInfo: (chatInfo: any) => void;
}

export interface ConversationDescriptionFragment {
  id: string;
  name: string;
  description: string;
  lastMessage?: any;
  reciverId?: string;
}

interface PubnubConversationType extends ConversationType {
  custom: any;
}
const getJoinableConversations = createSelector(
  [
    getAllConversations,
    selectPubbunUserId,
    getConversationsByUserId,
    getMessagesById,
    selectUserList,
  ],
  (
    conversations: PubnubConversationType[],
    userId: string,
    joinedConversations: MembershipHash,
    messages: { [key: string]: any },
    userList: any,
  ): ConversationDescriptionFragment[] => {
    if (!conversations) return [];
    if (!userId) return [];
    let chat = conversations.filter(conversation => {
      return (
        userId &&
        joinedConversations[userId] &&
        joinedConversations[userId]
          ?.map(conv => {
            if (conv.id && conv.id.includes('direct')) {
              return conv.id;
            }
          })
          .includes(conversation.id)
      );
    });

    chat = chat.map(conversation => {
      const lastMessageIndex = messages[conversation.id]?.length - 1;
      const reciverId =
        conversation.custom?.userOne === userId
          ? conversation.custom.userTwo
          : conversation.custom.userOne;

      return {
        ...conversation,
        lastMessage: messages[conversation.id]
          ? messages[conversation.id][lastMessageIndex]
          : {},
        reciverId,
        name: userList[reciverId]?.name,
      };
    });
    return chat;
  },
);

export function Conversation({ setState, setChatInfo }: Props) {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();

  const conversations: ConversationDescriptionFragment[] = useSelector(
    getJoinableConversations,
  );

  return (
    <div>
      <CustomText elementName="h1" fontSize="18px" fontWeight={600}>
        Chat
      </CustomText>
      <FlexDiv flexDirection="column" rowGap="10px" margin="16px 0px">
        {conversations.map(elem => (
          <ConversationItem
            onClick={async () => {
              setState('chat');
              setChatInfo({
                id: elem.id,
                name: elem.name,
              });
              fetchMessages(elem.id);
              dispatch(
                pubnubInternalActions.setSelectedConversationId(elem.id),
              );
            }}
            conversation={{ ...elem }}
            key={elem.id}
          />
        ))}
      </FlexDiv>
    </div>
  );
}
