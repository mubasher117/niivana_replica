import styled from 'styled-components/macro';

const PageBackground = styled.div<{
  backgroundColor?: string;
  alignItems?: string;
  justifyContent?: string;
}>`
  background: ${p => p.backgroundColor ?? p.theme.primary};
  align-items: ${p => p.alignItems ?? 'center'};
  justify-content: ${p => p.justifyContent ?? 'center'};
  width: 100%;
  height: 100%;
  display: flex;
`;
export default PageBackground;
