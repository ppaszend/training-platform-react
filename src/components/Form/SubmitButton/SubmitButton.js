import React from "react";
import styles from './SubmitButton.module.scss';

function SubmitButton(props) {
  return (
    <button type="submit"
            className={styles.SubmitButton}>
      {props.children}
    </button>
  )
}

export default SubmitButton;