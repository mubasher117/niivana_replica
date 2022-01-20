/**
 *
 * TextWithTwoColors
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { CustomText } from '../CustomText';

interface StyleProps {
  istColor: string;
  secondColor: string;
  istText: string;
  istFontSize: string;
  istFontFamily: string;
  secondFontSize: string;
  istFontWeight: string | number;
  secondFontWeight: string | number;
  columnGap: string;
  secondText: string;
  secondFontFamily: string;
  margin: string;
}
export const TextWithTwoColors = memo(
  ({
    istText,
    istFontSize,
    secondFontSize,
    secondColor,
    secondFontWeight,
    secondText,
    istFontWeight,
    istColor,
    istFontFamily,
    secondFontFamily,
    ...props
  }: Partial<StyleProps>) => {
    return (
      <Div {...props}>
        <CustomText
          elementName="p"
          fontSize={istFontSize}
          color={istColor}
          fontWeight={istFontWeight}
          fontFamily={istFontFamily}
        >
          {istText}
        </CustomText>
        <CustomText
          elementName="p"
          fontSize={secondFontSize}
          color={secondColor}
          fontWeight={secondFontWeight}
          fontFamily={secondFontFamily}
        >
          {secondText}
        </CustomText>
      </Div>
    );
  },
);

const Div = styled.div<Partial<StyleProps>>`
  display: flex;
  column-gap: ${p => p.columnGap ?? '6px'};
  margin: ${p => p.margin ?? '0px'};
`;
