import classNames from "classnames";
import { SyntheticEvent } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  as?: "button" | "a";
  linkTo?: string;
};

export const Button = (props: ButtonProps) => {
  const { onClick, disabled = false, as = "button", linkTo } = props;

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || !onClick) return;
    onClick();
  };

  const Element = as;

  return (
    <Element
      onClick={as === "button" ? handleClick : undefined}
      href={as === "a" ? linkTo : undefined}
      className={classNames("p-1", {
        "hover:bg-blue-100 hover:rounded-full cursor-pointer": !disabled,
        "opacity-25": !!disabled,
      })}
      disabled={disabled}
    >
      {props.children}
    </Element>
  );
};
