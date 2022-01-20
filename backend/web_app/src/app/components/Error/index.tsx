/**
 *
 * Error
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import InfoIcon from '@material-ui/icons/Info';
interface Props {
  msg: string;
  addDefaultMarginBottom?: boolean;
}

export function Error({ msg, addDefaultMarginBottom }: Props) {
  return (
    <Div marginBottom={addDefaultMarginBottom ? '10px' : '0px'}>
      <InfoIcon fontSize="small" style={{ color: '#da352b' }} />
      {msg}
    </Div>
  );
}

const Div = styled.div<{ marginBottom?: string }>`
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: #da352b;
  font-size: 12px;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0px')};
`;
