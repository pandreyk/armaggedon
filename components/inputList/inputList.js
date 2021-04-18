import { useState } from 'react';
import styles from './inputList.module.scss';

export const InputList = ({ title, data, selectedKey, value, onChange }) => {
  // const [inputValue, setInputValue] = useState(initialValue);

  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <div className={styles.inputList}>
      <span>{title}:</span>

      <input type="text" list="data" value={value} onChange={onChange} />
      <datalist id="data">
        {data.map((item, key) => (
          <option key={key} value={item[selectedKey]} />
        ))}
      </datalist>
    </div>
  );
};
