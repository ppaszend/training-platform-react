import React from "react";
import Loading from "../Loading/Loading";
import styles from './Product.module.scss';
import { AddShoppingCart } from "@material-ui/icons";
import OpinionsList from "./OpinionsList/OpinionsList";
import Rating from "@material-ui/lab/Rating";
import animateScrollTo from "animated-scroll-to";

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
    opinions: [],
    opinionsAnimationTime: 'auto'
  }

  fetchProductData = () => {
    // todo: fetching product from api (example data below)
    this.setState({product: {
      id: 20,
      name: 'Lorem ipsum',
      description: 'Donec purus purus, facilisis vitae hendrerit quis, malesuada sed magna. Donec sed ullamcorper ipsum. Vestibulum tempor, elit vitae interdum finibus, est lacus mollis ex, vitae pulvinar urna arcu vitae dui. Proin fringilla diam ut sem pulvinar, id ullamcorper elit efficitur. Etiam nibh dolor, finibus eget enim eu, pellentesque suscipit tortor. Aenean quis nibh sed lacus dapibus condimentum vel eget ligula. Vestibulum varius ipsum eget congue ultrices. Integer a urna eros. Morbi sit amet malesuada sapien. In eros nisi, convallis vel lobortis eu, rhoncus id odio. Nulla eu pretium orci, at dignissim sem. Quisque sed libero a eros rutrum rhoncus. Cras placerat elit non varius hendrerit.',
      price: 9.99,
      rating: 3.5
    },
      opinions: [
        {
          id: 11,
          author: 'Paweł Paszenda',
          text: 'Donec congue ultrices neque eget vulputate. Sed egestas aliquet est, sagittis auctor urna consectetur eu. Phasellus fermentum ullamcorper lacinia. In a ultrices elit. Vestibulum luctus, nibh ac sagittis vulputate, massa leo scelerisque urna, non aliquam est sapien et ante. Phasellus pretium tellus vitae justo condimentum pulvinar.',
          rating: 5,
          date: new Date(2019, 5, 21)
        },
        {
          id: 12,
          author: 'Paweł Paszenda',
          text: 'Donec congue ultrices neque eget vulputate. Sed egestas aliquet est, sagittis auctor urna consectetur eu. Phasellus fermentum ullamcorper lacinia. In a ultrices elit. Vestibulum luctus, nibh ac sagittis vulputate, massa leo scelerisque urna, non aliquam est sapien et ante. Phasellus pretium tellus vitae justo condimentum pulvinar.',
          rating: 4.5,
          date: new Date(2020, 7, 1)
        },
        {
          id: 13,
          author: 'Paweł Paszenda',
          text: 'Donec congue ultrices neque eget vulputate. Sed egestas aliquet est, sagittis auctor urna consectetur eu. Phasellus fermentum ullamcorper lacinia. In a ultrices elit. Vestibulum luctus, nibh ac sagittis vulputate, massa leo scelerisque urna, non aliquam est sapien et ante. Phasellus pretium tellus vitae justo condimentum pulvinar.',
          rating: 2.5,
          date: new Date(2020, 7, 15)
        },
      ]
    });
  }

  addOpinion = (name, text, rating) => {
    this.setState((prevState) => ({opinions: [...prevState.opinions, {
      id: 200,
      author: name,
      text: text,
      rating: parseInt(rating),
      date: new Date(Date.now()),
    }]}))
  }

  componentDidMount() {
    this.fetchProductData();
  }

  toggleOpinions = (newState) => this.setState((prevState) => ({sections: {
    ...prevState.sections,
    opinions: typeof newState !== "boolean" ? !prevState.sections.opinions : newState
  }}));

  render() {
    const opinionsAmount = this.state.opinions.length;

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
                   className={styles.OpinionsAmount} >
                ({opinionsAmount} {(opinionsAmount === 1 && 'opinia') || (opinionsAmount > 4 && 'opinii') || 'opinie'})</div>
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
          <OpinionsList opinions={this.state.opinions}
                        show={this.state.sections.opinions}
                        toggle={this.toggleOpinions}
                        animationTime={this.state.opinionsAnimationTime}
                        addOpinion={this.addOpinion}
          />
        </>
      ) : <Loading/>
    )
  }
}

export default Product;