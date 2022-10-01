import b_ from "b_";

import "./BaseInput.scss";

export const b = b_.with("base-input");

interface BaseInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export const BaseInput = ({
  name,
  placeholder,
  value,
  onChange,
}: BaseInputProps) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      className={b()}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};
