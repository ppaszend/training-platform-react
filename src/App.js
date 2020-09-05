import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, useLocation, Switch, Redirect} from 'react-router-dom';
import styles from './App.module.scss';

import {setAuthenticationToken, loadAuthenticationTokenFromLocalStorage, get_categories,
        get_auth_token, get_user_data, disable_and_remove_auth_token} from "./api";

import {Snackbar} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

// import pages
import HomePage from "./pages/HomePage/HomePage";
import Register from "./pages/Register/Register";
import Sidebar from "./components/Sidebar/Sidebar";

// import components
import NavBar from "./components/NavBar/NavBar";
import Cart from "./pages/Cart/Cart";
import Category from "./pages/Category/Category";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";
import LinkButton from "./components/LinkButton/LinkButton";
import Search from "./components/Search/Search";
import Button from "@material-ui/core/Button";


const initialUser = {
  isAuthenticated: false,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  lastLogin: null
};
const initialSnackbars = {
  loggedIn: {
    state: false,
    severity: 'success',
    message: (props) => `Pomyślnie zalogowano jako ${props.username}`,
    props: {user: {}}
  },
  loggedOut: {
    state: false,
    severity: 'success',
    message: (props) => "Zostałeś pomyślnie wylogowany",
    props: {}
  }
};


function UsePageViews() {
  let location = useLocation();

  useEffect(() => {
    setProfileSidebar(false);
    setCategorySidebar(false);
  },[location]);

  useEffect(() => {
    get_categories()
      .then(({data}) => {
        setCategories(data)
      });
  }, []);

  useEffect(() => {
    if (loadAuthenticationTokenFromLocalStorage()) {
      get_user_data()
        .then((resp) => {
          if (resp.status === 200) {
            setUser({...resp.data, isAuthenticated: true})
          }
        });
    }
  }, []);


  const [categories, setCategories] = useState([]);
  const [categorySidebar, setCategorySidebar] = useState(false);
  const [profileSidebar, setProfileSidebar] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [cart, setCart] = useState({products: []});
  const [user, setUser] = useState(initialUser);
  const [snackbars, setSnackbars] = useState(initialSnackbars);


  const showSnackbar = (name, props, severity='success') => {
    setSnackbars({
      ...snackbars,
      [name]: {
        ...snackbars[name],
        state: true,
        severity: severity,
        props: {...snackbars[name].props, ...props}
      }
    });
  };

  const closeSnackbar = (name) => setSnackbars({...snackbars, [name]: {...snackbars[name], state: false}});

  const loginUser = (username, password) => {
    get_auth_token(username, password)
      .then(resp => {
        if (resp.status) {
          window.localStorage.setItem('authToken', resp.data.auth_token);
          setAuthenticationToken(resp.data.auth_token);
        }

        get_user_data()
          .then((resp) => {
            if (resp.status === 200) {
              setUser({...resp.data, isAuthenticated: true})
              showSnackbar('loggedIn', {username: resp.data.username});
            }
          })
      })
  };

  const logoutUser = () => {
    if (user.isAuthenticated) {
      disable_and_remove_auth_token()
        .then((resp) => {
          setAuthenticationToken(false);
          setUser({
            isAuthenticated: false
          })
          showSnackbar('loggedOut');
        })
    }
  };

  const addProductToCart = (product) => {
    !inCart(product) && setCart({...cart, products: [...cart.products, product]})
  };

  const deleteProductFromCart = (product) => {
    inCart(product) && setCart({...cart, products: cart.products.filter((item) => item.id !== product.id)})
  };

  const inCart = (product) => !!cart.products.find((item) => item.id === product.id);
  const getCategoryBySlug = (slug) => categories.find((category) => category.slug === slug);
  const openProfileSidebar = () => setProfileSidebar(true);
  const closeProfileSidebar = () => setProfileSidebar(false);


  return (
    <>
      <div className={styles.App}>
        <NavBar
          categories={categories}
          toggleCategories={() => setCategorySidebar(!categorySidebar)}
          openSidebar={openProfileSidebar}
          setSearchModal={setSearchModal}
        />
        <Search setSearchModal={setSearchModal} show={searchModal} />
        <Sidebar show={categorySidebar}
                 side="left"
                 close={() => setCategorySidebar(false)}
                 title="Kategorie">
          {
            categories.map((category, index) => (
              <LinkButton to={`/category/${category.slug}/1`} color="white" key={index}>{category.name}</LinkButton>
            ))
          }
        </Sidebar>
        <Sidebar show={profileSidebar}
                 side="right"
                 close={closeProfileSidebar}
                 title="Twoje konto">
          {
            user.isAuthenticated ? (
              <>
              <span>Zalogowano jako {user.username}</span>
                <LinkButton onClick={() => {closeProfileSidebar(); logoutUser();}} color="green">Wyloguj się</LinkButton>
              </>
            ) : (
              <>
                <LinkButton to="/register" color="green">Rejestracja</LinkButton>
                <LinkButton to="/login" color="green">Logowanie</LinkButton>
              </>
            )
          }
        </Sidebar>
        {
          Object.keys(snackbars).map((key, index) => {
            const snackbar = snackbars[key];
            return (
              <Snackbar anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        key={index}
                        open={snackbars[key].state}
                        autoHideDuration={6000}
                        onClose={() => closeSnackbar(key)}
                        action={
                          <Button onClick={() => closeSnackbar(key)}>
                            <CloseIcon fontSize="small" />
                          </Button>
                        }><Alert severity={snackbar.severity}>{snackbar.message(snackbar.props)}</Alert></Snackbar>
            )
          })
        }
      </div>
      <Switch>
        <Route exact path="/" component={() => <HomePage addProductToCart={addProductToCart}
                                                         inCart={inCart} />
        }/>
        <Route path="/cart" component={() => <Cart cart={cart}
                                                   addProductToCart={addProductToCart}
                                                   deleteProductFromCart={deleteProductFromCart}
                                                   inCart={inCart} />}
        />
        <Route exact path="/category/:slug/:page"
               component={({match}) => <Category match={match}
                                                 getCategoryBySlug={getCategoryBySlug}
                                                 inCart={inCart}
                                                 addProductToCart={addProductToCart} />
               }/>
        <Route exact path="/product/:slug"
               component={({match}) => <Product match={match}
                                                inCart={inCart}
                                                addProductToCart={addProductToCart}
                                                location={location} />
               } />
        <Route exact path="/login">
          { user.isAuthenticated ? <Redirect to="/" /> : <Login loginUser={loginUser} />}
        </Route>
        <Route exact path="/register"
               component={() => <Register />
               } />
      </Switch>
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <UsePageViews />
      </Router>
    </>
  )
}

export default App;
