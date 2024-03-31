type Props = {
  size?: number;
  color?: string;
  fill?: string;
};

export const CrossIcon = ({ size = 20, color, fill }: Props): JSX.Element => {
  const colorToUse = color || "#b82b2b";

  return (
    <svg width={size} height={size} viewBox='0 0 24 24 ' fill='none'>
      <path
        d='M19 5L5 19'
        stroke={colorToUse}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5 5L19 19'
        stroke={colorToUse}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
