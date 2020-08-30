import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, useLocation, Switch} from 'react-router-dom';
import styles from './App.module.scss';
import Axios from "axios";

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

function UsePageViews() {
  let location = useLocation();

  useEffect(() => {
    setProfileSidebar(false);
    setCategorySidebar(false);
  },[location]);

  const [categories] = useState([
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
  ]);
  const [categorySidebar, setCategorySidebar] = useState(false);
  const [profileSidebar, setProfileSidebar] = useState(false);
  const [cart, setCart] = useState({
    products: []
  });
  const [user] = useState({
    isAuthenticated: false,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    lastLogin: null
  });

  // const fetchUserCredentials = () => {
  //   Axios({
  //     method: 'GET',
  //     url: 'http://127.0.0.1:8000/api/user/'
  //   })
  //     .then(({data}) => {
  //       if (data.isAuthenticated) {
  //         setUser(data);
  //       } else {
  //         setUser({
  //           user: {
  //             isAuthenticated: false,
  //             username: '',
  //             email: '',
  //             firstName: '',
  //             lastName: '',
  //             lastLogin: null
  //           }
  //         })
  //       }
  //     })
  // }

  const loginUser = (username, password) => {
    Axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/authenticate/',
      data: {
        username: username,
        password: password
      },
    })
      .then(({data}) => {
        if (this.unmounted) return;
        if (data.isAuthenticated) {
          this.setState({
            user: data
          })
        } else {
          this.setState({
            user: {
              isAuthenticated: false,
              username: '',
              email: '',
              firstName: '',
              lastName: '',
              lastLogin: null
            }
          })
        }
      })
  }

  const addProductToCart = (product) => {
    !inCart(product) && setCart({...cart, products: [...cart.products, product]})
  }

  const deleteProductFromCart = (product) => {
    inCart(product) && setCart({...cart, products: cart.products.filter((item) => item.id !== product.id)})
  }

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
          user={user}
        />
        <Sidebar show={categorySidebar}
                 side="left"
                 close={() => setCategorySidebar(false)}
                 title="Kategorie">
          {
            categories.map(category => (
              <LinkButton to={`/category/${category.slug}/1`} color="white" key={category.id}>{category.name}</LinkButton>
            ))
          }
        </Sidebar>
        <Sidebar show={profileSidebar}
                 side="right"
                 close={closeProfileSidebar}
                 title="Twoje konto">
          <LinkButton onClick={closeProfileSidebar} to="/register" color="green">Rejestracja</LinkButton>
          <LinkButton onClick={closeProfileSidebar} to="/login" color="green">Logowanie</LinkButton>
        </Sidebar>
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
                                                addProductToCart={addProductToCart} />
               } />
        <Route exact path="/login"
               component={() => <Login loginUser={loginUser} />
               } />
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

// class App extends React.Component{
//   state = {
//     showCategories: false,
//     profileSidebar: true,
//     categories: [
//       {
//         id: 0,
//         name: 'Kategoria A',
//         slug: 'kategoria-a',
//         amountOfPages: 5,
//         products: [
//           {
//             id: 0,
//             name: 'Lorem Ipsum',
//             slug: 'lorem-ipsum',
//             description: 'Lorem ipsum dolor sit amet.',
//             price: 19.99
//           },
//           {
//             id: 1,
//             name: 'Dolor sit',
//             slug: 'dolor-sit',
//             description: 'Lorem ipsum dolor sit amet.',
//             price: 39.99
//           }
//         ]
//       },
//       {
//         id: 1,
//         name: 'Kategoria B',
//         slug: 'kategoria-b',
//         amountOfPages: 11,
//         products: [
//           [
//             {
//               id: 0,
//               name: 'Lorem Ipsum',
//               slug: 'lorem-ipsum',
//               description: 'Lorem ipsum dolor sit amet.',
//               price: 19.99
//             },
//             {
//               id: 1,
//               name: 'Dolor sit',
//               slug: 'dolor-sit',
//               description: 'Lorem ipsum dolor sit amet.',
//               price: 39.99
//             }
//           ],
//           [
//             {
//               id: 43,
//               name: 'Lorem Ipsum 22',
//               slug: 'lorem-ipsum',
//               description: 'Lorem ipsum dolor sit amet.',
//               price: 49.99
//             },
//             {
//               id: 54,
//               name: 'Dolor sit 23',
//               slug: 'dolor-sit',
//               description: 'Lorem ipsum dolor sit amet.',
//               price: 59.99
//             }
//           ],
//         ]
//       }
//     ],
//     newProducts: [
//       {
//         id: 0,
//         name: 'Lorem Ipsum',
//         slug: 'lorem-ipsum',
//         description: 'Lorem ipsum dolor sit amet.',
//         price: 19.99
//       },
//       {
//         id: 1,
//         name: 'Dolor sit',
//         slug: 'dolor-sit',
//         description: 'Lorem ipsum dolor sit amet.',
//         price: 39.99
//       }
//     ],
//     cart: {
//       products: []
//     },
//     user: {
//       isAuthenticated: false,
//       username: '',
//       email: '',
//       firstName: '',
//       lastName: '',
//       lastLogin: null
//     },
//   }
//
//
//   fetchUserCredentials = () => {
//     Axios({
//       method: 'GET',
//       url: 'http://127.0.0.1:8000/api/user/'
//     })
//       .then(({data}) => {
//         if (this.unmounted) return;
//         if (data.isAuthenticated) {
//           this.setState({
//             user: data
//           })
//         } else {
//             this.setState({
//               user: {
//                 isAuthenticated: false,
//                 username: '',
//                 email: '',
//                 firstName: '',
//                 lastName: '',
//                 lastLogin: null
//               }
//             })
//         }
//       })
//   }
//
//   loginUser = (username, password) => {
//     Axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:8000/api/authenticate/',
//       data: {
//         username: username,
//         password: password
//       },
//     })
//       .then(({data}) => {
//         if (this.unmounted) return;
//         if (data.isAuthenticated) {
//           this.setState({
//             user: data
//           })
//         } else {
//           this.setState({
//             user: {
//               isAuthenticated: false,
//               username: '',
//               email: '',
//               firstName: '',
//               lastName: '',
//               lastLogin: null
//             }
//           })
//         }
//       })
//   }
//
//   addProductToCart = (product) => {
//     !this.inCart(product) && this.setState((prevState) => ({
//       cart: {...prevState.cart, products: [...prevState.cart.products, product]}
//     }));
//   }
//
//   deleteProductFromCart = (product) => {
//     this.inCart(product) && this.setState((prevState) => ({
//       cart: {...prevState.cart, products: prevState.cart.products.filter((item) => item.id !== product.id)}
//     }))
//   }
//
//   toggleCategories = (e, newState) => {
//     this.setState((prevState) => ({showCategories: newState !== undefined ? newState : !prevState.showCategories}));
//   }
//
//   componentWillUnmount() {
//     this.unmounted = true;
//   }
//
//   componentDidMount() {
//     this.fetchUserCredentials();
//   }
//
//   inCart = (product) => !!this.state.cart.products.find((item) => item.id === product.id);
//
//   getCategoryBySlug = (slug) => this.state.categories.find((category) => category.slug === slug);
//
//   openProfileSidebar = () => this.setState({profileSidebar: true});
//   closeProfileSidebar = () => this.setState({profileSidebar: false});
//
//   render() {
//     return (
//       <>
//         <Router>
//           <div className={styles.App}>
//             <NavBar
//               categories={this.state.categories}
//               showCategories={this.state.showCategories}
//               toggleCategories={this.toggleCategories}
//               openSidebar={this.openProfileSidebar}
//               user={this.state.user}
//             />
//             <Sidebar show={this.state.profileSidebar}
//                      close={this.closeProfileSidebar}
//                      title="Twoje konto">
//               <LinkButton onClick={this.closeProfileSidebar} to="/register" color="green">Rejestracja</LinkButton>
//               <LinkButton onClick={this.closeProfileSidebar} to="/login" color="green">Logowanie</LinkButton>
//             </Sidebar>
//             <Route exact path="/" component={() => <HomePage newProducts={this.state.newProducts}
//                                                              addProductToCart={this.addProductToCart}
//                                                              inCart={this.inCart} />
//             }/>
//             <Route path="/cart" component={() => <Cart cart={this.state.cart}
//                                                        addProductToCart={this.addProductToCart}
//                                                        deleteProductFromCart={this.deleteProductFromCart}
//                                                        inCart={this.inCart} />}
//             />
//             <Route exact path="/category/:slug/:page"
//                    component={({match}) => <Category match={match}
//                                                      getCategoryBySlug={this.getCategoryBySlug}
//                                                      inCart={this.inCart}
//                                                      addProductToCart={this.addProductToCart} />
//             }/>
//             <Route exact path="/product/:slug"
//                    component={({match}) => <Product match={match}
//                                                     inCart={this.inCart}
//                                                     addProductToCart={this.addProductToCart} />
//             } />
//             <Route exact path="/login"
//                    component={() => <Login loginUser={this.loginUser} />
//             } />
//             <Route exact path="/register"
//                    component={() => <Register />
//             } />
//           </div>
//         </Router>
//       </>
//     )
//   }
// }

export default App;
