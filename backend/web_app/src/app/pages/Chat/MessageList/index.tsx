/**
 *
 * MessageList
 *
 */
import { FlexDiv } from 'app/components/FlexDiv';
import { ScrollView } from 'app/components/ScrollView';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import MessageListItem, { MessageFragment } from '../MessageListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useInView } from 'react-intersection-observer';

// import Avatar from '@material-ui/core/Avatar';
import ChatImageOne from 'app/assets/ChatImageOne.png';
import { CustomText } from 'app/components/CustomText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomButton from 'app/components/CustomButton';
import { useSelector } from 'react-redux';
import { getMessagesById } from 'store/pubnub/messages';
import {
  getCurrentConversationId,
  selectUserList,
} from 'app/sharedSlice/pubnubInternal/slice/selectors';
import {
  getDateWithoutTime,
  getPubnubDateAndTime,
} from 'utils/convertTimestamptoTime';
import { getInitialsOfName, groupByMessages } from 'utils/pubnub';
import { Avatar } from 'app/components/Avatar';
interface Props {
  userName: string;
}
export const getCurrentConversationMessages = createSelector(
  [getMessagesById, getCurrentConversationId, selectUserList],
  (messages, conversationId, users): MessageFragment[] => {
    return conversationId && messages[conversationId]
      ? Object.values(messages[conversationId])
          .filter(message => message.channel === conversationId)
          ?.map((message): MessageFragment => {
            // if the user is unknown queue up a request for the missing data
            const { date, time } = getPubnubDateAndTime(
              String(message.timetoken),
            );
            return {
              ...message,
              timetoken: String(message.timetoken),
              date,
              time,
              sender:
                (users[message?.message?.senderId] as {
                  id: string;
                  name: string;
                }) ||
                (users[message?.message?.senderId]
                  ? {
                      id: message?.message?.senderId,
                      name: message?.message?.senderId,
                    }
                  : {
                      id: 'unknown',
                      name: 'unknown',
                    }),
            };
          })
          .sort((messageA, messageB) => {
            if (messageA.timetoken === messageB.timetoken) {
              return 0;
            } else if (messageA.timetoken > messageB.timetoken) {
              return 1;
            } else {
              return -1;
            }
          })
      : [];
  },
);
interface dateGroupedMsgType {
  [key: string]: MessageFragment[] | undefined;
}
export function MessageList({ userName }: Props) {
  const [isLastMessageVisible, setIsLastMessageVisible] = useState(true);

  const messages: MessageFragment[] = useSelector(
    getCurrentConversationMessages,
  );
  const [dateGroupedMsgs, setDateGroupedMsgs] = useState<dateGroupedMsgType>();
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  const lastMessageRef = useRef<HTMLDivElement>(null);
  const scrollToLastMessage = () => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 94 ~ scrollToLastMessage ~ astMessageRef?.current',
      lastMessageRef?.current,
    );
    lastMessageRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  useEffect(() => {
    setIsLastMessageVisible(inView);
  }, [inView]);
  useEffect(() => {
    setTimeout(() => scrollToLastMessage(), 0);
    // alert('scroll');
  }, []);
  useEffect(() => {
    setDateGroupedMsgs(groupByMessages(messages));
  }, messages);
  return (
    <ScrollView>
      {Object.keys(dateGroupedMsgs || {})?.map((date, dateIndex) => {
        if (!date) return;
        return (
          <FlexDiv
            flexDirection="column"
            rowGap="10px"
            key={dateIndex + '-dateGroupedMsgs'}
          >
            <FlexDiv margin="10px 0px">
              <FlexDiv
                backgroundColor="#FCF7EF"
                borderRadius="20px"
                border="0.5px solid #DCA07E"
                padding="4px 8px"
              >
                <CustomText
                  elementName="p"
                  color="#19343A"
                  fontSize="10px"
                  fontWeight={400}
                  lineHeight="12px"
                >
                  {getDateWithoutTime(date)}
                </CustomText>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv
              flexDirection="column"
              justifyContent="space-between"
              flexGrow={1}
              minHeight="100%"
              padding={
                dateGroupedMsgs &&
                Object.keys(dateGroupedMsgs).length === dateIndex + 1
                  ? '0px 0px 150px 0px'
                  : '0px 0px'
              }
              width="100%"
            >
              {dateGroupedMsgs?.[date]?.map((message, index) => {
                if (
                  Object.keys(dateGroupedMsgs).length === dateIndex + 1 &&
                  dateGroupedMsgs?.[date]?.length === index + 1
                ) {
                  return (
                    <div
                      style={{ width: '100%' }}
                      ref={lastMessageRef}
                      key={message.timetoken}
                    >
                      <MessageListItem
                        innerRef={ref}
                        messageFragment={message}
                        avatar={
                          <Avatar nameLetters={getInitialsOfName(userName)} />
                        }
                      />
                    </div>
                  );
                }
                return (
                  <MessageListItem
                    messageFragment={message}
                    key={message.timetoken}
                    avatar={
                      <Avatar nameLetters={getInitialsOfName(userName)} />
                    }
                  />
                );
              })}
            </FlexDiv>
          </FlexDiv>
        );
      })}

      <FlexDiv
        flexDirection="column"
        padding="2px"
        position="fixed"
        bottom="80px"
        width="23vw"
        // rowGap="20px"
        alignItems="flex-start"
        backgroundColor="transparent"
      >
        {!isLastMessageVisible && messages.length > 2 && (
          <CustomButton borderRadius="50%" onClick={scrollToLastMessage}>
            <ExpandMoreIcon />
          </CustomButton>
        )}
      </FlexDiv>
    </ScrollView>
  );
}
