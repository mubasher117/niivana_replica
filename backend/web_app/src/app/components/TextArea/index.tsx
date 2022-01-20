import Styled from 'styled-components/macro';

export const Textarea = Styled.textarea`
  background:white;
  color: #19343A;
  max-height: 260px;
  overflow: auto;
  resize: none;
  width: 100%;
  min-height:50px;

  &::placeholder {
    color:#9B9B9B
  }

  &:focus {
    outline: none;
  }
`;
