import React from "react";
import styles from './IconButton.module.scss';

function IconButton(props) {
  return (
    <button type={props.type}
            onClick={props.onClick}
            className={styles.IconButton}>{props.icon}</button>
  )
}

export default IconButton;