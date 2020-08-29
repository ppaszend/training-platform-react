import React, {useState} from "react";
import styles from './Sidebar.module.scss';
import {Close} from "@material-ui/icons";

function Sidebar(props) {
  return (
    <>
      <div className={`${styles.SidebarWrapper} ${props.show ? '' : styles.Hide}`} onClick={props.close} />
      <nav className={styles.Sidebar}>
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