import React from "react";
import styles from "./OpinionsList.module.scss";
import {ExpandMore} from "@material-ui/icons";
import {Collapse} from "@material-ui/core";
import Opinion from "./Opinion/Opinion";
import Rating from "@material-ui/lab/Rating";
import Axios from "axios";

class OpinionsList extends React.Component {
  state = {
    page: 1,
    pagesAmount: 0,
    opinions: [],
  }

  fetchOpinions = (page) => {
    Axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/opinions/${this.props.productSlug}/?offset=${page * 10}&limit=10`
    })
      .then(({data}) => {
        if (this.unmounted) return;
        this.setState((prevState) => ({
          opinions: [...prevState.opinions, ...data.map((opinion) => ({...opinion, created: new Date(opinion.created)}))],
          pagesAmount: data.pagesAmount,
        }))
      })
  }

  addOpinion = (e) => {
    e.preventDefault();
    this.props.incrementOpinionsAmount();
    Axios({
      method: 'POST',
      url: `http://127.0.0.1:8000/api/opinion/${this.props.productSlug}/`,
      data: {
        author: e.target.querySelector('[name="add-opinion--name"]').value,
        text: e.target.querySelector('[name="add-opinion--text"]').value,
        rate: [...e.target.querySelectorAll('[name="add-opinion--rating"]')].find((ele) => ele.checked).value,
      }
    })
      .then(({data}) => {
        if (this.unmounted) return;
        this.setState((prevState) => ({opinions: [...prevState.opinions, {
            id: data.id,
            author: data.author,
            text: data.text,
            rating: parseInt(data.rating),
            date: new Date(data.date),
          }]
        }))
      })
  }

  componentDidMount() {
    this.fetchOpinions(1);
  }

  componentWillUnmount() {
    this.unmounted = true;
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
                    onSubmit={this.addOpinion}>
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
                this.state.opinions.sort((a, b) => a > b ? 1 : -1).map((opinion) => (
                  <Opinion opinion={opinion} key={opinion.id} value={this.state.rating} />
                ))
              }
            </ul>
            {
              this.state.page < this.state.pagesAmount && (
                <button onClick={() => {
                  this.fetchOpinions(this.state.page + 1);
                  this.setState((prevState)=> {
                    return {
                      page: prevState.page++
                    }
                  })
                }} className={`Button Button--gray`}>Wyświetl więcej opinii</button>
              )
            }
          </div>
        </Collapse>
      </section>
    )
  }
}

export default OpinionsList;