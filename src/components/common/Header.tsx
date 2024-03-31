import { Text } from "src/components/common/Text";

type HeaderProps = {
  children: string;
};

export const Header = (props: HeaderProps) => {
  const { children } = props;
  return <Text variant='body-m'>{children}</Text>;
};
