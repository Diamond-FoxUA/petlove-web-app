// import styles from "./page.module.css";
import { HERO_IMAGES } from "./assets/images";
import css from "./page.module.css";

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
      <picture className={css.heroPicture}>
        <source
          media="(min-width: 1280px)"
          srcSet={`${desk.src1x} 1x, ${desk.src2x} 2x`}
        />
        <source
          media="(min-width: 768px)"
          srcSet={`${tab.src1x} 1x, ${tab.src2x} 2x`}
        />
        <img
          src={mob.src1x}
          alt="A woman hugging her happy dog"
          srcSet={`${mob.src1x} 1x, ${mob.src2x} 2x`}
          className={css.heroImage}
          loading="eager"
        />
      </picture>
    </section>
  );
}
