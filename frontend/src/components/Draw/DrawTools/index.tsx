import { FC } from 'react';
import { drawToolsArray } from '@src/constants/DrawTools';
import { DrawToolButton } from '@components/UI/DrawToolButton';

import styles from './styles.module.css';

export const DrawTools: FC = () => {
  return (
    <div className={styles.wrapper}>
      {drawToolsArray.map((DrowTool, index) => {
        return (
          <DrawToolButton key={index}>
            <DrowTool />
          </DrawToolButton>
        );
      })}
    </div>
  );
};