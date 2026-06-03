import Image from "next/image";
import css from "./not-found.module.css";
import catImg from "@/app/assets/images/mob/cat-404-mob.png";
import LinkButton from "./components/LinkButton/LinkButton";
import { NOTFOUND_CAT_IMG } from "./assets/images";

export default function NotFound() {
  const { one, two } = NOTFOUND_CAT_IMG;

  return (
    <section className={`container ${css.container}`}>
      <div className={css.wrapper}>
        <h1 className={css.heading}>
          4
          <span>
            <picture className={css.picture}>
              <source srcSet={`${one} 1x, ${two} 2x`}/>
              <Image
                className={css.image}
                width={116}
                height={117}
                src={catImg.src}
                alt="a fluffy orange cat"
              />
            </picture>
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
