"use client";
import css from "./MyNotices.module.css";
import { useState } from "react";

import { useAppSelector } from "@/app/shared/redux/hooks";
import NoticesItem from "@/app/features/notices/components/NoticesItem/NoticesItem";

export default function MyNotices() {
  const { user } = useAppSelector((state) => state.auth);
  const favNotices = user?.noticesFavorites || [];
  const viewedNotices = user?.noticesViewed || [];

  const [isFavActive, setIsFavActive] = useState(true);

  return (
    <section aria-labelledby="my-notices-title">
      <h2 id="my-notices-title" className="sr-only">
        My viewed and saved notices
      </h2>

      <div className={css.btnsContainer}>
        <button
          className={`${css.toggleBtn} ${isFavActive ? css.activeBtn : ""}`}
          onClick={() => setIsFavActive(true)}
        >
          My favourite pets
        </button>
        <button
          className={`${css.toggleBtn} ${!isFavActive ? css.activeBtn : " className={css.message}"}`}
          onClick={() => setIsFavActive(false)}
        >
          Viewed
        </button>
      </div>

      {isFavActive ? (
        favNotices?.length > 0 ? (
          <ul>
            {favNotices.map((n) => (
              <li key={n._id}>
                <NoticesItem
                  _id={n._id}
                  name={n.name}
                  title={n.title}
                  birthday={n.birthday}
                  imgURL={n.imgURL}
                  species={n.species}
                  sex={n.sex}
                  price={n.price}
                  category={n.category}
                  comment={n.comment}
                  location={n.location}
                  popularity={n.popularity}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.message}>
            Oops,{" "}
            <em className={css.textAccent}>
              looks like there aren&apos;t any furries
            </em>{" "}
            on our adorable page yet. Do not worry! View your pets on the
            &quot;find your favorite pet&quot; page
          </p>
        )
      ) : viewedNotices.length > 0 ? (
        <ul>
          <li>
            {viewedNotices.map((n) => (
              <li key={n._id}>
                <NoticesItem
                  _id={n._id}
                  name={n.name}
                  title={n.title}
                  birthday={n.birthday}
                  imgURL={n.imgURL}
                  species={n.species}
                  sex={n.sex}
                  price={n.price}
                  category={n.category}
                  comment={n.comment}
                  location={n.location}
                  popularity={n.popularity}
                />
              </li>
            ))}
          </li>
        </ul>
      ) : (
        <p className={css.message}>
          Oops,{" "}
          <em className={css.textAccent}>
            looks like there aren&apos;t any furries
          </em>{" "}
          on our adorable page yet. Do not worry! View your pets on the
          &quot;find your favorite pet&quot; page
        </p>
      )}
    </section>
  );
}
