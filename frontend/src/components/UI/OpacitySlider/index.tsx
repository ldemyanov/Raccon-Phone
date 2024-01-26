import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { setOpacity } from '@src/redux/reducers/toolReducer';
import getDecimalFromHex from '@src/helpers/getDecimalFromHex';
import getHexFromDecimal from '@src/helpers/getHexFromDecimal';

import styles from './styles.module.css';

interface OpacitySliderProps {
  isDisabled: boolean;
}

export const OpacitySlider: FC<OpacitySliderProps> = ({ isDisabled }) => {
  const dispatch = useAppDispatch();
  const { opacity } = useAppSelector((state) => state.tool);
  const labelStyle = [styles.label];
  if (isDisabled) labelStyle.push(styles.disabled);
  const opacityChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setOpacity(getHexFromDecimal(Number(event.target.value))));
  };

  return (
    <label className={labelStyle.join(' ')}>
      <span className={styles.circle} />
      <input
        className={styles.slider}
        type="range"
        name="opacity"
        id="opacitySlider"
        min="25"
        max="255"
        value={getDecimalFromHex(opacity)}
        onChange={opacityChangeHandler}
        disabled={isDisabled}
      />
      <span className={styles.circle_fill} />
    </label>
  );
};
