/**
 *
 * ScrollView
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {
  children: React.ReactNode;
}

export const ScrollView = memo(({ children }: Props) => {
  return <Div>{children}</Div>;
});

const Div = styled.div`
  height: 100%;
  overflow-y: auto;
`;
