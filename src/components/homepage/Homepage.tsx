import axios from "axios";
import { userInfo } from "os";
import { useEffect, useState } from "react";

interface User {
  id: string;
  telegramId: string;
  username: string;
  firstName: string;
  isSubscribed: Boolean;
  isBlocked: Boolean;
  preferredTime: string;
}

function Homepage() {
  const [allUser, setAllUser] = useState<User[]>([]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/all");
        console.log(response.data);
        setAllUser(response.data);
      } catch (error) {
        console.log("ERROR: ", error);
      }
    };
    getAllUser();
  }, []);

  const deleteHandler = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);
      console.log(response);
      setAllUser((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const blockHandler = async (id: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/block/${id}`
      );
      console.log(response);
      setAllUser((prev) =>
        prev.map((user) => {
          if (user.id === id) {
            user.isBlocked = true;
            return user;
          } else return user;
        })
      );
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const unblockHandler = async (id: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/unblock/${id}`
      );
      console.log(response);
      setAllUser((prev) =>
        prev.map((user) => {
          if (user.id === id) {
            user.isBlocked = false;
            return user;
          } else return user;
        })
      );
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <div>
      {allUser &&
        allUser.map((user) => (
          <div key={user.id}>
            <p>ID: {user.id}</p>
            <p>Telegram ID: {user.telegramId}</p>
            <p>Username: {user.username}</p>
            <p>First Name: {user.firstName}</p>
            <p>Subscribed: {user.isSubscribed ? "Yes" : "No"}</p>
            <p>Blocked: {user.isBlocked ? "Yes" : "No"}</p>
            <p>
              Preferred Time: {user.preferredTime ? user.preferredTime : "NA"}
            </p>
            {user.isBlocked ? (
              <button
                className="border p-2 rounded-md bg-slate-400"
                onClick={() => unblockHandler(user.id)}
              >
                Unblock
              </button>
            ) : (
              <button
                className="border p-2 rounded-md bg-slate-400"
                onClick={() => blockHandler(user.id)}
              >
                Block
              </button>
            )}
            <button
              className="border p-2 rounded-md bg-slate-400"
              onClick={() => deleteHandler(user.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default Homepage;
