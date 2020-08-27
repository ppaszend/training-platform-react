import React from "react";
import Loading from "../Loading/Loading";
import styles from './Product.module.scss';
import { AddShoppingCart } from "@material-ui/icons";
import OpinionsList from "./OpinionsList/OpinionsList";
import Rating from "@material-ui/lab/Rating";
import animateScrollTo from "animated-scroll-to";
import Axios from "axios";

class Product extends React.Component {
  state = {
    product: {
      id: null,
      name: '',
      description: '',
      price: null,
      rating: null
    },
    sections: {
      opinions: true,
    },
    opinionsAnimationTime: 'auto',
    opinionsAmount: 0
  }

  fetchProductData = () => {
    Axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/product/?slug=${this.props.match.params.slug}`,
    })
      .then(({data}) => {
        if (this.unmounted) return;
        this.setState({
          product: {
            name: data.name,
            description: data.description,
            price: data.price,
            rating: data.rating
          },
          opinionsAmount: data.opinionsAmount
        })
      })
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidMount() {
    this.fetchProductData();
  }

  toggleOpinions = (newState) => this.setState((prevState) => ({sections: {
    ...prevState.sections,
    opinions: typeof newState !== "boolean" ? !prevState.sections.opinions : newState
  }}));

  render() {
    let opinionsAmount = this.state.opinionsAmount;

    if (opinionsAmount === 1) {
      opinionsAmount += ' opinia'
    } else if (opinionsAmount > 4 || opinionsAmount === 0) {
      opinionsAmount += ' opinii'
    } else {
      opinionsAmount += ' opinie'
    }

    return (
      this.state.product ? (
        <>
          <section className={styles.ProductWrapper}>
            <h1 className={styles.ProductName}>{this.state.product.name}</h1>
            <div className={styles.ProductRating}>
              <Rating name="half-rating-read" value={this.state.product.rating} precision={0.5} readOnly />
              <div onClick={() => {
                this.setState({opinionsAnimationTime: 0});
                this.toggleOpinions(true);
                this.setState({opinionsAnimationTime: 'auto'});
                animateScrollTo(document.querySelector('#opinions').offsetTop - 35)
              }}
                   className={styles.OpinionsAmount}>
                ({opinionsAmount})</div>
            </div>
            <p>{this.state.product.description}</p>
            <div className={styles.ProductPrice}>{this.state.product.price} zł</div>
            <button className={styles.AddToCart}
                    onClick={() => this.props.addProductToCart(this.state.product)} >
              <div className={styles.BtnText}>Dodaj do koszyka</div>
              <div className={styles.BtnIcon}>
                <AddShoppingCart />
              </div>
            </button>
          </section>
          <OpinionsList show={this.state.sections.opinions}
                        toggle={this.toggleOpinions}
                        animationTime={this.state.opinionsAnimationTime}
                        productSlug={this.props.match.params.slug}
                        incrementOpinionsAmount={() => this.setState((prevState) => (
                          {opinionsAmount: prevState.opinionsAmount++}
                          ))}
          />
        </>
      ) : <Loading/>
    )
  }
}

export default Product;