import { FC, useState } from 'react';
import { SoundOn } from '@components/SVG/Sound/SoundOn';
import { SoundVolume2 } from '@components/SVG/Sound/SoundVolume2';
import { SoundVolume1 } from '@components/SVG/Sound/SoundVolume1';
import { SoundOff } from '@components/SVG/Sound/SoundOff';
import Audio from '@assets/audio/audio.mp3';

import styles from './styles.module.css';

export const Sound: FC = () => {
  const soundIcons = [<SoundOn />, <SoundVolume2 />, <SoundVolume1 />, <SoundOff />];
  const volumes = [100, 65, 35, 0];
  const [indexIcon, setIndexIcon] = useState(3);
  const changeVolume = (event: React.MouseEvent<HTMLDivElement>) => {
    const volumeIndex = indexIcon === 3 ? 0 : indexIcon + 1;
    setIndexIcon(volumeIndex);
    const Audio = event.currentTarget.children[0] as HTMLAudioElement;
    volumeIndex === 0 && Audio?.play();
    volumeIndex === 3 && Audio?.pause();
    Audio.volume = volumes[volumeIndex] / 100;
  };

  return (
    <div className={styles.sound} onClick={(event) => changeVolume(event)}>
      <audio src={Audio} loop id="audio"></audio>
      {soundIcons[indexIcon]}
    </div>
  );
};
