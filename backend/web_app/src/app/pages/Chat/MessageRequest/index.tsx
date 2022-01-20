/**
 *
 * MessageRequest
 *
 */
import CustomButton from 'app/components/CustomButton';
import { CustomText } from 'app/components/CustomText';
import { FlexDiv } from 'app/components/FlexDiv';
import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { updateChatStatus } from 'utils/pubnub';

interface Props {
  userName: string;
  pubnubUserId: string;
  channelId: string;
}

export const MessageRequest = memo(
  ({ userName, channelId, pubnubUserId }: Props) => {
    const [loading, setLoading] = useState(false);
    const buttonPros = {
      color: '#DB8057',
      backgroundColor: 'transparent',
      border: '1px solid #DB8057',
      borderRadius: '10px',
      loadingIconColor: '#DB8057',
    };
    const updateStatus = async status => {
      setLoading(true);
      await updateChatStatus(channelId, status, pubnubUserId);
      setLoading(false);
    };

    return (
      <Div>
        <CustomText elementName="h3">{userName} sent you an offer</CustomText>
        <FlexDiv justifyContent="center" columnGap="10px" width="100%">
          <CustomButton
            {...buttonPros}
            isLoading={loading}
            onClick={() => updateStatus('ACCEPTED')}
          >
            Accept
          </CustomButton>
          <CustomButton
            {...buttonPros}
            isLoading={loading}
            onClick={() => updateStatus('IGNORED')}
          >
            Ignore
          </CustomButton>
        </FlexDiv>
      </Div>
    );
  },
);

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
  margin-bottom: 20px;
`;
