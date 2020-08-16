import React from "react";
import styles from "./OpinionsList.module.scss";
import {ExpandMore} from "@material-ui/icons";
import {Collapse} from "@material-ui/core";
import Opinion from "./Opinion/Opinion";
import Rating from "@material-ui/lab/Rating";

class OpinionsList extends React.Component {
  state = {
    rating: 1
  }

  addOpinion = (e) => {
    e.preventDefault();
    // todo: sending opinion to server
    console.log({
      name: e.target.querySelector('[name="add-opinion--name"]'),
      text: e.target.querySelector('[name="add-opinion--text"]'),
      rating: [...e.target.querySelectorAll('[name="add-opinion--rating"]')].find((ele) => ele.checked).value
    });
    this.props.addOpinion(
      e.target.querySelector('[name="add-opinion--name"]').value,
      e.target.querySelector('[name="add-opinion--text"]').value,
      [...e.target.querySelectorAll('[name="add-opinion--rating"]')].find((ele) => ele.checked).value
    )
  }

  render() {
    return (
      <section className={`${styles.OpinionWrapper} ${this.props.show ? styles.Expanded : ''}`}
               id="opinions" >
        <div className={styles.SectionHeader}
             onClick={this.props.toggle}>
          <div className={styles.SectionName}>
            <h2>Opinie</h2>
          </div>
          <div className={styles.SectionStateIcon}>
            <ExpandMore />
          </div>
        </div>
        <Collapse in={this.props.show} timeout={this.props.timeout}>
          <div className={styles.SectionContent}>
            <div>
              <form className={styles.AddOpinion}
                    onSubmit={this.addOpinion} >
                <label>
                  <input placeholder="Wpisz swoje imię" name="add-opinion--name" />
                </label>
                <label>
                  <textarea placeholder="Podziel się wrażeniami" name="add-opinion--text" />
                </label>
                <div className={styles.RatingWrapper}>
                  <Rating name="add-opinion--rating" precision={0.5} size={"large"} />
                </div>
                <button>Dodaj opinię</button>
              </form>
            </div>
            <ul className={styles.OpinionsList}>
              {
                this.props.opinions.sort((a, b) => a > b ? 1 : -1).map((opinion) => (
                  <Opinion opinion={opinion} key={opinion.id} value={this.state.rating} />
                ))
              }
            </ul>
          </div>
        </Collapse>
      </section>
    )
  }
}

export default OpinionsList;