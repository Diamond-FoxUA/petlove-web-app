import css from "./SearchField.module.css";
import Icon from "../Icon/Icon";

type SearchFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: SubmitEvent) => void;
  reset: () => void;
};

export default function SearchField({
  onChange,
  value,
  reset,
  onSubmit,
}: SearchFieldProps) {
  return (
    <form onSubmit={(e) => onSubmit(e.nativeEvent)} className={css.searchInputContainer}>
      <input
        type="text"
        className={css.searchInput}
        onChange={onChange}
        value={value}
        placeholder="Search"
      />
      <button type="submit" className={css.searchBtn}>
        <Icon iconName="icon-search" className={css.iconSearch} />
      </button>

      {value.length > 0 && (
        <button type="button" className={css.resetBtn} onClick={reset}>
          <Icon iconName="icon-cross-small" className={css.iconCross} />
        </button>
      )}
    </form>
  );
}
