import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexDiv } from '../FlexDiv';
import { ReactComponent as CheckRoundedIcon } from 'app/assets/checkedIcon.svg';
import { CustomText } from '../CustomText';

interface Props {
  text?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<Partial<Props>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 6px;
  transition: all 150ms;
  cursor: pointer;
  border: ${props => `1px solid ${props.theme.primary}`};
`;

const CustomCheckbox = ({ text }: Props) => {
  const [checked, setChecked] = useState(false);
  console.log(
    '🚀 ~ file: index.tsx ~ line 52 ~ CustomCheckbox ~ checked',
    checked,
  );
  return (
    <FlexDiv
      cursor="pointer"
      onClick={() => setChecked(!checked)}
      backgroundColor="transparent"
    >
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} />
        <StyledCheckbox checked={checked}>
          {checked && (
            <CheckRoundedIcon style={{ fontSize: 17, color: '#DB8057' }} />
          )}
        </StyledCheckbox>
      </CheckboxContainer>
      <CustomText
        elementName="span"
        color="#8F8D86"
        fontSize="16px"
        fontWeight={300}
        margin="0px 0px 0px 8px"
      >
        {text}
      </CustomText>
    </FlexDiv>
  );
};

export default CustomCheckbox;
