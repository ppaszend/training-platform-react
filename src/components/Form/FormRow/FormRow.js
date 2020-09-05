import React from "react";
import styles from './FormRow.module.scss';

function FormRow(props) {
  return (
    <div className={styles.FormRow}>{props.children}</div>
  )
}

export default FormRow;