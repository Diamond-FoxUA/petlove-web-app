import Image from "next/image";
import { LOGO_ICONS } from "@/app/assets/images";
import { LOADER_IMAGES } from "@/app/assets/images";
import css from "./Loader.module.css";

export default function Loader() {
  const { loaderTab, loaderMob } = LOGO_ICONS;
  const { mob, tab, desk } = LOADER_IMAGES;

  return (
    <div className={css.loaderContainer}>
      <div className={css.backgroundWrapper}>
        <picture className={css.backgroundImg}>
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
            alt="A veterinarian checking a beagle's ear while a woman looks on and smiles."
          />
        </picture>
        
        <div className={css.loaderImg}>
          <Image
            src={loaderMob.src}
            alt="Petlove logo"
            width={190}
            height={50}
            className={css.logoImgMob}
          />
          <Image
            src={loaderTab.src}
            alt="Petlove logo"
            width={374}
            height={100}
            className={css.logoImgTab}
          />
        </div>
      </div>
    </div>
  );
}
