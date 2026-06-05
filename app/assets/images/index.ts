// Hero image imports

import heroDesk1x from "@/app/assets/images/desk/hero-bg-desk.jpg";
import heroDesk2x from "@/app/assets/images/desk/hero-bg-desk@2x.jpg";
import heroTab1x from "@/app/assets/images/tab/hero-bg-tab.jpg";
import heroTab2x from "@/app/assets/images/tab/hero-bg-tab@2x.jpg";
import heroMob1x from "@/app/assets/images/mob/hero-bg-mob.jpg";
import heroMob2x from "@/app/assets/images/mob/hero-bg-mob@2x.jpg";

// Logo image imports

import logoTab from "@/app/assets/logo/logo-tab.svg";
import logoTabAlt from "@/app/assets/logo/logo-tab-alt.svg";
import logoMob from "@/app/assets/logo/logo-mob.svg";
import logoMobAlt from "@/app/assets/logo/logo-mob-alt.svg";

// Not Found page image imports

import notFoundMob1x from "@/app/assets/images/mob/cat-404-mob.png";
import notFoundMob2x from "@/app/assets/images/mob/cat-404-mob@2x.png";
import notFoundTab1x from "@/app/assets/images/tab/cat-404-tab.png";
import notFoundTab2x from "@/app/assets/images/tab/cat-404-tab@2x.png";
import notFoundDesk1x from "@/app/assets/images/desk/cat-404-desk.png";
import notFoundDesk2x from "@/app/assets/images/desk/cat-404-desk@2x.png";

// PetBlock image imports

// Registration
import petBlockRegMob1x from "@/app/assets/images/mob/cat-mob.png";
import petBlockRegMob2x from "@/app/assets/images/mob/cat-mob@2x.png";
import petBlockRegTab1x from "@/app/assets/images/tab/cat-tab.png";
import petBlockRegTab2x from "@/app/assets/images/tab/cat-tab@2x.png";
import petBlockRegDesk1x from "@/app/assets/images/desk/cat-desk.png";
import petBlockRegDesk2x from "@/app/assets/images/desk/cat-desk@2x.png";
// Login
import petBlockLogMob1x from "@/app/assets/images/mob/dog-mob.png";
import petBlockLogMob2x from "@/app/assets/images/mob/dog-mob@2x.png";
import petBlockLogTab1x from "@/app/assets/images/tab/dog-tab.png";
import petBlockLogTab2x from "@/app/assets/images/tab/dog-tab@2x.png";
import petBlockLogDesk1x from "@/app/assets/images/desk/dog-desk.png";
import petBlockLogDesk2x from "@/app/assets/images/desk/dog-desk@2x.png";
// Add pet
import petBlockAddPetMob1x from "@/app/assets/images/mob/dog-glasses-mob.png";
import petBlockAddPetMob2x from "@/app/assets/images/mob/dog-glasses-mob@2x.png";
import petBlockAddPetTab1x from "@/app/assets/images/tab/dog-glasses-tab.png";
import petBlockAddPetTab2x from "@/app/assets/images/tab/dog-glasses-tab@2x.png";
import petBlockAddPetDesk1x from "@/app/assets/images/desk/dog-glasses-desk.png";
import petBlockAddPetDesk2x from "@/app/assets/images/desk/dog-glasses-desk@2x.png";

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

export const NOTFOUND_CAT_IMG = {
  mob: { src1x: notFoundMob1x.src, src2x: notFoundMob2x.src },
  tab: { src1x: notFoundTab1x.src, src2x: notFoundTab2x.src },
  desk: { src1x: notFoundDesk1x.src, src2x: notFoundDesk2x.src },
};

export const PETBLOCK_IMAGES = {
  mobReg: { src1x: petBlockRegMob1x.src, src2x: petBlockRegMob2x.src },
  tabReg: { src1x: petBlockRegTab1x.src, src2x: petBlockRegTab2x.src },
  deskReg: { src1x: petBlockRegDesk1x.src, src2x: petBlockRegDesk2x.src },
  mobLog: { src1x: petBlockLogMob1x.src, src2x: petBlockLogMob2x.src },
  tabLog: { src1x: petBlockLogTab1x.src, src2x: petBlockLogTab2x.src },
  deskLog: { src1x: petBlockLogDesk1x.src, src2x: petBlockLogDesk2x.src },
  mobAddPet: { src1x: petBlockAddPetMob1x.src, src2x: petBlockAddPetMob2x.src },
  tabAddPet: { src1x: petBlockAddPetTab1x.src, src2x: petBlockAddPetTab2x.src },
  deskAddPet: { src1x: petBlockAddPetDesk1x.src, src2x: petBlockAddPetDesk2x.src },
};
