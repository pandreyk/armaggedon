import { useState, useEffect } from 'react';
import { Button } from '../../components/button';
import styles from './destructionButton.module.scss';

export const DestructionButton = ({ data, isDistruction, setRemoved }) => {
  const [disabled, setDisabled] = useState(false);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    // Использую localStorage, что ломает всю систему ssr
    // Но для тестового задания это пойдет)
    setDisabled(
      JSON.parse(localStorage.getItem('destructionList'))?.filter(
        (i) => i.id === data.id,
      ).length,
    );
  }, []);

  const addToListDestruction = (e) => {
    e.preventDefault();

    if (!localStorage.getItem('destructionList')) {
      localStorage.setItem('destructionList', JSON.stringify([data]));
    } else {
      const destructionList = JSON.parse(
        localStorage.getItem('destructionList'),
      );
      localStorage.setItem(
        'destructionList',
        JSON.stringify([...destructionList, data]),
      );
    }
    setDisabled(true);
  };

  const destroy = (e) => {
    e.preventDefault();

    const deleteAnimAndCard = () => {
      setAnim(false);
      if (!localStorage.getItem('destroyedList')) {
        localStorage.setItem('destroyedList', JSON.stringify([data]));
      } else {
        const destroyedList = JSON.parse(localStorage.getItem('destroyedList'));
        localStorage.setItem(
          'destroyedList',
          JSON.stringify([...destroyedList, data]),
        );
      }
      const destructionList = JSON.parse(
        localStorage.getItem('destructionList'),
      );
      localStorage.setItem(
        'destructionList',
        JSON.stringify(destructionList.filter((i) => i.id !== data.id)),
      );
      setRemoved(true);
    };

    setAnim(true);
    setTimeout(deleteAnimAndCard, 6000);
  };

  return (
    <div id="anim" className={`${anim && styles.anim}`}>
      <Button
        title={
          isDistruction
            ? 'Уничтожить!'
            : disabled
            ? 'Уже в списке'
            : 'На уничтожение'
        }
        disabled={!isDistruction && disabled}
        onClick={isDistruction ? destroy : addToListDestruction}
      />

      <div className={`${styles.squad} ${anim && styles.anim}`}>
        <img src="./squad.jpg" />
      </div>

      <div className={`${styles.chris} ${anim && styles.anim}`}>
        <img src="./chris.jpg" />
        <span>Корбен, детка, спаси нас!</span>
      </div>
    </div>
  );
};
