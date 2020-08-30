import React from "react";
import styles from "./IconButton.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class IconButton extends React.Component {
  render() {
    return (
      <button className={styles.btn} onClick={this.props.onClick}>
        <FontAwesomeIcon icon={this.props.icon} />
      </button>
    );
  }
}

export default IconButton