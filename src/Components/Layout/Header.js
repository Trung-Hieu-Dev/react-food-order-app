import React from "react";

import mealsImage from "../assets/meals.jpg";
import classes from "./Header.module.css";

export const Header = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Food Shop</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="meals" />
      </div>
    </React.Fragment>
  );
};
