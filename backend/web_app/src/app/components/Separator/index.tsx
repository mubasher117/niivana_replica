/**
 *
 * Separator
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  text?: string;
}

export default function Separator({ text }: Props) {
  return <Div>{text}</Div>;
}

const Div = styled.div`
  /* display: flex;
  align-items: center;
  text-align: center;

  &:before,
  &:after {
    content: '';
    flex: 1;
    border-bottom: 1px solid red;
  }

  &not(:empty)::before {
    margin-right: 0.25em;
  }

  &not(:empty)::after {
    margin-left: 0.25em;
  } */
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: ${p => p.theme.primary};

  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    background: ${p => p.theme.primary};
    height: 1px;
    font-size: 0;
    line-height: 0;
    margin: 0 15px;
  }
`;
