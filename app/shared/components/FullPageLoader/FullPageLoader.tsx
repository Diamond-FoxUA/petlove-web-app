"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/shared/redux/hooks";
import Image from "next/image";
import css from "./FullPageLoader.module.css";
import { LOGO_ICONS, LOADER_IMAGES } from "@/app/assets/images";

export default function FullPageLoader() {
  const { loaderMob, loaderTab } = LOGO_ICONS;
  const { desk, tab, mob } = LOADER_IMAGES;

  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            clearInterval(interval);
            return 85;
          }
          return prev + 1;
        });
      }, 15);
    } else {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);

            setShowLogo(true);

            setTimeout(() => setIsFadingOut(true), 500);
            return 100;
          }
          return prev + 3;
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName.includes("fadeOut")) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`${css.overlay} ${isFadingOut ? css.fadeOut : ""}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={css.loaderContent}>
        <picture className={css.bgWrapper}>
          <source media="(min-width:1280px)" srcSet={desk.src} />
          <source media="(min-width:768px)" srcSet={tab.src} />
          <Image
            src={mob.src}
            alt="A woman and a vet checking a beagle dog's ear."
            priority
            fill
            sizes="100vw"
          />
        </picture>

        <div className={css.filterBg}>
          <div className={css.progressContainer}>
            <svg
              xmlns="http://w3.org"
              width="398"
              height="398"
              viewBox="0 0 398 398"
              fill="none"
              className={`${css.figmaCircle} ${showLogo ? css.hideSpinner : ""}`}
            >
              <path
                stroke="url(#a)"
                strokeWidth="2"
                d="M1.669 182.741a198.002 198.002 0 0 0 241.627 209.241A198 198 0 0 0 156.74 5.562"
                opacity=".3"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="182.741"
                  x2="-15"
                  y1="396.331"
                  y2="199"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {showLogo ? (
              <>
                {/* mobile */}
                <Image
                  width={190}
                  height={50}
                  src={loaderMob.src}
                  alt="Petlove logo"
                  className={`${css.logo} ${css.logoMob}`}
                />
                {/* tablet and desktop */}
                <Image
                  width={374}
                  height={100}
                  src={loaderTab.src}
                  alt="Petlove logo"
                  className={`${css.logo} ${css.logoTab}`}
                />
              </>
            ) : (
              <div className={css.percentage}>{progress}%</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
