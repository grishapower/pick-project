import { useState } from "react";
import { Text } from "../Text";
import "./toggle.css";

type Props = {
  label: string;
  toggled: boolean;
  onClick: (v: boolean) => void;
};

export const Toggle = ({ label, toggled, onClick }: Props) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);

    onClick(!isToggled);
  };

  return (
    <label className="toggle_wrap">
      <Text className="toggle_label">{label}</Text>
      <input
        className="toggle_input"
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
      />
      <span className="toggle_circle" />
    </label>
  );
};
