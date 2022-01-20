/**
 *
 * CustomInput
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import './style.css';
interface Props {
  RightElem: React.ReactNode;
  LeftElem: React.ReactNode;
  inputType: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFoucs: boolean;
}
interface StyleProps {
  margin: string;
  borderRadius: string;
  border: string;
  boxShadow: string;
  width: string;
  backgroundColor: string;
  activeBorder: string;
  activeBackground: string;
  letterSpacing: string;
  fontSize: string;
  fontWeight: string;
  height: string;
  textAlign: string;
  placeholderFontSize: string;
  error?: boolean;
  placeholderLetterSpacing: string;
  placeholderLineHeight: string;
}
export const CustomInput = memo(
  ({
    RightElem,
    LeftElem,
    inputType = 'text',
    placeholder,
    name,
    value,
    onChange,
    onBlur,
    id,
    onKeyPress,
    autoFoucs = false,
    ...styleProps
  }: Partial<Props> & Partial<StyleProps>) => {
    return (
      <Div {...styleProps}>
        {RightElem && RightElem}
        <Input
          type={inputType}
          autoComplete="chrome-off"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          id="CustomInput"
          onKeyPress={onKeyPress}
          value={value}
          autoFocus={autoFoucs}
          // value={value}
          {...styleProps}
        />
        {LeftElem && LeftElem}
      </Div>
    );
  },
);
const Div = styled.div<Partial<StyleProps>>`
  color: ${p => p.theme.text};
  display: flex;
  align-items: center;
  color: ${p => p.theme.text};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;
  height: ${p => p.height || '2.75rem'};
  padding: 0 0.75rem;
  width: ${p => p.width || '100%'};
  margin: ${p => p.margin || '0px'};

  border-radius: ${p => p.borderRadius || '12px'};
  border: ${p =>
    p.error ? '0.5px solid #da352b' : p.border || '0.5px solid #E4E4E4;'};
  box-shadow: ${p =>
    p.boxShadow || 'inset 0px 1px 1px rgba(16, 32, 89, 0.12);'};
  background-color: ${p =>
    p.error ? 'rgba(218, 53, 43, 0.1)' : p.backgroundColor || '#FAFAFA;'};
  &:focus,
  &:focus-within {
    border: ${p =>
      p.error
        ? '0.5px solid #da352b'
        : p.activeBorder || '0.5px solid #DB8057;'};
    box-shadow: inset 0px 1px 1px rgba(16, 32, 89, 0.12);
    background-color: ${p =>
      p.error ? 'rgba(218, 53, 43, 0.1)' : p.activeBackground || '#FCF7EF'};
  }
`;

const Input = styled.input<Partial<StyleProps>>`
  border: none;
  border-radius: 4px;
  display: block;
  width: 100%;
  line-height: 1.5;
  color: ${p => p.theme.text};
  background-color: transparent;
  outline: none;
  height: 2.75rem;
  padding: 0;
  letter-spacing: ${p => p.letterSpacing || '0.5px'};
  font-size: ${p => p.fontSize || '12px'};
  font-weight: ${p => p.fontWeight || '500'};
  text-align: ${p => p.textAlign || 'left'};
  &::placeholder {
    font-weight: 300;
    color: ${p => p.theme.textSecondary};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
  &::placeholder,
  &::-webkit-input-placeholder {
    font-size: ${p => p.placeholderFontSize || '12px'};
    letter-spacing: ${p => p.placeholderLetterSpacing || '0.5px'};
    line-height: ${p => p.placeholderLineHeight || '1.5'};
  }

  &[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
`;
