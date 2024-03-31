type ScreenProps = {
  header: string;
  children: React.ReactNode;
};

export const Screen = (props: ScreenProps) => {
  const { header, children } = props;
  return (
    <div className='flex flex-1 flex-col'>
      <header></header>
      <main>{children}</main>
    </div>
  );
};
