import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import styles from './Product.module.scss';
import { AddShoppingCart } from "@material-ui/icons";
import OpinionsList from "./OpinionsList/OpinionsList";
import Rating from "@material-ui/lab/Rating";
import animateScrollTo from "animated-scroll-to";
import {get_product} from "../../api";
import {useLocation} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MaterialLink from "@material-ui/core/Link";

function Product(props) {
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [sections, setSections] = useState({opinions: true,});
  const [opinionsAnimationTime, setOpinionsAnimationTime] = useState('auto');
  const [opinionsAmount, setOpinionsAmount] = useState(0);
  const [error, setError] = useState(false);

  const fetchProductData = () => {
    get_product(props.match.params.slug)
      .then(({data, status}) => {
        setProduct({...data.product, category: {name: data.category.name}});
        setOpinionsAmount(data.opinionsAmount || 0);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
  }

  useEffect(() => {
    fetchProductData();
  }, [props.location]);

  const toggleOpinions = (newState) => setSections({
    ...sections,
    opinions: typeof newState !== "boolean" ? !sections.opinions : newState
  });

  return (
    <>
      {
        product && (
          <>
            <section className={styles.ProductWrapper}>
              <Breadcrumbs aria-label="breadcrumb">
                <MaterialLink color="inherit" href="/">
                  plantreningowy.pl
                </MaterialLink>
                <MaterialLink>
                  {}
                </MaterialLink>
              </Breadcrumbs>
              <h1 className={styles.ProductName}>{product.name}</h1>
              <div className={styles.ProductRating}>
                <Rating name="half-rating-read" value={parseFloat(product.rating)} precision={0.5} readOnly />
                <div onClick={() => {
                  setOpinionsAnimationTime(0);
                  toggleOpinions(true);
                  setOpinionsAnimationTime('auto');
                  animateScrollTo(document.querySelector('#opinions').offsetTop - 35)
                }}
                     className={styles.OpinionsAmount}>
                  ({opinionsAmount})</div>
              </div>
              <p>{product.description}</p>
              <div className={styles.ProductPrice}>{product.price} zł</div>
              <button className={styles.AddToCart}
                      onClick={() => props.addProductToCart(product)} >
                <div className={styles.BtnText}>Dodaj do koszyka</div>
                <div className={styles.BtnIcon}>
                  <AddShoppingCart />
                </div>
              </button>
            </section>
            <OpinionsList show={sections.opinions}
                          toggle={toggleOpinions}
                          animationTime={opinionsAnimationTime}
                          productSlug={props.match.params.slug}
                          incrementOpinionsAmount={() => setOpinionsAmount(opinionsAmount + 1)}
            />
          </>
        )
      }
      {
        !product && !error && <Loading/>
      }
      {
        error && <div className={styles.Error}>Podany produkt nie został znaleziony</div>
      }
    </>
  )
}

export default Product;