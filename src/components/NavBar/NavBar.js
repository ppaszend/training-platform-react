import React from "react";
import styles from './NavBar.module.scss';
import { faBars, faSearch, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton/IconButton";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <>
      <header className={styles.header}>
        <IconButton icon={faBars} onClick={props.toggleCategories} />
        <Link to="/" className={styles.logo}><h1>PLANTRENINGOWY</h1></Link>
        <span className={styles.separator} />
        <IconButton onClick={() => props.setSearchModal(true)} icon={faSearch} />
        <IconButton onClick={props.openSidebar} icon={faUser} />
        <Link to="/cart"><IconButton icon={faShoppingCart} /></Link>
      </header>
    </>
  )
}

export default NavBar;