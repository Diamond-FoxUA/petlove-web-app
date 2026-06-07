import css from "./PetBlock.module.css";
import Icon from "../Icon/Icon";

type ImageSrcs = {
  src1x: string;
  src2x: string;
};

type PetBlockProps = {
  alt: string;
  mob: ImageSrcs;
  tab: ImageSrcs;
  desk: ImageSrcs;
  isRegister?: boolean;
};

export default function PetBlock({
  mob,
  tab,
  desk,
  alt,
  isRegister = true,
}: PetBlockProps) {
  const altStyles = alt.trim().toLowerCase().includes("dog");

  return (
    <div className={`${css.background} ${altStyles ? css.altStyle : ""}`}>
      <Icon className={css.backgroundElement} iconName="img-background" />
      {!altStyles && (
        <div className={css.infoCard}>
          <span className={css.cardAvatar}>{isRegister ? "🐈" : "🐶"}</span>
          <div className={css.text}>
            <div className={css.topText}>
              <h2 className={css.heading}>{isRegister ? "Jack" : "Rich"}</h2>
              <p className={css.bDay}>
                <span className={css.accent}>Birthday:</span>
                {isRegister ? "18.10.2021" : "21.09.2020"}
              </p>
            </div>
            <p className={css.paragraph}>
              {isRegister
                ? "Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys."
                : "Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"}
            </p>
          </div>
        </div>
      )}
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
          width={334}
          height={280}
          className={css.image}
          srcSet={`${mob.src1x} 1x, ${mob.src2x} 2x`}
          alt={alt}
          loading="eager"
        />
      </picture>
    </div>
  );
}
