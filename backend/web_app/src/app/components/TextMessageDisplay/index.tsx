import React from 'react';
// import { AttachmentDisplay } from '../AttachmentDisplay';
import { TextMessage as TextMessageModel } from 'types/messageModel';
// import { TextMessage } from 'foundations/components/chat';
// import { StyledBox } from 'foundations/components/layout';
import Styled, { css } from 'styled-components/macro';
import emojiRegex from 'emoji-regex';
import { CustomText } from '../CustomText';
import convertTimestamptoTime from 'utils/convertTimestamptoTime';

type TextMessageDisplayProps = {
  message: TextMessageModel;
  parentKey: string;
  isReciver: boolean;
};

export enum TextMessageSizes {
  BIG = 'BIG',
}

interface TextWrapperProps {
  /** Specify a Message size */
  size?: TextMessageSizes | false;
  isReciver?: boolean;
}
interface TextMessageProps extends TextWrapperProps {
  /** Display a text copy */
  text: string;
  time: string;
}

const BigMessage = css`
  font-size: 15px;
`;

const Wrapper = Styled.div<TextWrapperProps>`
  background: ${p => (p.isReciver ? '#FCF7EF' : '#FAFAFA')};
  
  border-radius: 12px;
  border-top-left-radius:  ${p => (p.isReciver ? '12px' : '0px')};
  
    border-bottom-right-radius: ${p => (p.isReciver ? '0px' : '12px')};

  
  padding: 16px;
  border: ${p =>
    p.isReciver ? '0.5px solid #F6CE68' : '1px solid rgba(228, 228, 228, 0.5)'};
  
  white-space: pre-wrap;
  width: 100%;
  word-break: break-word;
  display:flex;
  flex-direction:column;
  row-gap:3px;
  ${props => props.size === TextMessageSizes.BIG && BigMessage}
`;

const TextMessage = ({
  text,
  size,
  time,
  isReciver,
  ...rest
}: TextMessageProps) => {
  return (
    <Wrapper isReciver={isReciver}>
      <CustomText
        elementName="p"
        color="#19343A"
        fontSize="14px"
        lineHeight="18px"
      >
        {text}
      </CustomText>
      <CustomText
        elementName="p"
        color="#19343A"
        textAlign="right"
        lineHeight="12px"
        fontSize="10px"
      >
        {convertTimestamptoTime(time)}
      </CustomText>
    </Wrapper>
  );
};
// Check if there are only 3 or less emoji in the message
const isEmphasized = (msg: string): boolean => {
  const trimmed = msg.trim();
  if (trimmed.length <= 15) {
    const emoji = msg.match(emojiRegex());
    return emoji ? emoji.length <= 3 && emoji.join('') === trimmed : false;
  } else {
    return false;
  }
};
/**
 * Display a TextMessage such as it would appear in a list of messages
 */
export const TextMessageDisplay = ({
  message,
  parentKey,
  isReciver,
}: TextMessageDisplayProps) => {
  return (
    <>
      <TextMessage text={message.text} time={parentKey} isReciver={isReciver} />
      {/* {message.attachments?.map((attachment, index) => (
        <StyledBox marginTop="1">
          <AttachmentDisplay
            key={`${parentKey}-attachment-${index}`}
            attachment={attachment}
          />
        </StyledBox>
      ))} */}
    </>
  );
};
