import React from "react";
import styles from "./IconButton.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class IconButton extends React.Component {
  render() {
    return (
      <button className={styles.btn}>
        <FontAwesomeIcon icon={this.props.icon}
                         onClick={this.props.onClick}
        />
      </button>
    );
  }
}

export default IconButton