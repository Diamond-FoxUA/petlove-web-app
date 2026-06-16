import css from "./not-found.module.css";
import LinkButton from "./shared/components/LinkButton/LinkButton";
import { NOTFOUND_CAT_IMG } from "./assets/images";

export default function NotFound() {
  const { mob, tab, desk } = NOTFOUND_CAT_IMG;

  return (
    <div className={`container ${css.container}`}>
      <div className={css.wrapper}>
        <h1 className={css.heading} aria-label="Error 404">
          4
          <span aria-hidden>
            <picture className={css.picture}>
              <source
                media="(min-width:1280px)"
                srcSet={`${desk.src1x} 1x, ${desk.src2x} 2x`}
              />
              <source
                media="(min-width:768px)"
                srcSet={`${tab.src1x} 1x, ${tab.src2x} 2x`}
              />
              <img
                srcSet={`${mob.src1x} 1x, ${mob.src2x} 2x`}
                alt="A fluffy orange cat."
                loading="eager"
                className={css.image}
              />
            </picture>
          </span>
          4
        </h1>
        <p className={css.paragraph}>Ooops! This page not found :(</p>
        <LinkButton className={css.button} color="secondary" href="/">
          To home page
        </LinkButton>
      </div>
    </div>
  );
}
