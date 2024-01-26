import { FC } from 'react';
import styles from './styles.module.css';

export const SoundOff: FC = () => {
  return (
    <svg className={styles.sound_off} viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M34.3826 14.2292H19.4379C15.8125 14.2292 12.8735 17.1682 12.8735 20.7936V35.7383C12.8735 39.3637 15.8125 42.3026 19.4379 42.3026H34.3826C38.008 42.3026 40.9469 39.3637 40.9469 35.7383V20.7936C40.9469 17.1682 38.008 14.2292 34.3826 14.2292Z"
        fill="#351D5D"
      />
      <path d="M22.0244 23.2055L42.9859 3V54L22.0244 33.0385V23.2055Z" fill="#351D5D" />
      <path
        d="M3 3.07678L53.8461 53.9229"
        stroke="#F9C22E"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
