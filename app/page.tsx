import { HERO_IMAGES } from "./assets/images";
import css from "./page.module.css";

export default function Home() {
  const { desk, tab, mob } = HERO_IMAGES;

  return (
    <section className="container">
      <div className={css.heroTextContainer}>
        <h1>
          Take good <em className={css.accent}>care</em> of your small pets
        </h1>
        <p>
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>
      <picture className={css.heroImageWrapper}>
        <source
          media="(min-width:1280px)"
          srcSet={`${desk.src1x} 1x, ${desk.src2x} 2x`}
        />
        <source
          media="(min-width:768px)"
          srcSet={`${tab.src1x} 1x, ${tab.src2x} 2x`}
        />
        <img
          className={css.heroImage}
          srcSet={`${mob.src1x} 1x, ${mob.src2x} 2x`}
          alt="A woman hugging her happy dog."
          loading="eager"
        />
      </picture>
    </section>
  );
}
