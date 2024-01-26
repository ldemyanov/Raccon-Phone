import { FC } from 'react';
import styles from './styles.module.css';
import { RsShool } from '@components/SVG/RsShool';
import { GitHub } from '@components/SVG/GitHub';
import { GitHubs } from '@src/constants/GitHub';

export const Footer: FC = () => {
  return (
    <footer className={styles.wrapper}>
      <a className={styles.rs_school} href="https://rs.school/js/" target="_blank">
        <RsShool />
      </a>
      <div className={styles.year}>2023</div>
      <div className={styles.wrapper_git}>
        <GitHub />
        <div className={styles.line}></div>
        {GitHubs.map((el, index) => {
          return (
            <a key={index} href={el.path} target="_blank">
              {el.name}
            </a>
          );
        })}
      </div>
    </footer>
  );
};
