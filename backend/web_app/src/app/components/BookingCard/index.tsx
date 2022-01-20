/**
 *
 * BookingCard
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import AvatarOne from 'app/assets/avatar_one.png';
import { CustomText } from '../CustomText';
import { FlexDiv } from '../FlexDiv';
import CustomButton from '../CustomButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom';
import { BookingType } from 'app/sharedSlice/booking/slice/types';
interface Props {
  booking?: BookingType;
}

export const BookingCard = memo(({ booking }: Props) => {
  const history = useHistory();

  return (
    <Div onClick={() => history.push(`/booking/${booking?.id}`)}>
      <img src={AvatarOne} alt="Logo" />
      <FlexDiv
        width="100%"
        justifyContent="space-between"
        alignItems="flex-start"
        margin="20px 20px 0px 0px"
      >
        <FlexDiv
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          padding="0px 10px 10px 13px"
          cursor="pointer"
        >
          <CustomText elementName="p" fontSize="12px">
            16:30 - 19:30{' '}
          </CustomText>
          <CustomText
            elementName="p"
            fontSize="14px"
            fontWeight="600"
            color="#19343A"
            margin="10px 0px 20px 0px"
          >
            {booking?.client?.name}
          </CustomText>
          <CustomText
            elementName="p"
            fontSize="12px"
            fontWeight="400"
            color="#8F8D86"
            margin="0px 0px 5px 0px"
          >
            Baby Name:
            <CustomText
              fontWeight="600"
              color="#8F8D86"
              fontSize="12px"
              elementName="span"
              margin="0px 0px 0px 5px"
            >
              Alex
            </CustomText>
          </CustomText>
          <CustomText
            elementName="p"
            fontSize="12px"
            fontWeight="400"
            color="#8F8D86"
            margin="0px 0px 5px 0px"
          >
            Age:{' '}
            <CustomText
              fontWeight="600"
              color="#8F8D86"
              fontSize="12px"
              elementName="span"
              margin="0px 0px 0px 5px"
            >
              3 months old
            </CustomText>
          </CustomText>
          <CustomText
            elementName="p"
            fontSize="12px"
            fontWeight="400"
            margin="0px 0px 5px 0px"
            color="#8F8D86"
          >
            Problem:
            <CustomText
              fontWeight="600"
              color="#8F8D86"
              fontSize="12px"
              elementName="span"
              margin="0px 0px 0px 5px"
            >
              Don’t sleep properly at nights
            </CustomText>
          </CustomText>
        </FlexDiv>
        <CustomButton
          padding="0px"
          backgroundColor="transparent"
          color="#8F8D86"
        >
          <MoreHorizIcon />
        </CustomButton>
      </FlexDiv>
    </Div>
  );
});

const Div = styled.div`
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(26, 38, 75, 0.2);
  border-radius: 16px;
  display: flex;

  overflow: hidden;
  width: 450px;
  cursor: pointer;
`;
