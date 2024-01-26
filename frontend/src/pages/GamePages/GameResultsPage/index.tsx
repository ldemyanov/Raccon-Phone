import { FooterPlayers } from '@components/GameResults/Players/FooterPlayersGameResults';
import { HeaderAlbum } from '@components/GameResults/Album/HeaderAlbum';
import { SectionAlbum } from '@components/GameResults/Album/SectionAlbum';
import { HeaderPlayersGameResults } from '@components/GameResults/Players/HeaderPlayersGameResults';
import { SectionPlayersGameResults } from '@components/GameResults/Players/SectionPlayersGameResults';
import { Container } from '@components/UI/Container';
import { ContentBorder } from '@components/UI/ContentBorder';
import { FC, useState, useEffect } from 'react';
import { useAppSelector } from '@src/redux/store';
import { useNavigate } from 'react-router-dom';
import { routes } from '@src/routes';

import styles from './styles.module.css';

export const GameResultsPage: FC = () => {
  const { self, roomID } = useAppSelector((state) => state.lobby);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const [LoginPage] = routes;

    if (!roomID) navigate(LoginPage.path);
  }, []);

  return (
    <ContentBorder>
      <div className={styles.layout}>
        <Container size="small">
          <HeaderPlayersGameResults />
          <SectionPlayersGameResults />
          {self.main && <FooterPlayers isButtonDisabled={isButtonDisabled} />}
        </Container>
        <Container size="big">
          <HeaderAlbum />
          <SectionAlbum setIsButtonDisabled={setIsButtonDisabled} />
        </Container>
      </div>
    </ContentBorder>
  );
};
