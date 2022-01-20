import React from 'react';
interface Props {
  color: string;
}
const Document = ({ color = '#19343A' }: Partial<Props>) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.7161 14.2234H5.49609"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7161 10.0369H5.49609"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25109 5.86011H5.49609"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.908 0.749756C12.908 0.749756 5.231 0.753756 5.219 0.753756C2.459 0.770756 0.75 2.58676 0.75 5.35676V14.5528C0.75 17.3368 2.472 19.1598 5.256 19.1598C5.256 19.1598 12.932 19.1568 12.945 19.1568C15.705 19.1398 17.415 17.3228 17.415 14.5528V5.35676C17.415 2.57276 15.692 0.749756 12.908 0.749756Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Document;
