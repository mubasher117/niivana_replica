/**
 *
 * FlexDiv
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { OverflowProps, layout } from 'styled-system';

interface Props {
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  innerRef?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
}
interface StyledProps extends OverflowProps {
  flexDirection?: 'row' | 'column';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  margin: string;
  padding: string;
  backgroundColor: string;
  borderRadius: string;
  minWidth: string;
  columnGap: string;
  rowGap: string;
  cursor: string;
  height: string;
  overflow: string;
  flexWrap: string;
  width: string;
  color: string;
  maxWidth: string;
  display: string;
  gridTemplateColumns: string;
  flexGrow: string | number;
  minHeight: string;
  position: string;
  bottom: string;
  border: string;
}

export function FlexDiv({
  children,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onClick = () => {},
  innerRef,
  ...props
}: Props & Partial<StyledProps>) {
  return (
    <Div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={innerRef}
      {...props}
    >
      {children}
    </Div>
  );
}
const Div = styled.div<Partial<StyledProps>>`
  display: ${props => props.display || 'flex'};
  grid-template-columns: ${props =>
    props.gridTemplateColumns && props.display === 'grid'
      ? props.gridTemplateColumns
      : '1'};
  flex-direction: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: ${props => props.alignItems || 'center'};
  padding: ${props => props.padding || '0px'};
  margin: ${props => props.margin || '0px'};
  background-color: ${props => props.backgroundColor || '#fff'};
  border-radius: ${props => props.borderRadius || '0px'};
  min-width: ${props => props.minWidth || '0px'};
  column-gap: ${props => props.columnGap || '0px'};
  row-gap: ${props => props.rowGap || '0px'};
  cursor: ${props => props.cursor || 'default'};
  height: ${props => props.height};
  overflow: ${props => props.overflow};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  width: ${props => props.width};
  color: ${props => props.color || '#000'};
  max-width: ${props => props.maxWidth || '100%'};
  flex-grow: ${props => props.flexGrow};
  min-height: ${props => props.minHeight || '0px'};
  bottom: ${props => props.bottom};
  position: ${props => props.position};
  border: ${props => props.border};
  ${layout}
`;
