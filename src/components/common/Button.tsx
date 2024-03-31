import classNames from "classnames";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
};

export const Button = (props: ButtonProps) => {
  const { onClick, disabled } = props;

  const handleClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={classNames("p-1", {
        "hover:bg-blue-100 hover:rounded-full cursor-pointer": !disabled,
        "opacity-25": !!disabled,
      })}
    >
      {props.children}
    </div>
  );
};
