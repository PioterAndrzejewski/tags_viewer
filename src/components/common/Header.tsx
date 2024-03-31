import classNames from "classnames";

import { Text } from "src/components/common/Text";

type HeaderProps = {
  children: string;
  centered?: boolean;
};

export const Header = (props: HeaderProps) => {
  const { children, centered = true } = props;
  return (
    <header
      className={classNames("mb-12", {
        "flex flex-row justify-center": !!centered,
      })}
    >
      <Text variant='heading-m'>{children}</Text>
    </header>
  );
};
