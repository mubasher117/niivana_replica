/**
 *
 * CustomText
 *
 */
import React, { memo } from 'react';
import styled, { ThemedBaseStyledInterface } from 'styled-components/macro';
import {
  OverflowProps,
  layout,
  TextStyleProps,
  textStyle,
  SpaceProps,
  space,
} from 'styled-system';

interface Props {
  elementName: 'p' | 'div' | 'span' | 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  style?: React.CSSProperties;
}
interface StyleProps extends TextStyleProps, OverflowProps, SpaceProps {
  color: string;
  fontSize: string;
  fontWeight: string | number;
  margin: string;
  lineHeight: string;
  textAlign: string;
  fontFamily: string;
  hoverColor: string;
  cursor: string;
  textTransform: string;
}
export const CustomText = ({
  elementName,
  children,
  style,
  ...props
}: Props & Partial<StyleProps>) => {
  if (elementName === 'p') {
    return (
      <P {...props} style={style}>
        {children}
      </P>
    );
  }
  if (elementName === 'div') {
    return (
      <Div {...props} style={style}>
        {children}
      </Div>
    );
  }
  if (elementName === 'h1') {
    return (
      <H1 {...props} style={style}>
        {children}
      </H1>
    );
  }
  if (elementName === 'h2') {
    return (
      <H2 {...props} style={style}>
        {children}
      </H2>
    );
  }
  if (elementName === 'h3') {
    return (
      <H3 {...props} style={style}>
        {children}
      </H3>
    );
  }

  return (
    <SPAN {...props} style={style}>
      {children}
    </SPAN>
  );
};
const styles = `
  color: ${p => p.color ?? p.theme.primary};
  font-size: ${p => p.fontSize ?? '12px'};
  font-weight: ${p => p.fontWeight ?? 400};
  padding: 0px;
  margin: ${p => p.margin ?? '0px'};
  line-height: ${p => p.lineHeight ?? 'normal'};
  text-align: ${p => p.textAlign ?? 'left'};
  font-family: ${p => p.fontFamily ?? p.theme.fontFamily};
  cursor: ${p => p.cursor ?? 'default'};
  text-transform: ${p => p.textTransform ?? 'none'};
  &:hover {
    color: ${p => p.hoverColor};
  }
  ${textStyle}
  ${space}
`;
const Div = styled.div<Partial<StyleProps>>`
  ${styles}
`;

const P = styled.p<Partial<StyleProps>>`
  color: ${p => p.color ?? p.theme.primary};
  font-size: ${p => p.fontSize ?? '12px'};
  font-weight: ${p => p.fontWeight ?? 400};
  padding: 0px;
  margin: ${p => p.margin ?? '0px'};
  line-height: ${p => p.lineHeight ?? 'normal'};
  text-align: ${p => p.textAlign};
  cursor: ${p => p.cursor ?? 'default'};
  font-family: ${p => p.fontFamily};
  text-transform: ${p => p.textTransform ?? 'none'};
  &:hover {
    color: ${p => p.hoverColor};
  }
  ${space}
`;
const H1 = styled.h1<Partial<StyleProps>>`
  color: ${p => p.color ?? p.theme.primary};
  font-size: ${p => p.fontSize ?? '32px'};
  font-weight: ${p => p.fontWeight || 700};
  padding: 0px;
  margin: ${p => p.margin ?? '0px'};
  line-height: ${p => p.lineHeight ?? 'normal'};
  text-align: ${p => p.textAlign};
  font-family: ${p => p.fontFamily};
  cursor: ${p => p.cursor ?? 'default'};
  text-transform: ${p => p.textTransform ?? 'none'};
  &:hover {
    color: ${p => p.hoverColor};
  }
  ${space}
`;
const H2 = styled.h2<Partial<StyleProps>>`
  color: ${p => p.color ?? p.theme.primary};
  font-size: ${p => p.fontSize ?? '24px'};
  font-weight: ${p => p.fontWeight || 700};
  padding: 0px;
  margin: ${p => p.margin ?? '0px'};
  line-height: ${p => p.lineHeight ?? 'normal'};
  text-align: ${p => p.textAlign};
  font-family: ${p => p.fontFamily};
  cursor: ${p => p.cursor ?? 'default'};
  text-transform: ${p => p.textTransform ?? 'none'};
  &:hover {
    color: ${p => p.hoverColor};
  }
  ${space}
`;
const H3 = styled.h3<Partial<StyleProps>>`
  color: ${p => p.color ?? p.theme.primary};
  font-size: ${p => p.fontSize ?? '18px'};
  font-weight: ${p => p.fontWeight || 700};
  padding: 0px;
  margin: ${p => p.margin ?? '0px'};
  line-height: ${p => p.lineHeight ?? 'normal'};
  text-align: ${p => p.textAlign};
  cursor: ${p => p.cursor ?? 'default'};
  font-family: ${p => p.fontFamily};
  text-transform: ${p => p.textTransform ?? 'none'};
  &:hover {
    color: ${p => p.hoverColor};
  }
  ${space}
`;
const SPAN = styled.span<Partial<StyleProps>>`
  color: ${p => p.color ?? p.theme.primary};
  font-size: ${p => p.fontSize ?? '16px'};
  font-weight: ${p => p.fontWeight ?? 400};
  padding: 0px;
  margin: ${p => p.margin ?? '0px'};
  line-height: ${p => p.lineHeight ?? 'normal'};
  text-align: ${p => p.textAlign};
  cursor: ${p => p.cursor ?? 'default'};
  font-family: ${p => p.fontFamily};
  text-transform: ${p => p.textTransform ?? 'none'};
  &:hover {
    color: ${p => p.hoverColor};
  }
  ${space}
`;
