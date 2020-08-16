import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import NavBar from "./components/NavBar/NavBar";
import styles from './App.module.scss';
import Cart from "./components/Cart/Cart";
import Category from "./components/Category/Category";
import HomePage from "./components/HomePage/HomePage";
import Product from "./components/Product/Product";

class App extends React.Component{
  state = {
    showCategories: false,
    categories: [
      {
        id: 0,
        name: 'Kategoria A',
        slug: 'kategoria-a',
        amountOfPages: 5,
        products: [
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
        ]
      },
      {
        id: 1,
        name: 'Kategoria B',
        slug: 'kategoria-b',
        amountOfPages: 11,
        products: [
          [
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
          ],
          [
            {
              id: 43,
              name: 'Lorem Ipsum 22',
              slug: 'lorem-ipsum',
              description: 'Lorem ipsum dolor sit amet.',
              price: 49.99
            },
            {
              id: 54,
              name: 'Dolor sit 23',
              slug: 'dolor-sit',
              description: 'Lorem ipsum dolor sit amet.',
              price: 59.99
            }
          ],
        ]
      }
    ],
    newProducts: [
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
    ],
    cart: {
      products: []
    }
  }

  addProductToCart = (product) => {
    !this.inCart(product) && this.setState((prevState) => ({
      cart: {...prevState.cart, products: [...prevState.cart.products, product]}
    }));
  }

  deleteProductFromCart = (product) => {
    this.inCart(product) && this.setState((prevState) => ({
      cart: {...prevState.cart, products: prevState.cart.products.filter((item) => item.id !== product.id)}
    }))
  }

  toggleCategories = (e, newState) => {
    this.setState((prevState) => {
      return {
        showCategories: newState !== undefined ? newState : !prevState.showCategories
      }
    });
  }

  inCart = (product) => !!this.state.cart.products.find((item) => item.id === product.id);

  getCategoryBySlug = (slug) => this.state.categories.find((category) => category.slug === slug);

  render() {
    return (
      <>
        <Router>
          <div className={styles.App}>
            <NavBar
              categories={this.state.categories}
              showCategories={this.state.showCategories}
              toggleCategories={this.toggleCategories}
            />
            <Route exact path="/" component={() => <HomePage newProducts={this.state.newProducts}
                                                             addProductToCart={this.addProductToCart}
                                                             inCart={this.inCart} />
            }/>
            <Route path="/cart" component={() => <Cart cart={this.state.cart}
                                                       addProductToCart={this.addProductToCart}
                                                       deleteProductFromCart={this.deleteProductFromCart}
                                                       inCart={this.inCart} />}
            />
            <Route exact path="/category/:slug/:page"
                   component={({match}) => <Category match={match}
                                                     getCategoryBySlug={this.getCategoryBySlug}
                                                     inCart={this.inCart}
                                                     addProductToCart={this.addProductToCart} />
            }/>
            <Route exact path="/product/:slug"
                   component={({match}) => <Product match={match}
                                                    inCart={this.inCart}
                                                    addProductToCart={this.addProductToCart} />
            } />
          </div>
        </Router>
      </>
    )
  }
}

export default App;
