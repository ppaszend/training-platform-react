import React from "react";
import styles from './MobileProfile.module.scss'
import {Link} from "react-router-dom";
import {Close} from "@material-ui/icons";

class MobileProfile extends React.Component {
  state = {
    animationOpen: true
  }

  render() {
    return (
      <div className={`${styles.AnimatedMobileProfile} ${this.state.animationOpen ? styles.Open : ''}`}>
        {
          this.props.open && (
            <div className={styles.MobileProfile}>
              <div className={styles.Header}>
                <Close onClick={() => {
                  new Promise((resolve) => {
                    this.setState({animationOpen: false})
                    setTimeout(() => {
                      resolve();
                    }, 500);
                  })
                    .then(() => this.props.setOpen(false))
                }} />
                <span className={styles.HeaderName}>Twój profil</span>
              </div>
              <div className={styles.Content}>
                <Link className="Button" to="/login">Zaloguj się</Link>
                <Link className="Button" to="/register">Zarejestruj się</Link>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default MobileProfile;