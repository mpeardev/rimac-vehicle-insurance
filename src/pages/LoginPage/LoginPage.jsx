import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/molecules/Header/Header";
import { UserContext } from "../../context/UserContext";
import "./login-page.scss";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { users, userRegistre, setUserRegistre } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const regexNum = /^[0-9]+/;
  const regexText = /^[a-zA-Z0-9 ]+$/;

  const toFilter = (p) => {
    const toFilt = p.dni;
    const rsp = users?.filter((user) => user.dni == toFilt);

    if (rsp == "") {
      alert("USUARIO NO ENCONTRADO");
    } else if (rsp != "") {
      fetch(
        `https://my-json-server.typicode.com/mirkoperamas/rimac-vehicle-insurance/dates/${rsp[0].id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...rsp[0],
            phone: p.phone,
            plate: p.plate,
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
      if (userRegistre) {
        navigate("/plan");
      }
    }
  };

  const onSubmit = (p) => {
    toFilter(p);
  };

  return (
    <div className="login">
      <Header />
      <section className="login__banner">
        <div>
          <div className="login__banner--deskimg">
            <img
              src="./src/assets/img/login/person-d.svg"
              alt="person-desktop"
            />
          </div>
          <div className="login__banner--text">
            <h5>¡Nuevo!</h5>
            <h1>
              Seguro<span className="login__banner--vehicular"> Vehicular</span>
              <span className="login__banner--tracking"> Tracking</span>
            </h1>
            <p>Cuentanos donde le haras seguimiento a tu seguro</p>
          </div>
          <div className="login__banner--copyright">
            <p>&copy; 2021 RIMAC Seguros y Reaseguros.</p>
          </div>
        </div>
        <img src="src\assets\img\login\person-m.svg" alt="person-mobile" />
      </section>

      <main className="login__form">
        <div>
          <div className="login__form--subtitle">
            <h2>Déjanos tus datos</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login__form--dates">
              <div>
                <div className="input">
                  <div>
                    <p>DNI</p>
                    <img
                      src="./src/assets/img/login/down-arrow.svg"
                      alt="down-arrow"
                    />
                  </div>
                  <input
                    type="number"
                    name="dni"
                    placeholder="Nro. de doc"
                    autoComplete="off"
                    {...register("dni", {
                      required: {
                        value: true,
                        message: "El campo es requerido",
                      },
                      pattern: {
                        value: regexNum,
                        message: "El formato es incorrecto",
                      },
                      minLength: {
                        value: 8,
                        message: "DNI invalido",
                      },
                      maxLength: {
                        value: 8,
                        message: "DNI invalido",
                      },
                    })}
                  />
                </div>
                <p>{errors.dni && <span>{errors.dni.message}</span>}</p>

                <div className="input">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Celular"
                    autoComplete="off"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "El campo es requerido",
                      },
                      pattern: {
                        value: regexNum,
                        message: "El formato es incorrecto",
                      },
                      minLength: {
                        value: 9,
                        message: "Numero de celular invalido",
                      },
                      maxLength: {
                        value: 9,
                        message: "Numero de celular invalido",
                      },
                    })}
                  />
                </div>
                <p>{errors.phone && <span>{errors.phone.message}</span>}</p>

                <div className="input">
                  <input
                    type="text"
                    name="plate"
                    placeholder="Placa"
                    autoComplete="off"
                    {...register("plate", {
                      required: {
                        value: true,
                        message: "El campo es requerido",
                      },
                      pattern: {
                        value: regexText,
                        message: "El formato es incorrecto",
                      },
                      minLength: {
                        value: 6,
                        message:
                          "Numero de placa invalido, debe contener 6 caracteres",
                      },
                      maxLength: {
                        value: 6,
                        message:
                          "Numero de placa invalido, debe contener 6 caracteres",
                      },
                    })}
                  />
                </div>
                <p>{errors.plate && <span>{errors.plate.message}</span>}</p>
              </div>
            </div>
            <div className="login__form--terms">
              <div>
                <input type="checkbox" required />
              </div>
              <small>
                Acepto la{" "}
                <span>Política de Protección de Datos personales</span> y los{" "}
                <span>Términos y Condiciones.</span>
              </small>
            </div>

            <div className="login__form--button">
              <button type="submit">Cotízalo</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
