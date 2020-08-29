import React from "react";
import styles from './FormGroup.module.scss';

function FormGroup(props) {
  return (
    <div className={styles.FormGroup}>
      {props.children}
    </div>
  )
}

export default FormGroup;