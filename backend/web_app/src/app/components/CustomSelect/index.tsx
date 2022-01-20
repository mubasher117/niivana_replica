/**
 *
 * CustomSelect
 *
 */
import React, { memo } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import Select, { StylesConfig } from 'react-select';

// import  from '@material-ui/styles';

interface Props {
  placeholder?: string;
  options: any[];
  name: string;
  value?: any;
  onChange?: (value?: any) => void;
  id?: string;
  isMulti?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isWhiteBackground?: boolean;
}

export const CustomSelect = memo(
  ({
    placeholder,
    options,
    onChange,
    onBlur,
    value,
    name,
    id,
    isMulti = false,
    isWhiteBackground,
  }: Props) => {
    const theme = useTheme();

    const colourStyles = {
      container: styles => ({
        ...styles,
        width: '100%',
      }),
      control: styles => {
        return {
          ...styles,
          width: '100%',
          backgroundColor: isWhiteBackground ? 'white' : '#FAFAFA',
          height: '2.75rem',
          borderRadius: '12px',
          boxShadow: 'inset 0px 1px 1px rgba(16, 32, 89, 0.12);',
          '&:foucs': {
            ...styles['&:foucs'],
            border: '0.5px solid #DB8057',
            boxShadow: 'inset 0px 1px 1px rgba(16, 32, 89, 0.12)',
            backgroundColor: '#FCF7EF',
          },
          '&:foucs-within': {
            ...styles['&:foucs-within'],
            border: '0.5px solid #DB8057',
            boxShadow: 'inset 0px 1px 1px rgba(16, 32, 89, 0.12)',
            backgroundColor: '#FCF7EF',
          },
          '&:hover': {
            ...styles['&:hover'],
            border: '0.5px solid #DB8057',
            boxShadow: 'inset 0px 1px 1px rgba(16, 32, 89, 0.12)',
            backgroundColor: '#FCF7EF',
          },
          '&:visited': {
            ...styles['&:visited'],
            border: '0.5px solid #DB8057',
            boxShadow: 'inset 0px 1px 1px rgba(16, 32, 89, 0.12)',
            backgroundColor: '#FCF7EF',
          },
        };
      },
      placeholder: styles => ({
        ...styles,
        color: '#8F8D86',
        fontSize: '16px',
        fontWeight: 300,
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = theme.primary;
        return {
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected || isFocused
            ? color
            : undefined,
          color: isDisabled
            ? '#ccc'
            : isSelected || isFocused
            ? 'white'
            : 'black',
          cursor: isDisabled ? 'not-allowed' : 'default',

          ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled
              ? isSelected
                ? data.color
                : color
              : undefined,
          },
        };
      },
      // input: styles => ({ ...styles, ...dot() }),
      // placeholder: styles => ({ ...styles, ...dot('#ccc') }),
      // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };
    const handleChange = (option: any) => {
      if (option.value) {
        //@ts-ignore
        onChange(option.value);
      }
    };
    const getValue = () => {
      if (options) {
        return options.find(option => option.value === value);
      } else {
        return isMulti ? [] : ('' as any);
      }
    };
    return (
      <Select
        options={options}
        placeholder={placeholder}
        // menuIsOpen={true}
        styles={colourStyles}
        onChange={handleChange}
        onBlur={onBlur}
        name={name}
        id={id}
        value={getValue()}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    );
  },
);
