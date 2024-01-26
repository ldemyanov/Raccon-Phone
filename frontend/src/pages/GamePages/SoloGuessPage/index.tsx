import { ContentBorder } from '@components/UI/ContentBorder';
import { FC, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { checkStrsEqual } from '@src/utils/checkStrsEqual';
import greenTick from '@assets/images/green-tick.png';
import { Button } from '@components/UI/Button';
import { setSoloGame } from '@src/redux/reducers/lobbyReducer';
import { useNavigate } from 'react-router-dom';
import { routes } from '@src/routes';
import styles from './styles.module.css';

export const SoloResultsPage: FC = () => {
  const { icon, name } = useAppSelector((state) => state.auth);
  const { words } = useAppSelector((state) => state.game.game);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const LobbyPage = routes[1];

  const onClickHandler = () => {
    dispatch(setSoloGame(false));
    navigate(LobbyPage.path);
  };

  return (
    <ContentBorder>
      <div className={styles.container}>
        <div className={styles.content}>
          {words.map((w, i) => (
            <Fragment>
              <div className={`${styles.req} ${styles.appearNow}`}>
                <img className={styles.reqImg} src={w.img} alt="123" />
                <div className={styles.reqWord}>{w.word}</div>
              </div>
              <div className={`${styles.messageBlock} ${styles.appearNow}`}>
                <div className={styles.message}>
                  <h4 className={styles.name}>{name}</h4>
                  <div className={styles.text}>
                    {w.response}
                    {checkStrsEqual(w.response as string, w.word) && (
                      <img className={styles.greenTick} src={greenTick} alt="green tick" />
                    )}
                  </div>
                </div>
                <div className={styles.circle}>
                  <img className={styles.icon} src={icon} alt={`icon by ${name}`}></img>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className={styles.bottomRight}>
        <Button text="Return to Lobby" onClick={onClickHandler} />
      </div>
    </ContentBorder>
  );
};
