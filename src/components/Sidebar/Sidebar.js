import React from "react";
import styles from './Sidebar.module.scss';
import { Close } from "@material-ui/icons";

const Sides = {
  left: 'SideLeft',
  right: 'SideRight'
}

function Sidebar(props) {
  return (
    <>
      <div className={`${styles.SidebarWrapper} ${props.show ? '' : styles.Hide} ${styles[Sides[props.side]]}`} onClick={props.close} />
      <nav className={`${styles.Sidebar} ${styles[Sides[props.side]]} ${props.show ? '' : styles.Hide}`}>
        <div className={styles.Header}>
          <Close onClick={props.close} fontSize="large" />
          <div className={styles.Title}>{props.title}</div>
        </div>
        <div className={styles.Body}>
          {props.children}
        </div>
      </nav>
    </>
  )
}

export default Sidebar;