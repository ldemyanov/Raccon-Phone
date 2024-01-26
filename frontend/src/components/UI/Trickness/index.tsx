import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { setLineWidth } from '@src/redux/reducers/toolReducer';

import styles from './styles.module.css';

interface TriknessProps {
  isDisabled: boolean;
}

export const Trikness: FC<TriknessProps> = ({ isDisabled }) => {
  const dispatch = useAppDispatch();
  const { triknesses, currentTrikness } = useAppSelector((state) => state.tool);

  const wrapperStyles = [styles.wrapper];
  if (isDisabled) wrapperStyles.push(styles.disabled);

  return (
    <div className={wrapperStyles.join(' ')}>
      {triknesses.map((trikness) => {
        const triknessChangeHadler = (event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setLineWidth(event.target.value));
        };

        return (
          <label className={styles.label} key={trikness}>
            <input
              className={styles.radio}
              type="radio"
              name="trikness"
              value={trikness}
              checked={trikness === currentTrikness}
              onChange={triknessChangeHadler}
              disabled={isDisabled}
            />
            <span className={styles.filler} style={{ width: trikness, height: trikness }} />
          </label>
        );
      })}
    </div>
  );
};
