import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import Products from './Products';
import CartButton from '../Components/CartButton';
import Category from '../Components/Category';
import SearchInput from '../Components/SearchInput';
import '../styles/home.css';
import HomeProducts from '../Components/HomeProducts';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      productList: [],
      categories: [],
      homeProducts: [],
    };
    this.inputList = this.inputList.bind(this);
    this.categorieAndQuery = this.categorieAndQuery.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.getHomeProducts = this.getHomeProducts.bind(this);
  }

  componentDidMount() {
    this.getCategory();
    this.getHomeProducts();
  }

  async getCategory() {
    const category = await api.getCategories();
    this.setState({ categories: category });
  }

  async getHomeProducts(id = 'MLB1648') {
    const data = await
    fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}&limit=8`)
      .then((response) => response.json())
      .then((response) => this.setState({ homeProducts: response.results }));

    return data;
  }

  inputList({ target }) {
    this.setState({
      search: target.value,
    });
  }

  async categorieAndQuery(id = '') {
    const { search } = this.state;

    const { results } = await api.getProductsFromCategoryAndQuery(id, search);
    this.setState({
      productList: results,
    });
  }

  render() {
    const { addToCart, quantity } = this.props;
    const { productList, categories, homeProducts } = this.state;
    return (
      <section>
        <header>
          <div className="header-content">
            <h2 className="market">Undefined Shop</h2>
            <SearchInput
              inputList={ this.inputList }
              categorieAndQuery={ this.categorieAndQuery }
            />
            <CartButton
              quantity={ quantity }
            />
          </div>
        </header>
        <Category
          category={ categories }
          categoryAndQuery={ this.categorieAndQuery }
        />
        <HomeProducts
          addToCart={ addToCart }
          quantity={ quantity }
          homeProducts={ homeProducts }
        />
        <Products
          productList={ productList }
          addToCart={ addToCart }
          quantity={ quantity }
          homeProducts={ homeProducts }
        />
      </section>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  quantity: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

Home.defaultProps = {
  quantity: 0,
};

export default Home;
