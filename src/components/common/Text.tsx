import classNames from "classnames";
import { CSSProperties } from "react";

type TextProps = {
  as?: React.ElementType;
  className?: string;
  style?: CSSProperties;
  children: string;
  variant?: keyof typeof variants;
};

const Elements: Record<keyof typeof variants, React.ElementType> = {
  "heading-m": "h1",
  "body-m": "p",
  "body-s": "p",
};

const variants: Record<string, string> = {
  "heading-m": "text-4xl",
  "body-m": "text-m",
  "body-s": "text-sm",
};

export const Text = (props: TextProps) => {
  const { as = "p", className, style, children, variant = "body-m" } = props;

  const DefaultElement = Elements[variant];
  const Element = as ?? DefaultElement;
  const variantClassnames = variants[variant];

  return (
    <Element
      style={{ ...style }}
      className={classNames({
        [variantClassnames]: !!variantClassnames,
        [className!]: !!className,
      })}
    >
      {children}
    </Element>
  );
};
