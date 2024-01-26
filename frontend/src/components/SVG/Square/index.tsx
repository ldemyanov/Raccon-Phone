import { FC } from 'react';

import styles from './styles.module.css';

export const SquareSVG: FC = () => {
  return (
    <svg className={styles.squareSvg} viewBox="0 0 59 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 13.5C8 10.4624 10.4065 8 13.375 8H45.625C48.5936 8 51 10.4624 51 13.5V46.5C51 49.5377 48.5936 52 45.625 52H13.375C10.4065 52 8 49.5377 8 46.5V13.5Z"
        stroke="#FCFFFD"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
