import React, {useEffect} from "react";
import styles from './NavBar.module.scss';
import { faBars, faSearch, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton/IconButton";
import { Link, useLocation } from "react-router-dom";

function NavBar({ toggleCategories, showCategories, categories }) {
  let location = useLocation();

  useEffect(
    (props) => {
      toggleCategories(undefined, false);
    }, [location.pathname]
  )

  return (
    <>
      <header className={styles.header}>
        <IconButton icon={faBars} onClick={toggleCategories} />
        <Link to="/" className={styles.logo}><h1>PLANTRENINGOWY</h1></Link>
        <span className={styles.separator} />
        <IconButton icon={faSearch} />
        <IconButton icon={faUser} />
        <Link to="/cart"><IconButton icon={faShoppingCart} /></Link>
      </header>

      {
        <nav className={`${showCategories ? '' : styles.hidden} ${styles.categoriesNav}`}>
          <ul>
            {
              categories.map(({id, name, slug}) => (
                <li key={id}><Link to={`/category/${slug}/1`}><span>{name}</span></Link></li>
              ))
            }
          </ul>
        </nav>
      }
    </>
  )
}

export default NavBar;