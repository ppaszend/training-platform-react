import React from "react";
import styles from './LinkButton.module.scss';
import {Link} from "react-router-dom";

const colors = {
  green: 'Green',
  gray: 'Gray',
  dark: 'Dark',
  white: 'White'
}

function LinkButton(props) {
  return (
    <Link className={`${styles.LinkButton} ${styles[colors[props.color]]}`}
          to={props.to}>{props.children}</Link>
  )
}

export default LinkButton;