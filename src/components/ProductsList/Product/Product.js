import React from "react";
import styles from './Product.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class Product extends React.Component {
  render() {
    const {name, slug, price, description} = this.props.item;

    return (
      <li className={styles.Product}>
        <Link to={`/product/${slug}`}><h3 className={styles.Name}>{name}</h3></Link>
        <p className={styles.Description}>{description.slice(0, 80)}</p>
        <div className={styles.Row}>
          <span className={styles.Price}>{price} zł</span>
          {
            this.props.deleteBtn ? (
              <button className={`${styles.DeleteFromCart} ${this.props.inCart(this.props.item) ? styles.Includes : ''}`}
                      onClick={() => this.props.deleteProductFromCart(this.props.item)} >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            ) : (
              <button className={`${styles.AddToCart} ${this.props.inCart(this.props.item) ? styles.Includes : ''}`}
                      onClick={() => this.props.addProductToCart(this.props.item)} >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            )
          }
        </div>
      </li>
    )
  }
}

export default Product;