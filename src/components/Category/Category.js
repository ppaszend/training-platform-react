import React from "react";
import ProductsList from "../ProductsList/ProductsList";
import {Pagination} from "@material-ui/lab";
import {Link} from 'react-router-dom';

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

  // goToPage = (e, page) => this.props.history.push(`/category/${this.props.match.params.slug}/${page}`);

  render() {
    const category = this.props.getCategoryBySlug(this.props.match.params.slug);

    return (
      <>
        <h2>{category.name}{this.props.match.params.page}</h2>
        <ProductsList items={this.getPage(this.props.match.params.page)}
                      inCart={this.props.inCart}
                      addProductToCart={this.props.addProductToCart}

        />
        <Pagination count={category.amountOfPages}
                    onChange={this.goToPage}
                    renderItem={(item) => {
                      console.log(item);
                      if (item.type === 'page') {
                        return (
                          <Link to={`/category/${this.props.match.params.slug}/${item.page}`}>{item.page}</Link>
                        )
                      }
                    }}
        />
      </>
    )
  }
}

export default Category;