'use client';
import { LOGO_ICONS } from "@/app/assets/images";
import { usePathname } from "next/navigation";
import css from "./Logo.module.css";

export default function Logo () {
  const pathname = usePathname();
  const { tab, mob, tabAlt, mobAlt } = LOGO_ICONS;

  const isHomepage = pathname === "/";
  const desktopSrc = isHomepage ? tabAlt.src : tab.src;
  const mobSrc = isHomepage ? mobAlt.src : mob.src

  return (
    <picture>
      <source srcSet={desktopSrc} media="(min-width: 768px)"/>
      <img className={css.logo} src={mobSrc} alt="Petlove Icon" loading="eager"/>
    </picture>
  )
}