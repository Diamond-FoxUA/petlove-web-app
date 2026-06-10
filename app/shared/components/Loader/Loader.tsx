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
        <picture>
          <Image
            className={css.backgroundImgDesk}
            width={1280}
            height={800}
            src={desk.src}
            alt="A veterinarian checking a beagle's ear while a woman looks on and smiles."
          />
          <Image
            className={css.backgroundImgTab}
            width={768}
            height={1024}
            src={tab.src}
            alt="A veterinarian checking a beagle's ear while a woman looks on and smiles."
          />
          <Image
            className={css.backgroundImgMob}
            width={375}
            height={812}
            src={mob.src}
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
