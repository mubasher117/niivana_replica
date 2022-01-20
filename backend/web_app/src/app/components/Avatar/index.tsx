/**
 *
 * Avatar
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {
  nameLetters?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

export const Avatar = memo((props: Partial<Props>) => {
  return <Div>{props.nameLetters}</Div>;
});

const Div = styled.div<Partial<Props>>`
  background-color: ${props => props.backgroundColor || props.theme.primary};
  color: ${props => props.color || '#fff'};
  font-size: ${props => props.fontSize || '12px'};
  font-weight: ${props => props.fontWeight};
  border-radius: 50%;
  width: ${props => props.size || '30px'};
  height: ${props => props.size || '30px'};
  display: flex;
  justify-content: center;
  align-items: center;
`;
