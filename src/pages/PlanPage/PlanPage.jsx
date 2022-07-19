import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/molecules/Header/Header";
import { UserContext } from "../../context/UserContext";
import "./plan-page.scss";

export const PlanPage = () => {
  const { userRegistre, setUserRegistre } = useContext(UserContext);

  const navigate = useNavigate();

  const number = 12500;
  const amount = 20;

  const [value, setValue] = useState(number);
  const [result, setResult] = useState(amount);

  //    coberturas
  const [wheelCob, setWheelCob] = useState(false);
  const [wheelSwitch, setWheelSwitch] = useState("off");
  const [wheelAddButton, setWheelAddButton] = useState("flex");
  const [wheelRemoveButton, setWheelRemoveButton] = useState("none");
  const [shockCob, setShockCob] = useState(false);
  const [shockSwitch, setShockSwitch] = useState("off");
  const [shockAddButton, setShockAddButton] = useState("flex");
  const [shockRemoveButton, setShockRemoveButton] = useState("none");
  const [evitamientoCob, setEvitamientoCob] = useState(false);
  const [evitamientoSwitch, setEvitamientoSwitch] = useState("off");
  const [evitamientoAddButton, setEvitamientoAddButton] = useState("flex");
  const [evitamientoRemoveButton, setEvitamientoRemoveButton] =
    useState("none");

  const handleWheelCob = () => {
    if (wheelCob) {
      setResult(amount);
      setWheelSwitch("off");
      setWheelAddButton("flex");
      setWheelRemoveButton("none");
      setWheelCob(false);
    }
    if (!wheelCob) {
      setResult(amount + 15);
      setWheelSwitch("on");
      setWheelAddButton("none");
      setWheelRemoveButton("flex");
      setWheelCob(true);
    }
  };
  const handleShockCob = () => {
    if (value <= 16000) {
      if (shockCob) {
        setResult(amount);
        setShockSwitch("off");
        setShockAddButton("flex");
        setShockRemoveButton("none");
        setShockCob(false);
      }
      if (!shockCob) {
        setResult(amount + 20);
        setShockSwitch("on");
        setShockAddButton("none");
        setShockRemoveButton("flex");
        setShockCob(true);
      }
    }
  };

  const handleEvitamientoCob = () => {
    if (evitamientoCob) {
      setResult(amount);
      setEvitamientoSwitch("off");
      setEvitamientoAddButton("flex");
      setEvitamientoRemoveButton("none");
      setEvitamientoCob(false);
    }
    if (!evitamientoCob) {
      setResult(amount + 50);
      setEvitamientoSwitch("on");
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
      setShockSwitch("off");
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
              src="./src/assets/img/plan/left-arrow-m.svg"
              alt="left-arrow-m"
            />
            <p>Paso 2 de 2</p>
            <div></div>
          </div>

          <div className="plan__nav--stepper">
            <div className="plan__nav--ud">
              <img src="./src/assets/img/plan/one-icon.svg" alt="one-icon" />
              <p>Datos</p>
            </div>

            <div className="plan__nav--border"></div>

            <div className="plan__nav--ud">
              <img src="./src/assets/img/plan/two-icon.svg" alt="two-icon" />
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
                      src="./src/assets/img/plan/person-m.svg"
                      alt="person-mobile"
                    />
                    <img
                      className="plan__dates--card-imgD"
                      src="./src/assets/img/plan/person-d.svg"
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
                          src="./src/assets/img/plan/remove-b.svg"
                          alt="remove-b"
                        />
                      </span>
                      <p className="input__value">$ {numberImp(value)}</p>
                      <span onClick={handleAdd}>
                        <img
                          src="./src/assets/img/plan/add-b.svg"
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
                          src="./src/assets/img/plan/llanta-icon.svg"
                          alt="llanta-icon"
                        />
                      </div>
                      <p>Llanta robada</p>
                      <div className="plan__toppings--option-switch">
                        <img
                          src={`./src/assets/img/plan/switch-${wheelSwitch}.svg`}
                          alt="switch-on"
                          onClick={handleWheelCob}
                        />
                      </div>
                      <div className="plan__toppings--option-arrow">
                        <img
                          src="./src/assets/img/plan/top-arrow-d.svg"
                          alt="top-arrow-d"
                        />
                      </div>
                    </div>
                    <div className="plan__toppings--option-viewd">
                      <div onClick={handleWheelCob}>
                        <div style={{ display: `${wheelAddButton}` }}>
                          <img
                            src="./src/assets/img/plan/more-icon.svg"
                            alt="more-icon"
                          />
                          <p>Agregar</p>
                        </div>
                        <div style={{ display: `${wheelRemoveButton}` }}>
                          <img
                            src="./src/assets/img/plan/less-icon.svg"
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
                        src="./src/assets/img/plan/top-arrow-m.svg"
                        alt="top-arrow-m"
                      />
                    </div>
                  </div>
                  <div className="plan__toppings--option">
                    <div className="plan__toppings--option-bar">
                      <div className="plan__toppings--option-icon">
                        <img
                          src="./src/assets/img/plan/choque-icon.svg"
                          alt="llanta-icon"
                        />
                      </div>
                      <p>Choque y/o pasarte la luz roja</p>
                      <div className="plan__toppings--option-switch">
                        <img
                          src={`./src/assets/img/plan/switch-${shockSwitch}.svg`}
                          alt={`switch-${shockSwitch}`}
                          onClick={handleShockCob}
                        />
                      </div>
                      <div className="plan__toppings--option-arrow">
                        <img
                          src="./src/assets/img/plan/bottom-arrow-d.svg"
                          alt="bottom-arrow-d"
                        />
                      </div>
                    </div>
                    <div className="plan__toppings--option-viewd">
                      <div onClick={handleShockCob}>
                        <div style={{ display: `${shockAddButton}` }}>
                          <img
                            src="./src/assets/img/plan/more-icon.svg"
                            alt="more-icon"
                          />
                          <p>Agregar</p>
                        </div>
                        <div style={{ display: `${shockRemoveButton}` }}>
                          <img
                            src="./src/assets/img/plan/less-icon.svg"
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
                        src="./src/assets/img/plan/bottom-arrow-m.svg"
                        alt="bottom-arrow-m"
                      />
                    </div>
                  </div>
                  <div className="plan__toppings--option">
                    <div className="plan__toppings--option-bar">
                      <div className="plan__toppings--option-icon">
                        <img
                          src="./src/assets/img/plan/atropello-icon.svg"
                          alt="llanta-icon"
                        />
                      </div>
                      <p>Atropello en la vía Evitamiento</p>
                      <div className="plan__toppings--option-switch">
                        <img
                          src={`./src/assets/img/plan/switch-${evitamientoSwitch}.svg`}
                          alt={`switch-${evitamientoSwitch}`}
                          onClick={handleEvitamientoCob}
                        />
                      </div>
                      <div className="plan__toppings--option-arrow">
                        <img
                          src="./src/assets/img/plan/bottom-arrow-d.svg"
                          alt="bottom-arrow-d"
                        />
                      </div>
                    </div>
                    <div className="plan__toppings--option-viewd">
                      <div onClick={handleEvitamientoCob}>
                        <div style={{ display: `${evitamientoAddButton}` }}>
                          <img
                            src="./src/assets/img/plan/more-icon.svg"
                            alt="more-icon"
                          />
                          <p>Agregar</p>
                        </div>
                        <div style={{ display: `${evitamientoRemoveButton}` }}>
                          <img
                            src="./src/assets/img/plan/less-icon.svg"
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
                        src="./src/assets/img/plan/bottom-arrow-m.svg"
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
                        src="./src/assets/img/plan/check-icon.svg"
                        alt="check-icon"
                      />
                      <p>Llanta de respuesto</p>
                    </div>
                    <div>
                      <img
                        src="./src/assets/img/plan/check-icon.svg"
                        alt="check-icon"
                      />
                      <p>Analisis de motor</p>
                    </div>
                    <div>
                      <img
                        src="./src/assets/img/plan/check-icon.svg"
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
