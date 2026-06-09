// Hero image imports

import heroDesk from "@/app/assets/images/desk/hero-bg-desk@2x.jpg";
import heroTab from "@/app/assets/images/tab/hero-bg-tab@2x.jpg";
import heroMob from "@/app/assets/images/mob/hero-bg-mob@2x.jpg";

// Logo image imports

import logoTab from "@/app/assets/logo/logo-tab.svg";
import logoTabAlt from "@/app/assets/logo/logo-tab-alt.svg";
import logoMob from "@/app/assets/logo/logo-mob.svg";
import logoMobAlt from "@/app/assets/logo/logo-mob-alt.svg";

import logoTabLoader from "@/app/assets/logo/logo-tab-loader.svg";
import logoMobLoader from "@/app/assets/logo/logo-mob-loader.svg";

// Loader image imports

import loaderMob from "@/app/assets/images/mob/loading-bg-mob@2x.jpg";
import loaderTab from "@/app/assets/images/tab/loading-bg-tab@2x.jpg";
import loaderDesk from "@/app/assets/images/desk/loading-bg-desk@2x.jpg";

// Not Found page image imports

import notFoundMob from "@/app/assets/images/mob/cat-404-mob@2x.png";
import notFoundTab from "@/app/assets/images/tab/cat-404-tab@2x.png";
import notFoundDesk from "@/app/assets/images/desk/cat-404-desk@2x.png";

// PetBlock image imports

// Registration
import petBlockRegMob from "@/app/assets/images/mob/cat-mob@2x.png";
import petBlockRegTab from "@/app/assets/images/tab/cat-tab@2x.png";
import petBlockRegDesk from "@/app/assets/images/desk/cat-desk@2x.png";
// Login
import petBlockLogMob from "@/app/assets/images/mob/dog-mob@2x.png";
import petBlockLogTab from "@/app/assets/images/tab/dog-tab@2x.png";
import petBlockLogDesk from "@/app/assets/images/desk/dog-desk@2x.png";
// Add pet
import petBlockAddPetMob from "@/app/assets/images/mob/dog-glasses-mob@2x.png";
import petBlockAddPetTab from "@/app/assets/images/tab/dog-glasses-tab@2x.png";
import petBlockAddPetDesk from "@/app/assets/images/desk/dog-glasses-desk@2x.png";

export const HERO_IMAGES = {
  desk: { src: heroDesk },
  tab: { src: heroTab },
  mob: { src: heroMob },
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
  desk: { src: loaderDesk.src },
  tab: { src: loaderTab.src },
  mob: { src: loaderMob.src },
};

export const NOTFOUND_CAT_IMG = {
  mob: { src: notFoundMob },
  tab: { src: notFoundTab },
  desk: { src: notFoundDesk },
};

export const PETBLOCK_IMAGES = {
  mobReg: { src: petBlockRegMob },
  tabReg: { src: petBlockRegTab },
  deskReg: { src: petBlockRegDesk },

  mobLog: { src: petBlockLogMob },
  tabLog: { src: petBlockLogTab },
  deskLog: { src: petBlockLogDesk },

  mobAddPet: { src: petBlockAddPetMob },
  tabAddPet: { src: petBlockAddPetTab },
  deskAddPet: { src: petBlockAddPetDesk },
};
