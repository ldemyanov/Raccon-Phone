import { FC } from 'react';
import { imagesRules, namesRules, textsRules } from '@src/constants/Rules';

import styles from './styles.module.css';

interface Props {
  activeButtonRules: number;
}

export const SectionRules: FC<Props> = ({ activeButtonRules }) => {
  const ruleImage = { backgroundImage: `url(${imagesRules[activeButtonRules - 1]})` };

  return (
    <section className={styles.wrapper_rules}>
      <div style={ruleImage} className={styles.image_rules} />
      <h4 className={styles.name_rules}>{namesRules[activeButtonRules - 1]}</h4>
      <p className={styles.text_rules}>{textsRules[activeButtonRules - 1]}</p>
    </section>
  );
};
