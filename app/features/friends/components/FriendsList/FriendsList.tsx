import css from "./FriendsList.module.css";
import FriendsItem from "../FriendsItem/FriendsItem";
import { getFriends } from "../../api/friendsHandler";

export default async function FriendsList() {
  const data = await getFriends();

  if (data.length === 0)
    return (
      <span className={css.message}>
        Oops, <span className={css.textAccent}>something went wrong.</span> Try
        again later.
      </span>
    );

  return (
    <ul className={css.friendsList}>
      {data.map((item) => (
        <li key={item.title}>
          <FriendsItem
            id={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            email={item.email}
            phone={item.phone}
            url={item.url}
            addressUrl={item.addressUrl}
            address={item.address}
            workDays={item.workDays}
          />
        </li>
      ))}
    </ul>
  );
}
