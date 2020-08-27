import React from "react";
import styles from './CheckboxField.module.scss';

function CheckboxField(props) {
  return (
    <label className={styles.CheckboxWrapper}>
      <input type="checkbox" className={styles.Input} required={props.required} />
      <div className={styles.CheckboxControl} />
      <span className={styles.Label}>{props.children}</span>
    </label>
  )
}

export default CheckboxField;