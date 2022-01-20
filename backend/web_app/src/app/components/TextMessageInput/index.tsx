import React, { useEffect, useRef, useContext, useState } from 'react';
import CustomButton from '../CustomButton';
import { FlexDiv } from '../FlexDiv';
import SendIcon from '@material-ui/icons/Send';
import { Textarea } from '../TextArea';
import { CustomInput } from '../CustomInput';
import { useSelector } from 'react-redux';
import { getCurrentConversationId } from 'app/sharedSlice/pubnubInternal/slice/selectors';
import { sendMessage } from 'utils/pubnub';
// import { EmojiInput } from 'features/emoji/EmojiInput/EmojiInput';
// import { GifInput } from 'features/gifs/GifInput';
// import { IGif } from '@giphy/js-types';
// import { EmojiSuggestion } from 'features/emoji/EmojiSuggestion/EmojiSuggestion';
// import { MessageType } from '../messageModel';
// import { DraftTextMessage, isDraftModified } from '../draft';
// import { useMediaQuery } from 'foundations/hooks/useMediaQuery';
// import { ThemeContext } from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { sendMessage } from '../sendMessage';
// import { getLoggedInUserId } from 'features/authentication/authenticationModel';
// import { FlexDiv, StyledBox } from 'foundations/components/layout';
// import { Icon, Icons, Textarea } from 'foundations/components/presentation';
/**
 * Expand the height of the input box as multiple lines of text are entered.
 */
// const autoExpand = (el: HTMLTextAreaElement) => {
//   setTimeout(function () {
//     el.style.cssText = 'height:auto; padding:0';
//     el.style.cssText = 'height:' + el.scrollHeight + 'px';
//   }, 0);
// };

/**
 * Update the text field on a draft text message by returning a new object if
 * the new text is different than the text in the old object.
 * This is the proper way to do updates to avoid unnecessary rerendering.
 */

type TextMessageEditorProps = {
  message?: string;
};

/**
 * Edit a draft Text Message
 */
export const TextMessageEditor = ({ message }: TextMessageEditorProps) => {
  // const touch = useMediaQuery(theme.mediaQueries.touch);
  const conversationId = useSelector(getCurrentConversationId);
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(
    document.createElement('textarea'),
  );

  const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await sendMessage(text, conversationId);
      setText('');
    }
    // autoExpand(e.target as HTMLTextAreaElement);
  };

  const emojiInserted = (messageWithEmoji: string) => {
    // updateDraft(newTextDraft(message, messageWithEmoji));
    textareaRef.current.focus();
  };

  // immediately send gifs (without creating a draft message)

  useEffect(() => {
    // autoExpand(textareaRef.current);
  }, [textareaRef]);

  return (
    <FlexDiv margin="10px 0px" width="100%">
      <FlexDiv flexGrow={1}>
        <CustomInput
          name="messageInput"
          placeholder="Type Message"
          onKeyPress={handleKeyPress}
          onChange={textChanged}
          value={text}
        />
        {/* <Textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={e => {
            setText(e.target.value);
            // textChanged(e);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Type Message"
        /> */}
      </FlexDiv>

      {/* <StyledBox marginLeft="1">
        <EmojiInput value={text} onSelection={emojiInserted} />
        <EmojiSuggestion value={text} onSelection={emojiInserted} />
      </StyledBox> */}

      {/* {touch && ( */}
      {/* <CustomButton
        // bg="active"
        color="white"
        padding="1"
        margin="-1px -1px -1px 1px"
        // marginLeft="1"
        borderRadius="light"

        // onClick={() => isDraftModified(message) && sendDraft(message)}
      >
        <SendIcon />
      </CustomButton> */}
    </FlexDiv>
  );
};
