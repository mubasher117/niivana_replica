/**
 *
 * CustomDivider
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {
  margin: string;
  width: string;
  color: string;
  height: string;
  isDashed: boolean;
}

export const CustomDivider = memo((props: Partial<Props>) => {
  return <Hr {...props}></Hr>;
});

const Hr = styled.hr<Partial<Props>>`
  border: none;
  height: ${props => props.height || '2px'};
  border-top: ${props =>
    props.isDashed ? `2px dotted ${props.color || '#000'}` : `0px`};

  margin: 0;
  flex-shrink: 0;
  background-color: ${props =>
    !props.isDashed ? props.color ?? '#D6D6D5' : 'transparent'};
  margin: ${props => props.margin};
  width: ${props => props.width || '95%'};
`;
