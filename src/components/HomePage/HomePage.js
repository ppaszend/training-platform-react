import React from "react";
import ProductsList from "../ProductsList/ProductsList";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <h2>Ostatnio dodane produkty</h2>
        <ProductsList items={this.props.newProducts}
                      addProductToCart={this.props.addProductToCart}
                      inCart={this.props.inCart}
        />
      </>
    )
  }
}

export default HomePage;