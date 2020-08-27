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
      <div className={`${styles.AnimatedMobileProfile} ${this.props.open ? styles.Open : ''}`}>
        {
          this.props.open && (
            <div className={styles.MobileProfile}>
              <div className={styles.Header}>
                <Close onClick={() => {
                  this.props.setOpen(false)
                }} />
                <span className={styles.HeaderName}>Twój profil</span>
              </div>
              <div className={styles.Content}>
                {
                  !this.props.user.isAuthenticated && (
                    <>
                      <Link className="Button Button--gray" to="/login">Zaloguj się</Link>
                      <Link className="Button Button--gray" to="/register">Zarejestruj się</Link>
                    </>
                  )
                }
                {
                  this.props.user.isAuthenticated && (
                    <>
                      <div className={styles.UserProfile}>
                        {this.props.user.username} {this.props.user.firstName} {this.props.user.lastName}
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default MobileProfile;