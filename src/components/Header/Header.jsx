import React from "react";
import "./header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="header__logo">
          <img
            src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225560/mirko/header/logo-rimac_vnlcoh.svg"
            alt="logo-rimac"
          />
        </div>
        <div className="header__call">
          <p className="header__call-have">¿Tienes alguna duda?</p>
          <img
            src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225561/mirko/header/phone_l8jbsz.svg"
            alt="phone"
          />
          <p className="header__call-tocall">Llámanos</p>
          <p className="header__call-number">(01) 411 6001</p>
        </div>
      </div>
    </header>
  );
};
