import React, {useState} from "react";
import ProductsList from "../../components/ProductsList/ProductsList";

function HomePage(props) {
  const [products] = useState([
    {
      id: 0,
      name: 'Lorem Ipsum',
      slug: 'lorem-ipsum',
      description: 'Lorem ipsum dolor sit amet.',
      price: 19.99
    },
    {
      id: 1,
      name: 'Dolor sit',
      slug: 'dolor-sit',
      description: 'Lorem ipsum dolor sit amet.',
      price: 39.99
    }
  ]);

  return (
    <>
      <h2>Ostatnio dodane produkty</h2>
      <ProductsList items={products}
                    addProductToCart={props.addProductToCart}
                    inCart={props.inCart}
      />
    </>
  )
}

export default HomePage;