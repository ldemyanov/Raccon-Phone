import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { setStrokeStyle } from '@src/redux/reducers/toolReducer';

import styles from './styles.module.css';

export const Pallete: FC = () => {
  const dispatch = useAppDispatch();
  const { colors, currentColor } = useAppSelector((state) => state.tool);
  const { isReady } = useAppSelector((state) => state.game);

  const inputColorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    dispatch(setStrokeStyle(event.target.value));
  };

  return (
    <div className={styles.wrapper}>
      {colors.map((color, index) => {
        const colorChangeHandler = () => {
          dispatch(setStrokeStyle(color));
        };

        return (
          <button
            className={styles.colorButton}
            style={{ background: color }}
            key={index}
            onClick={colorChangeHandler}
            disabled={isReady}
          />
        );
      })}
      <label className={styles.colorLabel}>
        <input
          className={styles.colorInput}
          type="color"
          value={currentColor}
          onChange={inputColorChangeHandler}
          name="palleteColor"
          id="palleteColorInput"
          disabled={isReady}
        />
      </label>
    </div>
  );
};
