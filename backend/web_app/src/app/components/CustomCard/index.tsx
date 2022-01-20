/**
 *
 * CustomCard
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {
  children: React.ReactNode;
}
interface StyleProps {
  width: string;
  height: string;
  borderRadius: string;
  marginTop: string;
  minHeight: string;
  padding: string;
}

const CustomCard = memo(
  ({ children, ...props }: Props & Partial<StyleProps>) => {
    return <Div {...props}>{children}</Div>;
  },
);

const Div = styled.div<Partial<StyleProps>>`
  border-radius: ${p => p.borderRadius ?? '12px'};
  box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.24),
    0px 3px 8px -1px rgba(50, 50, 71, 0.05);
  background-color: white;
  width: ${p => p.width ?? '100%'};
  min-height: ${p => p.minHeight};
  height: ${p => p.height ?? '100%'};
  margin-top: ${p => p.marginTop ?? '0px'};
  padding: ${p => p.padding ?? '0px'};
`;
export default CustomCard;
