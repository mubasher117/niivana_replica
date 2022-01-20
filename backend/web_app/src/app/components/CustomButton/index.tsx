/**
 *
 * CustomButton
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { LoadingIndicator } from '../LoadingIndicator';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  styles?: React.CSSProperties;
  loadingIconColor?: string;
}
interface StyledProps {
  border: string;
  color: string;
  height: string;
  radius: string;
  width: string;
  backgroundColor: string;
  fontSize: string;
  fontWeight: string | number;
  float: string;
  borderRadius: string;
  padding: string;
  margin: string;
  textTransform: string;
  letterSpacing: string;
}

const CustomButton = ({
  onClick,
  children,
  disabled,
  isLoading,
  buttonType,
  styles,
  loadingIconColor = 'white',
  ...props
}: Props & Partial<StyledProps>) => {
  return (
    <TextButton
      onClick={onClick}
      type={buttonType}
      {...props}
      disabled={disabled}
      style={styles}
    >
      {children}
      {isLoading && (
        <CircularProgress
          style={{ color: loadingIconColor, marginLeft: 10 }}
          size={15}
        />
      )}
    </TextButton>
  );
};

const TextButton = styled.button<Partial<StyledProps>>`
  background: ${p => p.backgroundColor ?? p.theme.primary};
  padding: ${p => p.padding ?? '10px'};
  margin: ${p => p.margin ?? '0px'};
  border: ${p => p.border ?? '0px'};
  width: ${p => p.width};
  border-radius: ${p => p.borderRadius};
  height: ${p => p.height};
  color: ${p => (p.color ? p.color : 'white')};
  float: ${p => p.float};
  font-size: ${p => p.fontSize};
  font-weight: ${p => p.fontWeight};
  text-transform: ${p => p.textTransform};
  letter-spacing: ${p => p.letterSpacing};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;

export default CustomButton;
