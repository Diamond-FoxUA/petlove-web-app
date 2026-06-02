import heroDesk1x from "@/app/assets/images/desk/hero-bg-desk.jpg";
import heroDesk2x from "@/app/assets/images/desk/hero-bg-desk@2x.jpg";
import heroTab1x from "@/app/assets/images/tab/hero-bg-tab.jpg";
import heroTab2x from "@/app/assets/images/tab/hero-bg-tab@2x.jpg";
import heroMob1x from "@/app/assets/images/mob/hero-bg-mob.jpg";
import heroMob2x from "@/app/assets/images/mob/hero-bg-mob@2x.jpg";
import logoTab from "@/app/assets/logo/logo-tab.svg";
import logoTabAlt from "@/app/assets/logo/logo-tab-alt.svg";
import logoMob from "@/app/assets/logo/logo-mob.svg";
import logoMobAlt from "@/app/assets/logo/logo-mob-alt.svg";

export const HERO_IMAGES = {
  desk: { src1x: heroDesk1x.src, src2x: heroDesk2x.src },
  tab: { src1x: heroTab1x.src, src2x: heroTab2x.src },
  mob: { src1x: heroMob1x.src, src2x: heroMob2x.src },
};

export const LOGO_ICONS = {
  tab: { src: logoTab.src },
  tabAlt: { src: logoTabAlt.src },
  mob: { src: logoMob.src },
  mobAlt: { src: logoMobAlt.src },
};
