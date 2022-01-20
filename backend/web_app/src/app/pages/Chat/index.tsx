/**
 *
 * Chat
 *
 */
import CustomButton from 'app/components/CustomButton';
import { CustomText } from 'app/components/CustomText';
import { FlexDiv } from 'app/components/FlexDiv';
import { TextMessageEditor } from 'app/components/TextMessageInput';
import React, { useState, useEffect } from 'react';
import { MessageList } from './MessageList';
import { MessageFragment } from './MessageListItem';
import { MessageRequest } from './MessageRequest';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { useSelector } from 'react-redux';
import { getCurrentConversationId } from 'app/sharedSlice/pubnubInternal/slice/selectors';
import {
  getAllConversations,
  ConversationType,
} from 'store/pubnub/conversation';
import {
  selectAuth,
  selectPubbunUserId,
} from 'app/sharedSlice/auth/slice/selectors';
interface Props {
  chatInfo: any;
  setState: (state: string) => void;
}

export function Chat({ chatInfo, setState }: Props) {
  const conversationId = useSelector(getCurrentConversationId);
  const conversations: any[] = useSelector(getAllConversations);
  const pubnubUserId = useSelector(selectPubbunUserId);

  const [selectedConversation, setSelectedConversation] = useState<
    any | null | undefined
  >();
  useEffect(() => {
    setSelectedConversation(conversations.find(c => c.id === conversationId));
  }, [conversationId, conversations]);

  return (
    <div>
      <FlexDiv justifyContent="space-between">
        <FlexDiv columnGap="15px">
          <CustomButton
            padding="0px"
            backgroundColor="transparent"
            color="#8F8D86"
            onClick={() => setState('list')}
          >
            <KeyboardBackspaceIcon />
          </CustomButton>
          <CustomText
            elementName="p"
            color="#19343A"
            fontSize="16px"
            fontWeight={400}
          >
            {chatInfo.name}
          </CustomText>
        </FlexDiv>
        <CustomButton
          padding="0px"
          backgroundColor="transparent"
          color="#8F8D86"
        >
          <MoreVertIcon />
        </CustomButton>
      </FlexDiv>
      <MessageList userName={chatInfo.name} />
      <FlexDiv
        flexDirection="column"
        padding="2px"
        position="fixed"
        bottom="0px"
        width="23vw"
        rowGap="20px"
      >
        {selectedConversation?.custom?.chatStatus === 'PENDING' && (
          <MessageRequest
            userName={chatInfo.name}
            channelId={chatInfo.id}
            pubnubUserId={pubnubUserId}
          />
        )}
        {selectedConversation?.custom?.chatStatus === 'ACCEPTED' && (
          <TextMessageEditor />
        )}
      </FlexDiv>
    </div>
  );
}
