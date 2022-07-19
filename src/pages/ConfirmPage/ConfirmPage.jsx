import React, { useContext } from "react";
import { Header } from "../../components/molecules/Header/Header";
import firstImage from "../../assets/img/end/personHappy.svg";
import "./confirm-page.scss";
import { UserContext } from "../../context/UserContext";

export const ConfirmPage = () => {
  const { userRegistre } = useContext(UserContext);

  return (
    <div className="confirm">
      <Header />
      <div>
        <section className="confirm__banner">
          <div className="confirm__banner--mobile">
            <img src="./src/assets/img/confirm/banner-m.svg" alt="banner-m" />
          </div>
          <div className="confirm__banner--desktop">
            <img src="./src/assets/img/confirm/banner-d.svg" alt="banner-d" />
          </div>
        </section>

        <main className="confirm__main">
          <div>
            <div className="confirm__main--title">
              <h1 className="confirm__main--title-resalt">
                ¡Te damos la bienvenida!
              </h1>
              <h1>Cuenta con nosotros para proteger tu vehículo</h1>
            </div>
            <div className="confirm__main--text">
              <p>
                Enviaremos la confirmación de compra de tu Plan Vehícular
                Tracking a tu correo:
              </p>
              <p className="confirm__main--text-email">{userRegistre.email}</p>

              <div className="confirm__main--text-values">
                <p className="confirm__main--text">
                  Seguro: $ {userRegistre.monthly}
                </p>
                <p className="confirm__main--text">
                  Monto: $ {userRegistre.amount.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="confirm__main--button">
              <button>Cómo usar mi seguro</button>
            </div>
          </div>
        </main>

        <div className="confirm__copyright">
          <small>&copy; 2021 RIMAC Seguros y Reaseguros.</small>
        </div>
      </div>
    </div>
  );
};
