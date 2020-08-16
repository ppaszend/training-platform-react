import React from "react";
import ProductsList from "../ProductsList/ProductsList";

class Cart extends React.Component {
  render() {
    const {products} = this.props.cart;

    return (
      <>
        <h2>Zawartość twojego koszyka:</h2>
        {
          products.length > 0 ? (
            <ProductsList items={products}
                          addProductToCart={this.props.addProductToCart}
                          deleteProductFromCart={this.props.deleteProductFromCart}
                          inCart={this.props.inCart}
                          deleteBtn={true}
            />
          ) : (
            <p>Brak produktów w koszyku</p>
          )
        }
      </>
    )
  }
}

export default Cart;