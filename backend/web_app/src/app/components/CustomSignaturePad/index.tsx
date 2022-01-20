/**
 *
 * SignaturePad
 *
 */
import React, { memo, LegacyRef } from 'react';
import styled from 'styled-components/macro';
import SignatureCanvas from 'react-signature-canvas';
import { FlexDiv } from '../FlexDiv';
import { CustomText } from '../CustomText';
import { ReactComponent as ReloadIcon } from 'app/assets/reload.svg';
import CustomButton from '../CustomButton';
import { CustomDivider } from '../CustomDivider';
import ReactSignatureCanvas from 'react-signature-canvas';

interface Props {}

export const CustomSignaturePad = memo((props: Props) => {
  const signatureRef = React.useRef() as React.MutableRefObject<any>;

  return (
    <Div>
      <FlexDiv
        width="100%"
        backgroundColor="transparent"
        justifyContent="space-between"
        margin="20px 0px"
      >
        <CustomText
          elementName="p"
          fontSize="16px"
          fontWeight={400}
          color="#8F8D86"
        >
          Signature*
        </CustomText>
        <ReloadIcon />
      </FlexDiv>
      <FlexDiv
        flexDirection="column"
        width="100%"
        padding="10px"
        borderRadius="12px"
      >
        <SignatureCanvas
          penColor="black"
          ref={signatureRef}
          canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
          backgroundColor="rgb(255 255 255)"
        />
        <CustomDivider margin="10px" color="#D6D6D5" height="1px" />
        <CustomText
          elementName="p"
          color="#8F8D86"
          fontSize="12px"
          fontWeight={400}
        >
          Your Signature
        </CustomText>
      </FlexDiv>

      <FlexDiv
        width="100%"
        backgroundColor="transparent"
        justifyContent="space-between"
        margin="20px 0px"
      >
        <CustomButton
          backgroundColor="transparent"
          onClick={() => signatureRef.current.clear()}
        >
          <CustomText
            elementName="p"
            fontSize="14px"
            fontWeight={700}
            color="#4EA0B1"
          >
            CANCEL
          </CustomText>
        </CustomButton>

        <CustomButton
          backgroundColor="#4EA0B1"
          color="white"
          borderRadius="12px"
          width="120px"
          height="42px"
          onClick={() => {
            console.log(
              signatureRef.current.getTrimmedCanvas().toDataURL('image/png'),
            );
          }}
        >
          <CustomText
            elementName="p"
            color="white"
            fontSize="14px"
            fontWeight={700}
          >
            SAVE
          </CustomText>
        </CustomButton>
      </FlexDiv>
    </Div>
  );
});

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
