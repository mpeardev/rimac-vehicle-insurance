import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { UserContext } from "../../context/UserContext";
import "./plan-page.scss";

export const PlanPage = () => {
  const { userRegistre, setUserRegistre } = useContext(UserContext);

  const navigate = useNavigate();

  const number = 12500;
  const amount = 20;

  const [value, setValue] = useState(number);
  const [result, setResult] = useState(amount);

  const on =
    "https://res.cloudinary.com/do4vup4zf/image/upload/v1658225568/mirko/plan/switch-on_cl8fn3.svg";
  const off =
    "https://res.cloudinary.com/do4vup4zf/image/upload/v1658225567/mirko/plan/switch-off_ixgkn7.svg";

  //    coberturas
  const [wheelCob, setWheelCob] = useState(false);
  const [wheelSwitch, setWheelSwitch] = useState(off);
  const [wheelAddButton, setWheelAddButton] = useState("flex");
  const [wheelRemoveButton, setWheelRemoveButton] = useState("none");
  const [shockCob, setShockCob] = useState(false);
  const [shockSwitch, setShockSwitch] = useState(off);
  const [shockAddButton, setShockAddButton] = useState("flex");
  const [shockRemoveButton, setShockRemoveButton] = useState("none");
  const [evitamientoCob, setEvitamientoCob] = useState(false);
  const [evitamientoSwitch, setEvitamientoSwitch] = useState(off);
  const [evitamientoAddButton, setEvitamientoAddButton] = useState("flex");
  const [evitamientoRemoveButton, setEvitamientoRemoveButton] =
    useState("none");

  const handleWheelCob = () => {
    if (wheelCob) {
      setResult(amount);
      setWheelSwitch(off);
      setWheelAddButton("flex");
      setWheelRemoveButton("none");
      setWheelCob(false);
    }
    if (!wheelCob) {
      setResult(amount + 15);
      setWheelSwitch(on);
      setWheelAddButton("none");
      setWheelRemoveButton("flex");
      setWheelCob(true);
    }
  };
  const handleShockCob = () => {
    if (value <= 16000) {
      if (shockCob) {
        setResult(amount);
        setShockSwitch(off);
        setShockAddButton("flex");
        setShockRemoveButton("none");
        setShockCob(false);
      }
      if (!shockCob) {
        setResult(amount + 20);
        setShockSwitch(on);
        setShockAddButton("none");
        setShockRemoveButton("flex");
        setShockCob(true);
      }
    }
  };

  const handleEvitamientoCob = () => {
    if (evitamientoCob) {
      setResult(amount);
      setEvitamientoSwitch(off);
      setEvitamientoAddButton("flex");
      setEvitamientoRemoveButton("none");
      setEvitamientoCob(false);
    }
    if (!evitamientoCob) {
      setResult(amount + 50);
      setEvitamientoSwitch(on);
      setEvitamientoAddButton("none");
      setEvitamientoRemoveButton("flex");
      setEvitamientoCob(true);
    }
  };

  const handleAdd = () => {
    if (value < 16500) {
      setValue(value + 100);
    }
  };
  const handleSubstract = () => {
    if (value > 12500) {
      setValue(value - 100);
    }
  };

  const getAmount = useMemo(() => {
    let firstAmount = amount;
    if (wheelCob) {
      firstAmount = firstAmount + 15;
    }
    if (shockCob) {
      firstAmount = firstAmount + 20;
    }
    if (evitamientoCob) {
      firstAmount = firstAmount + 50;
    }
    setResult(firstAmount);
    return amountImp(firstAmount);
  }, [wheelCob, shockCob, evitamientoCob]);

  function numberImp(number) {
    const str = number.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }
  function amountImp(amount) {
    const imp = amount.toFixed(2);
    return imp;
  }

  const toConfirm = () => {
    fetch(
      `https://my-json-server.typicode.com/mirkoperamas/rimac-vehicle-insurance/dates/${userRegistre.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...userRegistre,
          monthly: number,
          amount: amount,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setUserRegistre(data))
      .catch((err) => {
        throw new Error(err);
      });
    if (Object.keys(userRegistre).length == 11) {
      navigate("/confirm");
    }
  };

  useEffect(() => {
    if (value > 16000) {
      setResult(amount);
      setShockSwitch(off);
      setShockAddButton("flex");
      setShockRemoveButton("none");
      setShockCob(false);
    }
  }, [value]);

  return (
    <div className="plan">
      <Header />
      <div>
        <section className="plan__nav">
          <div className="plan__nav--bar">
            <img
              src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/left-arrow-m_zazigi.svg"
              alt="left-arrow-m"
            />
            <p>Paso 2 de 2</p>
            <div></div>
          </div>

          <div className="plan__nav--stepper">
            <div className="plan__nav--ud">
              <img
                src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225566/mirko/plan/one-icon_xjlb2x.svg"
                alt="one-icon"
              />
              <p>Datos</p>
            </div>

            <div className="plan__nav--border"></div>

            <div className="plan__nav--ud">
              <img
                src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225569/mirko/plan/two-icon_x0uzb8.svg"
                alt="two-icon"
              />
              <p>Arma tu plan</p>
            </div>
          </div>
        </section>

        <div className="plan__main">
          <div>
            <div>
              <section className="plan__dates">
                <div>
                  <div className="plan__dates--look">
                    <h1>Mira las coberturas</h1>
                  </div>
                  <div className="plan__dates--hello">
                    <h1>
                      Hola, <span>{userRegistre.username}!</span>
                    </h1>
                  </div>
                  <h5>Conoce las coberturas para tu plan</h5>
                  <div className="plan__dates--card">
                    <p>Placa: {userRegistre.plate.toUpperCase()}</p>
                    <h3>
                      {userRegistre.model} {userRegistre.age}
                    </h3>
                    <img
                      className="plan__dates--card-imgM"
                      src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225567/mirko/plan/person-m_mqdgjy.svg"
                      alt="person-mobile"
                    />
                    <img
                      className="plan__dates--card-imgD"
                      src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225566/mirko/plan/person-d_n1lumy.svg"
                      alt="person-desktop"
                    />
                  </div>
                </div>
              </section>

              <div className="plan__indicator">
                <div>
                  <div>
                    <h3>Indica la suma asegurada</h3>
                    <h4>
                      min $12.500<span> | </span>max $16.500
                    </h4>
                  </div>
                  <div className="plan__indicator-input">
                    <div className="input">
                      <span onClick={handleSubstract}>
                        <img
                          src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225567/mirko/plan/remove-b_i3wsen.svg"
                          alt="remove-b"
                        />
                      </span>
                      <p className="input__value">$ {numberImp(value)}</p>
                      <span onClick={handleAdd}>
                        <img
                          src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225562/mirko/plan/add-b_fzpj3v.svg"
                          alt="add-b"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <main className="plan__toppings">
                <div className="plan__toppings--subtitle">
                  <h2>Agrega o quita coberturas</h2>
                </div>
                <div className="plan__toppings--tabs">
                  <h5 className="plan__toppings--tabs-selected">
                    Protege a tu auto
                  </h5>
                  <h5 style={{ padding: "0 10px" }}>
                    Protege a los que te rodean
                  </h5>
                  <h5>Mejora tu plan</h5>
                </div>

                <div className="plan__toppings--info">
                  <div className="plan__toppings--option">
                    <div className="plan__toppings--option-bar">
                      <div className="plan__toppings--option-icon">
                        <img
                          src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225566/mirko/plan/llanta-icon_deidki.svg"
                          alt="llanta-icon"
                        />
                      </div>
                      <p>Llanta robada</p>
                      <div className="plan__toppings--option-switch">
                        <img
                          src={wheelSwitch}
                          alt="switch"
                          onClick={handleWheelCob}
                        />
                      </div>
                      <div className="plan__toppings--option-arrow">
                        <img
                          src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225568/mirko/plan/top-arrow-d_es8blc.svg"
                          alt="top-arrow-d"
                        />
                      </div>
                    </div>
                    <div className="plan__toppings--option-viewd">
                      <div onClick={handleWheelCob}>
                        <div style={{ display: `${wheelAddButton}` }}>
                          <img
                            src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225566/mirko/plan/more-icon_v5p3kz.svg"
                            alt="more-icon"
                          />
                          <p>Agregar</p>
                        </div>
                        <div style={{ display: `${wheelRemoveButton}` }}>
                          <img
                            src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225565/mirko/plan/less-icon_i6jkrn.svg"
                            alt="less-icon"
                          />
                          <p>Quitar</p>
                        </div>
                      </div>
                    </div>
                    <div className="plan__toppings--option-text">
                      <p>
                        He salido de casa a las cuatro menos cinco para ir a la
                        academia de ingles de mi pueblo (Sant Cugat, al lado de
                        Barcelona) con mi bici, na llego a la academia que está
                        en el centro del pueblo en una plaza medio-grande y dejo
                        donde siempre la bici atada con una pitón a un sitio de
                        esos de poner las bicis
                      </p>
                    </div>
                    <div className="plan__toppings--option-viewm">
                      <small className="plan__toppings--option-less">
                        Ver menos
                      </small>
                      <img
                        src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225568/mirko/plan/top-arrow-m_pgho7p.svg"
                        alt="top-arrow-m"
                      />
                    </div>
                  </div>
                  <div className="plan__toppings--option">
                    <div className="plan__toppings--option-bar">
                      <div className="plan__toppings--option-icon">
                        <img
                          src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/choque-icon_martj3.svg"
                          alt="llanta-icon"
                        />
                      </div>
                      <p>Choque y/o pasarte la luz roja</p>
                      <div className="plan__toppings--option-switch">
                        <img
                          src={shockSwitch}
                          alt="switch"
                          onClick={handleShockCob}
                        />
                      </div>
                      <div className="plan__toppings--option-arrow">
                        <img
                          src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/bottom-arrow-d_cg3q84.svg"
                          alt="bottom-arrow-d"
                        />
                      </div>
                    </div>
                    <div className="plan__toppings--option-viewd">
                      <div onClick={handleShockCob}>
                        <div style={{ display: `${shockAddButton}` }}>
                          <img
                            src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225566/mirko/plan/more-icon_v5p3kz.svg"
                            alt="more-icon"
                          />
                          <p>Agregar</p>
                        </div>
                        <div style={{ display: `${shockRemoveButton}` }}>
                          <img
                            src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225565/mirko/plan/less-icon_i6jkrn.svg"
                            alt="less-icon"
                          />
                          <p>Quitar</p>
                        </div>
                      </div>
                    </div>
                    <div className="plan__toppings--option-viewm">
                      <small className="plan__toppings--option-more">
                        Ver mas
                      </small>
                      <img
                        src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/bottom-arrow-m_jqi5lm.svg"
                        alt="bottom-arrow-m"
                      />
                    </div>
                  </div>
                  <div className="plan__toppings--option">
                    <div className="plan__toppings--option-bar">
                      <div className="plan__toppings--option-icon">
                        <img
                          src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225563/mirko/plan/atropello-icon_ntzzil.svg"
                          alt="llanta-icon"
                        />
                      </div>
                      <p>Atropello en la vía Evitamiento</p>
                      <div className="plan__toppings--option-switch">
                        <img
                          src={evitamientoSwitch}
                          alt="switch"
                          onClick={handleEvitamientoCob}
                        />
                      </div>
                      <div className="plan__toppings--option-arrow">
                        <img
                          src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/bottom-arrow-d_cg3q84.svg"
                          alt="bottom-arrow-d"
                        />
                      </div>
                    </div>
                    <div className="plan__toppings--option-viewd">
                      <div onClick={handleEvitamientoCob}>
                        <div style={{ display: `${evitamientoAddButton}` }}>
                          <img
                            src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225566/mirko/plan/more-icon_v5p3kz.svg"
                            alt="more-icon"
                          />
                          <p>Agregar</p>
                        </div>
                        <div style={{ display: `${evitamientoRemoveButton}` }}>
                          <img
                            src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225565/mirko/plan/less-icon_i6jkrn.svg"
                            alt="less-icon"
                          />
                          <p>Quitar</p>
                        </div>
                      </div>
                    </div>
                    <div className="plan__toppings--option-viewm">
                      <small className="plan__toppings--option-more">
                        Ver mas
                      </small>
                      <img
                        src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/bottom-arrow-m_jqi5lm.svg"
                        alt="bottom-arrow-m"
                      />
                    </div>
                  </div>
                </div>
              </main>
            </div>

            <div className="plan__result">
              <div>
                <div className="plan__result--amount">
                  <p>Monto</p>
                  <h4>${getAmount}</h4>
                  <h5>Mensual</h5>
                  <h6>mensuales</h6>
                </div>
                <div className="plan__result--included">
                  <h5>El precio incluye:</h5>
                  <div className="plan__result--included-checks">
                    <div>
                      <img
                        src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/check-icon_sgkde3.svg"
                        alt="check-icon"
                      />
                      <p>Llanta de respuesto</p>
                    </div>
                    <div>
                      <img
                        src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/check-icon_sgkde3.svg"
                        alt="check-icon"
                      />
                      <p>Analisis de motor</p>
                    </div>
                    <div>
                      <img
                        src="https://res.cloudinary.com/do4vup4zf/image/upload/v1658225564/mirko/plan/check-icon_sgkde3.svg"
                        alt="check-icon"
                      />
                      <p>Aros gratis</p>
                    </div>
                  </div>
                </div>
                <div className="plan__result--button">
                  <button onClick={toConfirm}>Lo quiero</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
