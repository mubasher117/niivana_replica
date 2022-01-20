/**
 *
 * BecomeMember
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Dialog from '@material-ui/core/Dialog';
import { CustomText } from 'app/components/CustomText';
// import { withStyles } from 'material-ui/styles';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Modal from 'app/components/Modal';
import { FlexDiv } from 'app/components/FlexDiv';
import { ReactComponent as TickIcon } from 'app/assets/check.svg';
import CustomButton from 'app/components/CustomButton';
import { useSnackbar } from 'notistack';

interface Props {
  open: boolean;
  handleClose: () => void;
}
const CheckList = ({ title }) => {
  return (
    <FlexDiv
      margin="0px 0px 24px 0px"
      justifyContent="flex-start"
      backgroundColor="transparent"
      minWidth="70%"
    >
      <TickIcon />
      <CustomText elementName="span" color="#19343A" margin="0px 0px 0px 10px">
        {title}
      </CustomText>
    </FlexDiv>
  );
};

const BecomeMember = ({ open, handleClose }: Props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Modal
      handleClose={handleClose}
      minHeight="60vh"
      maxHeight="auto"
      open={open}
      padding={40}
    >
      <CustomText elementName="h1" textAlign="center">
        Become a member
      </CustomText>
      <CustomText
        elementName="span"
        color="#8F8D86"
        margin="10px 0px 20px 0px"
        textAlign="center"
      >
        Here's what you'll get...
      </CustomText>
      <FlexDiv
        flexDirection="column"
        backgroundColor="#FAFAFA"
        borderRadius="12px"
        padding="48px 0px"
      >
        <CheckList title="24/7 help via chat or video call" />
        <CheckList title="Discounted consults" />
        <CheckList title="Live educational and support groups" />
        <CheckList title="On-demand classes" />
        <CheckList title="Articles and videos" />
      </FlexDiv>
      <FlexDiv justifyContent="space-between" margin="40px 0px 0px 0px">
        <CustomButton
          width="45%"
          backgroundColor="transparent"
          letterSpacing="1px"
          onClick={() => {
            enqueueSnackbar('Please become a member', {
              variant: 'warning',
            });
            // handleClose();
          }}
          textTransform="uppercase"
        >
          <CustomText elementName="span" color="#19343A" fontWeight={600}>
            Not Now
          </CustomText>
        </CustomButton>{' '}
        <CustomButton
          width="45%"
          borderRadius="12px"
          letterSpacing="1px"
          textTransform="uppercase"
          onClick={() => {
            enqueueSnackbar('You have successfully become a member', {
              variant: 'success',
            });
            // handleClose();
          }}
        >
          <CustomText elementName="span" color="#fff" fontWeight={600}>
            Pricing
          </CustomText>
        </CustomButton>{' '}
      </FlexDiv>
    </Modal>
  );
};

export default BecomeMember;
