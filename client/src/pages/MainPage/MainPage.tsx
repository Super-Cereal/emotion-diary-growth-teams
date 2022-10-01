import { useStore } from "effector-react";
import b_ from "b_";

import brain from "../../assets/icons/brain.png";
import bg from "../../assets/icons/bg.png";
import arrow from "../../assets/icons/Arrow.png";
import { $uuid } from "../../store/uuid";

import "./MainPage.scss";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { postPassword } from "../../store/register";
import { BaseInput } from "../../components/BaseInput/BaseInput";

export const b = b_.with("main-page");

export const MainPage = () => {
  const history = useHistory();
  const isAuth = Boolean(useStore($uuid));
  const [login, setLogin] = useState("");

  useEffect(() => {
    if (isAuth) {
      // history.push("/journal");
    }
  }, [isAuth]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPassword(login);
  };

  return (
    <main>
      <section className={b("section")}>
        <img src={brain} height={300} width={200} className={b("brain")} />
        <h2 className={b("header")}>Дневник эмоций</h2>
        <BaseButton
          className={b("button")}
          onClick={() => {
            window.scrollTo({
              top: 11110,
              behavior: "smooth",
            });
          }}
        >
          Принять участие
        </BaseButton>
      </section>
      <section className={b("sec")}>
        <img src={bg} alt="bg" height={300} width={200} className={b("bg")} />
        <img
          src={arrow}
          alt="arror"
          height={100}
          width={80}
          className={b("arrow")}
        />
      </section>
      <section>
        <form id="form" onSubmit={handleSubmit} className={b("form")}>
          <h3 className={b("h1")}>Как мне вас запомнить?</h3>
          <BaseInput
            name="login"
            placeholder="Погоняло"
            value={login}
            onChange={setLogin}
            className={b("input")}
          />
          <BaseButton className={b("btn")}>Перейти к дневнику</BaseButton>
        </form>
      </section>
    </main>
  );
};
