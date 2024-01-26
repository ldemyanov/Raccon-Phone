import { FC } from 'react';
import TabletRings from '@assets/images/tabletRings.png';
import styles from './styles.module.css';
import { Canvas } from '@components/Draw/Canvas';
import { PaintedImg } from '@components/UI/PaintedImg';

export enum TabletTitles {
  draw = 'Draw a',
  guess = 'Guess what it is!',
}

interface TabletProps {
  title: string;
  image?: string;
}

export const Tablet: FC<TabletProps> = ({ title, image }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.tabletHeader}>
        <img className={styles.tablerRings} src={TabletRings} alt="Tablet rings" />
        <h2 className={styles.tabletTitle}>{title}</h2>
      </header>
      <div className={styles.drawingContainer}>{image ? <PaintedImg image={image} /> : <Canvas />}</div>
    </div>
  );
};
