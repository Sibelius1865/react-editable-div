type VProps = {
  value: string | number;
};
export const v = ({ value }: VProps) => {
  return <span data-value>{value}</span>;
};
