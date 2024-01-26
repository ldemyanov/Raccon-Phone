import { FooterAuthorization } from '@components/Login/Authorization/FooterAuthorization';
import { HeaderAuthorization } from '@components/Login/Authorization/HeaderAuthorization';
import { SectionAuthorization } from '@components/Login/Authorization/SectionAuthorization';
import { FooterRules } from '@components/Login/Rules/FooterRules';
import { HeaderRules } from '@components/Login/Rules/HeaderRules';
import { SectionRules } from '@components/Login/Rules/SectionRules';
import { Container } from '@components/UI/Container';
import { ContentBorder } from '@components/UI/ContentBorder';
import { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './style.module.css';

export const LoginPage: FC = () => {
  const [activeButtonRules, setActiveButtonRules] = useState(1);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') ?? '';

  useEffect(() => {
    const delay = setTimeout(() => {
      if (activeButtonRules === 5) {
        setActiveButtonRules(1);
      } else {
        setActiveButtonRules(activeButtonRules + 1);
      }
    }, 4000);

    return () => {
      clearTimeout(delay);
    };
  }, [activeButtonRules]);

  return (
    <ContentBorder>
      <div className={styles.layout}>
        <Container>
          <HeaderAuthorization roomId={roomId} />
          <SectionAuthorization />
          <FooterAuthorization roomId={roomId} />
        </Container>
        <Container>
          <div className={styles.wrapper_rules}>
            <HeaderRules />
            <SectionRules activeButtonRules={activeButtonRules} />
            <FooterRules activeButtonRules={activeButtonRules} setActiveButtonRules={setActiveButtonRules} />
          </div>
        </Container>
      </div>
    </ContentBorder>
  );
};
