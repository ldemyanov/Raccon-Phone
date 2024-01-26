import { FC } from 'react';
import styles from './styles.module.css';

interface PaintedImgProps {
  image: string;
}

export const PaintedImg: FC<PaintedImgProps> = ({ image }) => {
  return <div className={styles.paintedImage} style={{ backgroundImage: `url(${image})` }} />;
};
