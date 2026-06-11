// Hero image imports

import heroDesk1x from "@/app/assets/images/desk/hero-bg-desk.webp";
import heroDesk2x from "@/app/assets/images/desk/hero-bg-desk@2x.webp";
import heroTab1x from "@/app/assets/images/tab/hero-bg-tab.webp";
import heroTab2x from "@/app/assets/images/tab/hero-bg-tab@2x.webp";
import heroMob1x from "@/app/assets/images/mob/hero-bg-mob.webp";
import heroMob2x from "@/app/assets/images/mob/hero-bg-mob@2x.webp";

// Logo image imports

import logoTab from "@/app/assets/logo/logo-tab.svg";
import logoTabAlt from "@/app/assets/logo/logo-tab-alt.svg";
import logoMob from "@/app/assets/logo/logo-mob.svg";
import logoMobAlt from "@/app/assets/logo/logo-mob-alt.svg";

import logoTabLoader from "@/app/assets/logo/logo-tab-loader.svg";
import logoMobLoader from "@/app/assets/logo/logo-mob-loader.svg";

// Loader image imports

import loaderMob1x from "@/app/assets/images/mob/loading-bg-mob.webp";
import loaderMob2x from "@/app/assets/images/mob/loading-bg-mob@2x.webp";
import loaderTab1x from "@/app/assets/images/tab/loading-bg-tab.webp";
import loaderTab2x from "@/app/assets/images/tab/loading-bg-tab@2x.webp";
import loaderDesk1x from "@/app/assets/images/desk/loading-bg-desk.webp";
import loaderDesk2x from "@/app/assets/images/desk/loading-bg-desk@2x.webp";

// Not Found page image imports

import notFoundMob1x from "@/app/assets/images/mob/cat-404-mob.webp";
import notFoundMob2x from "@/app/assets/images/mob/cat-404-mob@2x.webp";
import notFoundTab1x from "@/app/assets/images/tab/cat-404-tab.webp";
import notFoundTab2x from "@/app/assets/images/tab/cat-404-tab@2x.webp";
import notFoundDesk1x from "@/app/assets/images/desk/cat-404-desk.webp";
import notFoundDesk2x from "@/app/assets/images/desk/cat-404-desk@2x.webp";

// PetBlock image imports

// Registration
import petBlockRegMob1x from "@/app/assets/images/mob/cat-mob.webp";
import petBlockRegMob2x from "@/app/assets/images/mob/cat-mob@2x.webp";
import petBlockRegTab1x from "@/app/assets/images/tab/cat-tab.webp";
import petBlockRegTab2x from "@/app/assets/images/tab/cat-tab@2x.webp";
import petBlockRegDesk1x from "@/app/assets/images/desk/cat-desk.webp";
import petBlockRegDesk2x from "@/app/assets/images/desk/cat-desk@2x.webp";
// Login
import petBlockLogMob1x from "@/app/assets/images/mob/dog-mob.webp";
import petBlockLogMob2x from "@/app/assets/images/mob/dog-mob@2x.webp";
import petBlockLogTab1x from "@/app/assets/images/tab/dog-tab.webp";
import petBlockLogTab2x from "@/app/assets/images/tab/dog-tab@2x.webp";
import petBlockLogDesk1x from "@/app/assets/images/desk/dog-desk.webp";
import petBlockLogDesk2x from "@/app/assets/images/desk/dog-desk@2x.webp";
// Add pet
import petBlockAddPetMob1x from "@/app/assets/images/mob/dog-glasses-mob.webp";
import petBlockAddPetMob2x from "@/app/assets/images/mob/dog-glasses-mob@2x.webp";
import petBlockAddPetTab1x from "@/app/assets/images/tab/dog-glasses-tab.webp";
import petBlockAddPetTab2x from "@/app/assets/images/tab/dog-glasses-tab@2x.webp";
import petBlockAddPetDesk1x from "@/app/assets/images/desk/dog-glasses-desk.webp";
import petBlockAddPetDesk2x from "@/app/assets/images/desk/dog-glasses-desk@2x.webp";

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

  loaderTab: { src: logoTabLoader.src },
  loaderMob: { src: logoMobLoader.src },
};

export const LOADER_IMAGES = {
  desk: { src1x: loaderDesk1x.src, src2x: loaderDesk2x.src },
  tab: { src1x: loaderTab1x.src, src2x: loaderTab2x.src },
  mob: { src1x: loaderMob1x.src, src2x: loaderMob2x.src },
};

export const NOTFOUND_CAT_IMG = {
  desk: { src1x: notFoundDesk1x.src, src2x: notFoundDesk2x.src },
  tab: { src1x: notFoundTab1x.src, src2x: notFoundTab2x.src },
  mob: { src1x: notFoundMob1x.src, src2x: notFoundMob2x.src },
};

export const PETBLOCK_IMAGES = {
  deskReg: { src1x: petBlockRegDesk1x.src, src2x: petBlockRegDesk2x.src },
  tabReg: { src1x: petBlockRegTab1x.src, src2x: petBlockRegTab2x.src },
  mobReg: { src1x: petBlockRegMob1x.src, src2x: petBlockRegMob2x.src },

  deskLog: { src1x: petBlockLogDesk1x.src, src2x: petBlockLogDesk2x.src },
  mobLog: { src1x: petBlockLogMob1x.src, src2x: petBlockLogTab2x.src },
  tabLog: { src1x: petBlockLogTab1x.src, src2x: petBlockLogMob2x.src },

  deskAddPet: {
    src1x: petBlockAddPetDesk1x.src,
    src2x: petBlockAddPetDesk2x.src,
  },
  tabAddPet: { src1x: petBlockAddPetTab1x.src, src2x: petBlockAddPetTab2x.src },
  mobAddPet: { src1x: petBlockAddPetMob1x.src, src2x: petBlockAddPetMob2x.src },
};
