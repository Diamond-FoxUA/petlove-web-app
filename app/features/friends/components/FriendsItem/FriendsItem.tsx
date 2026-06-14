import css from "./FriendsItem.module.css";
import Image from "next/image";
import Link from "next/link";

import type { WorkDay } from "@/app/features/friends/types/friendsTypes";
import type { Friend } from "@/app/features/friends/types/friendsTypes";

function getWorkHoursText(todaySchedule: WorkDay | null | undefined): string {
  if (!todaySchedule) return "No schedule";
  if (!todaySchedule.isOpen) return "Closed";

  if (todaySchedule.from && todaySchedule.to) {
    return `${todaySchedule.from} - ${todaySchedule.to}`;
  }

  return "Day and night";
}

function formatPhoneNumber(phone: string): string {
  if (!phone) return "No phone";

  const cleaned = phone.replace(/[^\d+]/g, "");
  const match = cleaned.match(/^(\+?38)?(0\d{2})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    const countryCode = match[1] ? `${match[1]} ` : ""; 
    return `${countryCode}${match[2]} ${match[3]} ${match[4]} ${match[5]}`.trim();
  }

  return phone;
}

export default function FriendsItem({
  title,
  url,
  addressUrl,
  imageUrl,
  address,
  workDays,
  email,
  phone,
}: Friend) {
  const currentDay = new Date().getDate();
  const currentDayIndex = currentDay === 0 ? 6 : currentDay - 1;
  const hasDays = Array.isArray(workDays) && workDays.length > 0;

  const todaySchedule = hasDays
    ? workDays[currentDayIndex] || workDays[0]
    : null;

  const workHoursText = getWorkHoursText(todaySchedule);

  return (
    <div className={css.friendsItemContainer}>
      <Link href={url} target="_blank">
        <Image
          className={css.friendLogoImg}
          src={imageUrl}
          width={80}
          height={80}
          alt="Pet company logo"
        />
      </Link>
      <span className={css.workDay}>{workHoursText}</span>

      <div className={css.infoContainer}>
        <h2 className={css.title}>{title}</h2>
        <ul className={css.infoList}>
          <li>
            <span className={css.infoText}>
              Email:{" "}
              {email ? (
                <Link className={css.infoLink} href={`mailto:${email}`}>
                  {email}
                </Link>
              ) : (
                <span className={css.colorText}>phone only</span>
              )}
            </span>
          </li>
          <li>
            <span className={css.infoText}>
              Address:{" "}
              {address ? (
                <Link className={css.infoLink} href={addressUrl}>
                  {address.split(",")[0].trim()}
                </Link>
              ) : (
                <span className={css.colorText}>website only</span>
              )}
            </span>
          </li>
          <li>
            <span className={css.infoText}>
              Phone:{" "}
              {phone ? (
                <Link className={css.infoLink} href={`tel:${phone}`}>
                  {formatPhoneNumber(phone)}
                </Link>
              ) : (
                <span className={css.colorText}>email only</span>
              )}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
