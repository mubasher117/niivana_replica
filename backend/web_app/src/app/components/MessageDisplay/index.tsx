import React from 'react';
import { AppMessage } from 'types/messageModel';
import { TextMessageDisplay } from '../TextMessageDisplay';
// import { TextMessageDisplay } from 'features/messages/TextMessageDisplay';
// import { GiphyMessageDisplay } from 'features/messages/GiphyMessageDisplay';
// import { MessageType, AppMessage } from 'features/messages/messageModel';
// import { BaseMessage } from 'sharedTypes/messageModel';

type MessageProps = {
  message: AppMessage;
  parentKey: string;
  isReciver: boolean;
};

/**
 * Display a Message based on its type
 */
export const MessageDisplay = ({
  message,
  parentKey,
  isReciver,
}: MessageProps) => {
  return (
    <TextMessageDisplay
      message={message}
      isReciver={isReciver}
      parentKey={parentKey}
    ></TextMessageDisplay>
  );

  // switch (message.type) {
  //   case MessageType.Text:

  //   case MessageType.Giphy:
  //     return <GiphyMessageDisplay message={message}></GiphyMessageDisplay>;

  //   // <== Add additional message types here.

  //   // Don't show anything for an unrecognized message type
  //   default:
  //     invariant(
  //       false,
  //       `No component available for displaying message of type "${
  //         (message as BaseMessage).type
  //       }"`,
  //     );
  // }
};
