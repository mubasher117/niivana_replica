import React from 'react';
interface Props {
  color: string;
}
const Education = ({ color = '#19343A' }: Partial<Props>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.25 16.4363L12 19.3895L6.75 16.4363V13.3163L5.25 12.4829V17.3136L12 21.1104L18.75 17.3136V12.4829L17.25 13.3163V16.4363Z"
        fill={color}
      />
      <path
        d="M12 2.15515L1.5 7.59959V8.89963L12 14.7328L21 9.73297V13.875H22.5V7.59959L12 2.15515ZM19.5 8.85036L18 9.68366L12 13.0172L6 9.68366L4.5 8.85036L3.46036 8.27277L12 3.84481L20.5396 8.27277L19.5 8.85036Z"
        fill={color}
      />
    </svg>
  );
};

export default Education;
