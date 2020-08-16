import React from "react";
import Product from "./Product/Product";
import styles from './ProductsList.module.scss';

class ProductsList extends React.Component {
  render() {
    return (
      <section className={styles.ProductsContainer}>
        <ul className={styles.ProductsList}>
          {
            this.props.items.map((item) => (
              <Product key={item.id}
                       addProductToCart={this.props.addProductToCart}
                       inCart={this.props.inCart}
                       item={item}
                       deleteBtn={!!this.props.deleteBtn}
                       deleteProductFromCart={this.props.deleteProductFromCart}
              />
            ))
          }
        </ul>
      </section>
    )
  }
}

export default ProductsList;