type IconProps = {
  iconName: string;
  size: number;
  className?: string;
};

export default function Icon({ iconName, size, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className || ""}>
      <use href={`/sprite.svg#${iconName}`}></use>
    </svg>
  );
}
