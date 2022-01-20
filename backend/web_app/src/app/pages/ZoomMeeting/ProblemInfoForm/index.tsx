/**
 *
 * ProblemInfoForm
 *
 */
import CustomButton from 'app/components/CustomButton';
import CustomCheckbox from 'app/components/CustomCheckbox';
import { CustomDivider } from 'app/components/CustomDivider';
import { CustomInput } from 'app/components/CustomInput';
import { CustomSelect } from 'app/components/CustomSelect';
import { CustomSignaturePad } from 'app/components/CustomSignaturePad';
import { CustomText } from 'app/components/CustomText';
import { FlexDiv } from 'app/components/FlexDiv';
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {}

export function ProblemInfoForm(props: Props) {
  const formTextStyle: {
    fontSize: string;
    color: string;
    fontWeight: number;
    elementName: 'p';
  } = {
    elementName: 'p',
    fontWeight: 500,
    fontSize: '14px',
    color: '#19343A',
  };
  return (
    <Div>
      <FlexDiv height="65px" backgroundColor="#E5E5E5">
        <CustomText
          elementName="h3"
          color="#2D3142"
          fontWeight={600}
          fontSize="24px"
        >
          Information about Problem
        </CustomText>
      </FlexDiv>
      <FlexDiv
        // backgroundColor="orange"
        height="75vh"
        alignItems="flex-start"
        justifyContent="flex-start"
        padding="10px"
        flexDirection="column"
      >
        <FlexDiv
          flexDirection="column"
          width="100%"
          padding="10px 10px"
          alignItems="flex-start"
          rowGap="12px"
        >
          <CustomText {...formTextStyle}>Choose Protocol Type</CustomText>
          <CustomSelect
            options={[
              { value: 'Social Media', label: 'Social Media' },
              { value: 'Friend', label: 'Friend' },
              { value: 'Email', label: 'Email' },
              { value: 'TV', label: 'TV' },
              { value: 'Other', label: 'Other' },
            ]}
            placeholder="-Select from below"
            // value={values.hearAboutUs}
            onChange={value => {
              // formik.setFieldValue('hearAboutUs', value);
            }}
            name="hearAboutUs"
            id="hearAboutUs"
            isWhiteBackground={true}
          />
        </FlexDiv>
        <FlexDiv
          width="100%"
          height="90%"
          padding="10px 10px"
          alignItems="flex-start"
          justifyContent="flex-start"
          overflow="hidden"
        >
          <FlexDiv
            flexDirection="column"
            width="100%"
            height="100%"
            padding="20px 15px"
            alignItems="flex-start"
            justifyContent="flex-start"
            rowGap="12px"
            backgroundColor="#E6EAEE"
            borderRadius="12px"
            overflow="hidden"
            overflowY={'scroll'}
          >
            <CustomInput
              placeholder="Mothers Name"
              name="mothersName"
              id="mothersName"
            />
            <FlexDiv
              minHeight="50px"
              backgroundColor="transparent"
              justifyContent="space-between"
              width="100%"
            >
              <CustomInput placeholder="Age" name="age" id="age" width="48%" />
              <CustomInput
                placeholder="Para"
                name="para"
                id="para"
                width="48%"
              />
            </FlexDiv>
            <CustomInput
              placeholder="Infant's Name"
              name="infantName"
              id="infantName"
            />
            <CustomInput
              placeholder="Infant's Age"
              name="infantAge"
              id="infantAge"
              width="48%"
            />
            <CustomText {...formTextStyle}>Gestion</CustomText>
            <FlexDiv
              columnGap="24px"
              flexWrap="wrap"
              minHeight="30px"
              backgroundColor="transparent"
            >
              <CustomCheckbox text="38-41" />
              <CustomCheckbox text=">41" />
              <CustomCheckbox text="35-38" />
              <CustomCheckbox text="<35" />
            </FlexDiv>
            <CustomText {...formTextStyle}>Support Person Name</CustomText>
            <FlexDiv
              columnGap="24px"
              flexWrap="wrap"
              minHeight="30px"
              backgroundColor="transparent"
            >
              <CustomCheckbox text="Yes" />
              <CustomCheckbox text="No" />
            </FlexDiv>
            <CustomInput
              placeholder="Support Person Name"
              name="supportPersonName"
              id="supportPersonName"
            />
            <CustomText {...formTextStyle}>Relationship</CustomText>
            <FlexDiv
              columnGap="24px"
              flexWrap="wrap"
              minHeight="60px"
              backgroundColor="transparent"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <CustomCheckbox text="Significant Other" />
              <CustomCheckbox text="Client’s Mother" />
              <CustomCheckbox text="Client’s Female Relative" />
              <CustomCheckbox text="Friend" />
            </FlexDiv>
            <CustomInput
              placeholder="Others"
              width="60%"
              name="others"
              id="others"
            />
            <CustomDivider margin="10px" isDashed={true} color="#D6D6D5" />
            <CustomText
              elementName="p"
              color="#2D3142"
              fontSize="20px"
              fontWeight={700}
            >
              Breastfeeding History & Plan
            </CustomText>

            <CustomText {...formTextStyle}>
              Previous Breastfeeding Experience
            </CustomText>
            <FlexDiv
              columnGap="24px"
              flexWrap="wrap"
              minHeight="30px"
              backgroundColor="transparent"
            >
              <CustomCheckbox text="Yes" />
              <CustomCheckbox text="No" />
            </FlexDiv>
            <FlexDiv
              minHeight="60px"
              width="100%"
              justifyContent="flex-start"
              backgroundColor="transparent"
              columnGap="10px"
            >
              <CustomInput
                placeholder="Duration"
                name="duration"
                id="duration"
                width="50%"
              />
              <CustomText {...formTextStyle}>/ Duration</CustomText>
            </FlexDiv>
            <CustomText {...formTextStyle}>Met Goal</CustomText>
            <FlexDiv
              columnGap="24px"
              flexWrap="wrap"
              minHeight="30px"
              backgroundColor="transparent"
            >
              <CustomCheckbox text="Yes" />
              <CustomCheckbox text="No" />
            </FlexDiv>
            <CustomDivider margin="10px" isDashed={true} color="#D6D6D5" />
            <CustomSignaturePad />
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv
        flexDirection="column"
        padding="2px"
        position="fixed"
        bottom="0px"
        width="25%"
        rowGap="20px"
        height="10vh"
      >
        <CustomButton height="50px" width="70%" borderRadius="12px">
          <CustomText
            elementName="p"
            fontSize="16px"
            fontWeight={600}
            color="white"
          >
            DONE
          </CustomText>
        </CustomButton>
      </FlexDiv>
    </Div>
  );
}

const Div = styled.div`
  background-color: red;
  height: 90vh;
  width: 25%;
`;
