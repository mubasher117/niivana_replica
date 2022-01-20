import React from 'react';
interface Props {
  color: string;
}
const LiveGroups = ({ color = '#19343A' }: Partial<Props>) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00429 0C5.07027 0 2.69177 2.38864 2.69177 5.33517C2.69177 8.28171 5.07027 10.6703 8.00429 10.6703C10.9383 10.6703 13.3168 8.28171 13.3168 5.33517C13.3168 2.38864 10.9383 0 8.00429 0ZM8.00429 1.44767C10.1422 1.44767 11.8753 3.18816 11.8753 5.33517C11.8753 7.48218 10.1422 9.22268 8.00429 9.22268C5.8664 9.22268 4.1333 7.48218 4.1333 5.33517C4.1333 3.18816 5.8664 1.44767 8.00429 1.44767ZM5.83005 12.8209C5.05233 12.8749 4.26621 12.9859 3.4908 13.1521C1.99418 13.4604 0.796853 14.0763 0.287239 15.0999C0.0950274 15.5002 -0.00161033 15.9288 2.0295e-05 16.3627C-0.000556342 16.7935 0.095299 17.2227 0.280618 17.6153C0.769943 18.6271 1.8278 19.1997 3.25624 19.5171L3.51213 19.5705C4.26648 19.7407 5.05284 19.8553 5.84446 19.909C5.91189 19.9288 6.07258 19.9472 6.24796 19.9561L6.39222 19.9615C6.46639 19.9633 6.55058 19.9637 6.67601 19.9637C7.81385 20.0263 8.99342 20.0081 10.1675 19.9081C10.7932 19.8653 11.4231 19.7835 12.0477 19.6636L12.5151 19.5666C14.0576 19.2623 15.2126 18.6836 15.7186 17.6164C16.0937 16.8241 16.0937 15.9047 15.7188 15.1127C15.214 14.0483 14.0737 13.4744 12.5034 13.1509C11.8873 13.0194 11.2612 12.922 10.6307 12.8599L10.1697 12.8209C8.72593 12.6935 7.27382 12.6935 5.83005 12.8209ZM10.0436 14.263L10.0562 14.264C10.7799 14.3149 11.4991 14.4165 12.2087 14.568C13.3751 14.8083 14.1667 15.2067 14.4171 15.7348C14.6057 16.133 14.6057 16.5958 14.4169 16.9944C14.1829 17.4879 13.472 17.8691 12.4445 18.1021L12.2195 18.1498C11.496 18.3112 10.7791 18.4152 10.0576 18.4647C8.93793 18.5599 7.82495 18.5771 6.71477 18.5171L6.32116 18.5103C6.2119 18.5048 6.11981 18.4942 6.03447 18.4771C5.35872 18.4261 4.75066 18.3454 4.16027 18.2283L3.80775 18.1537C2.63771 17.9244 1.83915 17.5243 1.58024 16.989C1.48964 16.797 1.44125 16.5803 1.44154 16.3609C1.44073 16.1428 1.48848 15.931 1.58118 15.7379C1.83293 15.2324 2.67919 14.7971 3.78606 14.569C4.50073 14.4159 5.21962 14.3144 5.94294 14.264C7.31603 14.143 8.68372 14.143 10.0436 14.263Z"
        fill={color}
      />
    </svg>
  );
};

export default LiveGroups;
