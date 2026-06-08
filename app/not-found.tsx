import Image from "next/image";
import css from "./not-found.module.css";
import LinkButton from "./shared/components/LinkButton/LinkButton";
import { NOTFOUND_CAT_IMG } from "./assets/images";

export default function NotFound() {
  const { mob, tab, desk } = NOTFOUND_CAT_IMG;

  return (
    <section className={`container ${css.container}`}>
      <div className={css.wrapper}>
        <h1 className={css.heading}>
          4
          <span>
            <div className={css.picture}>
              {/* mobile */}
              <Image
                className={`${css.image} ${css.mobileOnly}`}
                src={mob.src}
                alt="A fluffy orange cat."
                priority
              />
              {/* tablet */}
              <Image
                className={`${css.image} ${css.tabletOnly}`}
                src={tab.src}
                alt="A fluffy orange cat."
                priority
              />
              {/* desktop */}
              <Image
                className={`${css.image} ${css.desktopOnly}`}
                src={desk.src}
                alt="A fluffy orange cat."
                priority
              />
            </div>
          </span>
          4
        </h1>
        <p className={css.paragraph}>Ooops! This page not found :(</p>
        <LinkButton className={css.button} variant="secondary" href="/">
          To home page
        </LinkButton>
      </div>
    </section>
  );
}
