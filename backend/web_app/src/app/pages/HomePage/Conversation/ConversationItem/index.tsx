/**
 *
 * ConversationItem
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import ChatImageOne from 'app/assets/ChatImageOne.png';
import { FlexDiv } from 'app/components/FlexDiv';
import { CustomText } from 'app/components/CustomText';
import { Badge, makeStyles } from '@material-ui/core';
import { ConversationDescriptionFragment } from '..';
import convertTimestamptoTime from 'utils/convertTimestamptoTime';

interface Props {
  conversation: ConversationDescriptionFragment;
  onClick?: () => void;
}
const useStyles = makeStyles({
  customBadge: {
    fontSize: '17px',
    backgroundColor: '#869EBC',
    height: '10px',
    padding: 0,
    minWidth: '10px',
    borderRadius: '5px',
  },
});
export const ConversationItem = memo(({ conversation, onClick }: Props) => {
  const classes = useStyles();

  return (
    <Div onClick={onClick}>
      <Badge
        overlap="circular"
        badgeContent=" "
        variant="dot"
        classes={{ badge: classes.customBadge }}
      >
        <img src={ChatImageOne} alt="Logo" />
      </Badge>
      <FlexDiv
        width="100%"
        backgroundColor="transparent"
        flexDirection="column"
        rowGap="3px"
        alignItems="flex-start"
        cursor="pointer"
      >
        <FlexDiv
          justifyContent="space-between"
          width="100%"
          backgroundColor="transparent"
          cursor="pointer"
        >
          <CustomText
            elementName="p"
            color="#19343A"
            fontSize="16px"
            fontWeight={500}
          >
            {conversation.name}
          </CustomText>

          <CustomText
            elementName="p"
            color="#8F8D86"
            fontWeight={400}
            fontSize="10px"
          >
            {conversation.lastMessage?.timetoken
              ? convertTimestamptoTime(conversation.lastMessage?.timetoken)
              : ''}
          </CustomText>
        </FlexDiv>
        <CustomText
          elementName="p"
          color="#8F8D86"
          fontWeight={300}
          fontSize="14px"
        >
          {conversation.lastMessage?.message?.text}
        </CustomText>
      </FlexDiv>
    </Div>
  );
});

const Div = styled.div`
  background: #fafafa;
  border: 1px solid rgba(228, 228, 228, 0.5);
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  padding: 16px;
  width: 100%;
  cursor: pointer;
  column-gap: 10px;
`;
