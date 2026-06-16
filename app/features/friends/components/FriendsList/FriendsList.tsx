import css from "./FriendsList.module.css";
import FriendsItem from "../FriendsItem/FriendsItem";
import { getFriends } from "../../api/friendsHandler";

import type { Friend } from "../../types/friendsTypes";

export default async function FriendsList() {
  let data: Friend[] | [] = [];

  try {
    data = await getFriends();
  } catch (error) {
    console.error("Failed loading friends on server render: ", error);
    data = [];
  }

  if (!data || data.length === 0)
    return (
      <p role="status" aria-live="polite" className={css.message}>
        Oops, <strong className={css.textAccent}>something went wrong.</strong>{" "}
        Try again later.
      </p>
    );

  return (
    <ul className={css.friendsList}>
      {data.map((item) => (
        <li key={item._id}>
          <FriendsItem
            friendData={item}
          />
        </li>
      ))}
    </ul>
  );
}
