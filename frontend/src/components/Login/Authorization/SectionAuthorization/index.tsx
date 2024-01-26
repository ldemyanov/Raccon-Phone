import { FC } from 'react';
import { Input, InputPlaceholders } from '@components/UI/Input';
import { setImg, setName } from '@src/redux/reducers/authorizationReducer';
import reload from '@assets/images/reload.svg';
import { useAppSelector, useAppDispatch } from '@src/redux/store';
import { icons } from '@src/utils/icon';
import styles from './styles.module.css';

export const SectionAuthorization: FC = () => {
  const dispatch = useAppDispatch();
  const { name, icon } = useAppSelector((state) => state.auth);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const changeIcon = () => {
    dispatch(setImg(Math.floor(Math.random() * icons.length)));
  };

  return (
    <section className={styles.section_authorization}>
      <div className={styles.wrapper_icon}>
        <img src={icon} alt="Player Icon" />
        <button className={styles.button_reload} onClick={changeIcon}>
          <img src={reload} alt="reload" />
        </button>
      </div>
      <Input placeholder={InputPlaceholders.name} onChange={changeName} value={name} auth={true} />
    </section>
  );
};
