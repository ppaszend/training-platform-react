import React from "react";
import LoopIcon from '@material-ui/icons/Loop';
import styles from './Loading.module.scss'

class Loading extends React.Component {
  render() {
    return (
      <div className={styles.LoadingWrapper}>
        <LoopIcon style={{fontSize: 40}} className={styles.AnimatedIcon} />
        <p>Wczytywanie danych...</p>
      </div>
    )
  }
}

export default Loading;