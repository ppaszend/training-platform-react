import React from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import {Pagination} from "@material-ui/lab";
import {Link} from 'react-router-dom';
import {get_category_products} from "../../api";

class Category extends React.Component {
  state = {
    name: '',
    amountOfPages: 0,
    pages: [],
  }

  getPage = (page) => {
    if (this.state.pages[page - 1] !== undefined) {
      return this.state.pages[page - 1];
    } else {
      return []
    }
  }

  componentDidMount() {
    get_category_products(this.props.match.params.slug, this.props.match.params.page, 10)
      .then(({data}) => {
        this.setState((prevState) => ({
          pages: [...prevState.pages, data.products],
          name: data.name,
          amountOfPages: data.pagesAmount
        }))
      })
  }

  render() {
    return (
      <>
        <h2>{this.state.name}{this.props.match.params.page}</h2>
        <ProductsList items={this.getPage(this.props.match.params.page)}
                      inCart={this.props.inCart}
                      addProductToCart={this.props.addProductToCart}

        />
        <Pagination count={this.state.amountOfPages}
                    onChange={this.goToPage}
                    renderItem={(item) => {
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