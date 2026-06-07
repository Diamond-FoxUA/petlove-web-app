import { HERO_IMAGES } from "./assets/images";
import css from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const { desk, tab, mob } = HERO_IMAGES;

  return (
    <section className="container">
      <div className={css.heroTextContainer}>
        <h1>
          Take good <span className={css.accent}>care</span> of your small pets
        </h1>
        <p>
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>
      <div className={css.heroImageWrapper}>
        {/* mobile */}
        <Image
          src={mob.src}
          alt="A woman hugging her happy dog."
          className={`${css.heroImage} ${css.mobileOnly}`}
          priority
        />
        {/* tablet */}
        <Image
          src={tab.src}
          alt="A woman hugging her happy dog."
          className={`${css.heroImage} ${css.tabletOnly}`}
          priority
        />
        {/* desktop */}
        <Image
          src={desk.src}
          alt="A woman hugging her happy dog."
          className={`${css.heroImage} ${css.desktopOnly}`}
          priority
        />
      </div>
    </section>
  );
}
