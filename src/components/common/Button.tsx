import classNames from "classnames";
import { SyntheticEvent } from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
};

export const Button = (props: ButtonProps) => {
  const { onClick, disabled } = props;

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || !onClick) return;
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={classNames("p-1", {
        "hover:bg-blue-100 hover:rounded-full cursor-pointer": !disabled,
        "opacity-25": !!disabled,
      })}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};
