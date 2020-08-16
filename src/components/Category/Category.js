import React from "react";
import ProductsList from "../ProductsList/ProductsList";
import {Pagination} from "@material-ui/lab";


class Category extends React.Component {
  state = {
    name: 'kategoria 1',
    amountOfPages: 12,
    pages: [
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
      ]
    ]
  }

  getPage = (page) => {
    if (this.state.pages[page - 1] !== undefined) {
      return this.state.pages[page - 1];
    } else {
      return []
    }
  }

  render() {
    const category = this.props.getCategoryBySlug(this.props.match.params.slug);

    return (
      <>
        <h2>{category.name}</h2>
        <ProductsList items={this.state.pages[this.props.match.params.page - 1]}
                      inCart={this.props.inCart}
                      addProductToCart={this.props.addProductToCart}

        />
        <Pagination count={category.amountOfPages}
                    onChange={this.props.goToPage} />
      </>
    )
  }
}

export default Category;