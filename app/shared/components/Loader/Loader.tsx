import Image from "next/image";
import { LOGO_ICONS } from "@/app/assets/images";
import { LOADER_IMAGES } from "@/app/assets/images";
import css from "./Loader.module.css";

export const metadata = {
  other: {
    rel: "preload",
    as: "image",
    href: LOADER_IMAGES.mob.src1x,
    fetchpriority: "high",
  },
};

export default function Loader() {
  const { loaderTab, loaderMob } = LOGO_ICONS;
  const { mob, tab, desk } = LOADER_IMAGES;

  return (
    <div
      className={css.loaderContainer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loader-status"
    >
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
            alt=""
            fetchPriority="high"
          />
        </picture>

        <div className={css.loaderImg} role="status" aria-live="polite">
          <span id="loader-status" className="sr-only">
            Loading Petlove application, please wait...
          </span>

          <Image
            src={loaderMob.src}
            alt=""
            width={190}
            height={50}
            className={css.logoImgMob}
            loading="eager"
          />
          <Image
            src={loaderTab.src}
            alt=""
            width={374}
            height={100}
            className={css.logoImgTab}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
