type Props = {
  size?: number;
  color?: string;
};

export const ChevronLeftIcon = ({ size = 20, color }: Props): JSX.Element => {
  const colorToUse = color || "#6e6e6e";

  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path
        d='M14 7L9 12L14 17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
        stroke={colorToUse}
      />
    </svg>
  );
};
