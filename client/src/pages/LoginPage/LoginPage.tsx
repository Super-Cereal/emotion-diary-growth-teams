import b_ from "b_";
import React, { useState } from "react";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { BaseInput } from "../../components/BaseInput/BaseInput";
import { postLogin } from "../../store/login";

import "./LoginPage.scss";

export const b = b_.with("login-page");

export const LoginPage = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postLogin(name);
  };

  return (
    <form onSubmit={handleSubmit} className={b()}>
      <BaseInput
        name="name"
        placeholder="name"
        value={name}
        onChange={setName}
      />
      <BaseButton />
    </form>
  );
};
