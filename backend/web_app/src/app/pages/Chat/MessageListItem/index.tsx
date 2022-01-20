import { CustomText } from 'app/components/CustomText';
import { FlexDiv } from 'app/components/FlexDiv';
import { MessageDisplay } from 'app/components/MessageDisplay';
import { selectPubbunUserId } from 'app/sharedSlice/auth/slice/selectors';
import useHover from 'hooks/useHover';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { AppMessage } from 'types/messageModel';
// import convertTimestampToTime from 'foundations/utilities/convertTimestampToTime';
// import {
//   Heading,
//   Label,
//   LabelSizes,
// } from 'foundations/components/presentation';
// import { StyledBox, FlexColumn, FlexRow } from 'foundations/components/layout';
// import { MessageDisplay } from 'features/messages/MessageDisplay';

// TODO: Explain message fragment
export interface MessageFragment {
  sender: {
    id: string;
    name: string;
  };
  timetoken: string;
  message: AppMessage | any;
  time?: string;
  date?: string;
}

interface MessageProps {
  messageFragment: MessageFragment;
  avatar: ReactNode;
  innerRef?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
}

/**
 * Display a message as it appears in a list
 */
const MessageListItem = ({
  messageFragment,
  avatar,
  innerRef,
}: MessageProps) => {
  const sender = messageFragment.sender;
  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });
  const pubnubUsedId = useSelector(selectPubbunUserId);
  const isReciver = sender.id === pubnubUsedId;
  return (
    <FlexDiv
      padding="10px 0px"
      alignItems="flex-start"
      justifyContent={isReciver ? 'flex-end' : 'flex-start'}
      width="100%"
      innerRef={innerRef}
    >
      {!isReciver && avatar}
      <FlexDiv
        flexDirection="column"
        margin="0px 0px 0px 5px"
        alignItems="flex-start"
        maxWidth={isReciver ? '80%' : '100%'}
        flexGrow={1}
      >
        <MessageDisplay
          message={messageFragment.message}
          parentKey={messageFragment.timetoken}
          isReciver={isReciver}
        ></MessageDisplay>
      </FlexDiv>
    </FlexDiv>
  );
};

export default MessageListItem;
