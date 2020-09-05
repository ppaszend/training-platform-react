import React from "react";
import styles from './Opinion.module.scss';
import Rating from "@material-ui/lab/Rating";
import TimeAgo from 'javascript-time-ago';
import pl from 'javascript-time-ago/locale/pl';

class Opinion extends React.Component {
  constructor(props) {
    super(props);
    TimeAgo.addLocale(pl);
    this.timeAgo = new TimeAgo('pl')
  }

  render() {
    return (
      <li className={styles.Opinion}>
        <div className={styles.Row}>
          <div className={styles.Group}>
            <div className={styles.OpinionAuthor}>{this.props.opinion.author}</div>
            <div className={styles.OpinionDate}>{this.timeAgo.format(this.props.opinion.created)}</div>
          </div>
          <div className={styles.Group}>
            <Rating name="half-rating-read" defaultValue={parseFloat(this.props.opinion.rate)} precision={0.5} readOnly />
          </div>
        </div>
        <div className={styles.OpinionText}>{this.props.opinion.text}</div>
      </li>
    )
  }
}

export default Opinion;