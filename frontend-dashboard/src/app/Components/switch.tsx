import React from "react";
import styles from "../modal/article/article.module.css";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={handleChange}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switch;
