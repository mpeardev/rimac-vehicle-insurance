import React from "react";
import "./header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="header__logo">
          <img src="./src/assets/img/header/logo-rimac.svg" alt="logo-rimac" />
        </div>
        <div className="header__call">
          <p className="header__call-have">¿Tienes alguna duda?</p>
          <img src="./src/assets/img/header/phone.svg" alt="phone" />
          <p className="header__call-tocall">Llámanos</p>
          <p className="header__call-number">(01) 411 6001</p>
        </div>
      </div>
    </header>
  );
};
