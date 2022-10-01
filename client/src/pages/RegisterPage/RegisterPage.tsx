import b_ from "b_";
import React, { useState } from "react";
import { BaseButton } from "../../components/BaseButton/BaseButton";
import { BaseInput } from "../../components/BaseInput/BaseInput";
import { postPassword } from "../../store/register";

import "./RegisterPage.scss";

export const b = b_.with("register-page");

export const RegisterPage = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPassword(name);
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
