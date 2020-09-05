import Axios from "axios";

const API_URL = 'http://192.168.0.55:8000/api';
let token = false;

function setAuthenticationToken(new_token) {
  token = new_token;
  if (!token) {
    window.localStorage.removeItem('authToken');
  }
}

function loadAuthenticationTokenFromLocalStorage() {
  if (window.localStorage.getItem('authToken') !== null) {
    setAuthenticationToken(window.localStorage.getItem('authToken'));
  } else {
    token = false;
  }
  return token;
}

function CreateAxios(params) {
  if (token) {
    params = {...params, headers: {...params.headers, Authorization: `Token ${token}`}};
  }
  return Axios(params)
}

function get_product(slug) {
  return CreateAxios({
    method: 'GET',
    url: `${API_URL}/product/${slug}/`,
  })
}

function add_opinion(data, product_slug) {
  return CreateAxios({
    method: 'POST',
    url: `${API_URL}/opinion/${product_slug}/`,
    data: data,
  })
}

function get_categories() {
  return CreateAxios({
    method: 'GET',
    url: `${API_URL}/categories/`,
  })
}

function get_category_products(category_slug, page, products_per_page) {
  return CreateAxios({
    method: 'GET',
    url: `${API_URL}/category/${category_slug}/?offset=${(page - 1) * products_per_page}&limit=${products_per_page}`
  })
}

function get_auth_token(username, password) {
  token = false;
  return CreateAxios({
    method: 'POST',
    url: `${API_URL}/auth/token/login/`,
    data: {
      username: username,
      password: password
    },
  })
}

function disable_and_remove_auth_token() {
  if (token) {
    return CreateAxios({
      method: 'POST',
      url: `${API_URL}/auth/token/logout/`
    })
  }
}

function get_user_data() {
  return CreateAxios({
    method: 'GET',
    url: `${API_URL}/user/`
  })
}

export {get_product, setAuthenticationToken, loadAuthenticationTokenFromLocalStorage,
        add_opinion, get_categories, get_category_products, get_auth_token, get_user_data,
        disable_and_remove_auth_token};