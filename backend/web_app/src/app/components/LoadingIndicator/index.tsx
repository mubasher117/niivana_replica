import * as React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { CustomText } from '../CustomText';

interface Props extends SvgProps {}
interface LoadingIndicatorPageProps {
  loadingText?: string;
}
interface LoadingIndicatorPageStyledProps {
  height: string;
  width: string;
  alignItems: string;
  justifyContent: string;
  rowGap: string;
}
export const LoadingIndicator = (props: Props) => (
  <Svg viewBox="-24 -24 48 48" small={props.small}>
    <Circle cx="0" cy="0" r="20" fill="none" strokeWidth="4"></Circle>
  </Svg>
);
export const LoadingIndicatorPage = ({
  loadingText,
  ...styledProps
}: LoadingIndicatorPageProps & Partial<LoadingIndicatorPageStyledProps>) => (
  <LoadingWrapper {...styledProps}>
    <LoadingIndicator />
    {loadingText && <CustomText elementName="p">{loadingText}</CustomText>}
  </LoadingWrapper>
);

const speed = 1.5;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const LoadingWrapper = styled.div<Partial<LoadingIndicatorPageStyledProps>>`
  display: flex;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100vh'};
  align-items: ${props => props.alignItems || 'center'};
  justify-content: ${props => props.justifyContent || 'center'};
  row-gap: ${props => props.rowGap || '20px'};
  flex-direction: column;
`;
const dash = keyframes`
  0% {
    stroke-dasharray: 0, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 150;
    stroke-dashoffset: -24;
  }
  100% {
    stroke-dasharray: 0, 150;
    stroke-dashoffset: -124;
  }
`;

interface SvgProps {
  small?: boolean;
}
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Svg = styled.svg<SvgProps>`
  animation: ${rotate} ${speed * 1.75}s linear infinite;
  height: ${p => (p.small ? '1.25rem' : '3rem')};
  width: ${p => (p.small ? '1.25rem' : '3rem')};
  transform-origin: center;
`;

const Circle = styled.circle`
  animation: ${dash} ${speed}s ease-in-out infinite;
  stroke: ${p => p.theme.primary};
  strokelinecap: round;
`;
