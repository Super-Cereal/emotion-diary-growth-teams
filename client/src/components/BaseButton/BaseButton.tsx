import b_ from "b_";

import "./BaseButton.scss";

export const b = b_.with("base-button");

export const BaseButton = () => {
  return <button className={b()}>Button</button>;
};
