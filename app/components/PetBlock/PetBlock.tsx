import css from "./PetBlock.module.css";
import Icon from "../Icon/Icon";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type ImageSrc = {
  src: StaticImageData;
};

type PetBlockProps = {
  alt: string;
  mob: ImageSrc;
  tab: ImageSrc;
  desk: ImageSrc;
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
      <div className={css.picture}>
        {/* mobile */}
        <Image
          className={`${css.image} ${css.mobileOnly}`}
          src={mob.src}
          alt={alt}
          priority
        />
        {/* tablet */}
        <Image
          className={`${css.image} ${css.tabletOnly}`}
          src={tab.src}
          alt={alt}
          priority
        />
        {/* desktop */}
        <Image
          className={`${css.image} ${css.desktopOnly}`}
          src={desk.src}
          alt={alt}
          priority
        />
      </div>
    </div>
  );
}
