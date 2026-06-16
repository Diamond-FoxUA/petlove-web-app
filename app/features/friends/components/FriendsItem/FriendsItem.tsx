import css from "./FriendsItem.module.css";
import Image from "next/image";
import Link from "next/link";

import type {
  WorkDay,
  Friend,
} from "@/app/features/friends/types/friendsTypes";

// Вспомогательная функция для текста расписания
function getWorkHoursText(todaySchedule: WorkDay | null | undefined): string {
  if (!todaySchedule) return "No schedule";
  if (!todaySchedule.isOpen) return "Closed";

  if (todaySchedule.from && todaySchedule.to) {
    return `${todaySchedule.from} - ${todaySchedule.to}`;
  }

  return "Day and night";
}

// Вспомогательная функция для форматирования телефона
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

type FriendsItemProps = {
  friendData: Friend;
};

export default function FriendsItem({ friendData }: FriendsItemProps) {
  const { workDays, url, imageUrl, title, email, address, addressUrl, phone } =
    friendData;

  const currentDay = new Date().getDate();
  const currentDayIndex = currentDay === 0 ? 6 : currentDay - 1;
  const hasDays = Array.isArray(workDays) && workDays.length > 0;

  const todaySchedule = hasDays
    ? workDays[currentDayIndex] || workDays[0]
    : null;

  const workHoursText = getWorkHoursText(todaySchedule);

  return (
    <article className={css.friendsItemContainer}>
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <Image
          className={css.friendLogoImg}
          src={imageUrl}
          width={80}
          height={80}
          alt={`${title} logo`}
        />
      </Link>

      <time className={css.workDay}>{workHoursText}</time>

      <div className={css.infoContainer}>
        <h2 className={css.title}>{title}</h2>

        <dl className={css.infoList}>
          <div className={css.infoRow}>
            <dt className={css.infoLabel}>Email:</dt>
            <dd className={css.infoValue}>
              {email ? (
                <Link className={css.infoLink} href={`mailto:${email}`}>
                  {email}
                </Link>
              ) : (
                <small className={css.colorText}>phone only</small>
              )}
            </dd>
          </div>

          <div className={css.infoRow}>
            <dt className={css.infoLabel}>Address:</dt>
            <dd className={css.infoValue}>
              {address ? (
                <Link
                  className={css.infoLink}
                  href={addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {address.split(",")[0].trim()}
                </Link>
              ) : (
                <small className={css.colorText}>website only</small>
              )}
            </dd>
          </div>

          <div className={css.infoRow}>
            <dt className={css.infoLabel}>Phone:</dt>
            <dd className={css.infoValue}>
              {phone ? (
                <Link className={css.infoLink} href={`tel:${phone}`}>
                  {formatPhoneNumber(phone)}
                </Link>
              ) : (
                <small className={css.colorText}>email only</small>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
