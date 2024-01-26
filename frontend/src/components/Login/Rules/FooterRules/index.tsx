import { buttonsRules } from '@src/constants/Rules';
import { FC } from 'react';
import styles from './styles.module.css';

interface Props {
  activeButtonRules: number;
  setActiveButtonRules: React.Dispatch<React.SetStateAction<number>>;
}

export const FooterRules: FC<Props> = ({ activeButtonRules, setActiveButtonRules }) => {
  return (
    <footer className={styles.wrapper}>
      {buttonsRules.map((el, index) => (
        <button
          key={index}
          className={`${styles.button_rules} ${activeButtonRules === el && styles.active}`}
          onClick={() => {
            setActiveButtonRules(el);
          }}>
          {el}
        </button>
      ))}
    </footer>
  );
};
