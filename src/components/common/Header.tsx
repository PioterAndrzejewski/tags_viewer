import classNames from "classnames";

import { Text } from "src/components/common/Text";
import { GithubIcon } from "../icons/Github";
import { StorybookIcon } from "../icons/Storybook";
import { Button } from "./Button";

type HeaderProps = {
  children: string;
  centered?: boolean;
};

export const Header = (props: HeaderProps) => {
  const { children, centered = true } = props;

  const links = [
    {
      linkTo: "https://github.com/PioterAndrzejewski/tags_viewer",
      Icon: GithubIcon,
    },
    {
      linkTo: "https://tags-viewer-storybook.piotr-andrzejewski.pl",
      Icon: StorybookIcon,
    },
  ];

  return (
    <header className={"mb-12"}>
      <nav className='flex flex-row justify-end items-end gap-4'>
        <Text variant='body-s'>by Piotr Andrzejewski, 2024</Text>
        {links.map((link) => {
          const Icon = link.Icon;
          return (
            <Button
              children={<Icon size={24} />}
              as='a'
              linkTo={link.linkTo}
              key={link.linkTo}
            />
          );
        })}
      </nav>
      <div
        className={classNames("mb-12 flex-row", {
          "flex flex-row justify-center": !!centered,
        })}
      >
        <Text variant='heading-m'>{children}</Text>
      </div>
    </header>
  );
};
