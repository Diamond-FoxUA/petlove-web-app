type IconProps = {
  iconName: string;
  className?: string;
};

export default function Icon({ iconName, className }: IconProps) {
  return (
    <svg className={className || ""}>
      <use href={`/sprite.svg#${iconName}`}></use>
    </svg>
  );
}
