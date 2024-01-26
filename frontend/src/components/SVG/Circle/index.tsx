import { FC } from 'react';

import styles from './styles.module.css';

export const CircleSVG: FC = () => {
  return (
    <svg className={styles.circleSvg} viewBox="0 0 59 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.5 51C41.3742 51 51 41.3742 51 29.5C51 17.6259 41.3742 8 29.5 8C17.6259 8 8 17.6259 8 29.5C8 41.3742 17.6259 51 29.5 51Z"
        stroke="#FCFFFD"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
