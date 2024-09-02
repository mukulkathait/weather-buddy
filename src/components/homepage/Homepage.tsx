import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: string;
  telegramId: string;
  username: string;
  firstName: string;
  isSubscribed: boolean;
  isBlocked: boolean;
  preferredTime: string;
}

function Homepage() {
  const [allUser, setAllUser] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/all");
        setAllUser(response.data);
      } catch (error) {
        console.log("ERROR: ", error);
      }
    };
    getAllUser();
  }, []);

  const deleteHandler = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setAllUser((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const blockHandler = async (id: string) => {
    try {
      await axios.patch(`http://localhost:3000/users/block/${id}`);
      setAllUser((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isBlocked: true } : user
        )
      );
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const unblockHandler = async (id: string) => {
    try {
      await axios.patch(`http://localhost:3000/users/unblock/${id}`);
      setAllUser((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isBlocked: false } : user
        )
      );
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const filteredUsers = allUser.filter(
    (user) =>
      user.id.includes(searchTerm) ||
      user.telegramId.includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 bg-slate-400 flex flex-col flex-grow">
      <h2 className="text-center mb-5 text-xl font-bold">Admin Dashboard</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by ID, Telegram ID, Username, or First Name"
        className="mb-5 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">
              ID
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">
              Telegram ID
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">
              Username
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">
              First Name
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">
              Subscribed
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">
              Blocked
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">
              Preferred Time
            </th>
            <th className="border border-gray-300 p-2 bg-gray-100 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.telegramId}</td>
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{user.firstName}</td>
              <td className="border border-gray-300 p-2">
                {user.isSubscribed ? "Yes" : "No"}
              </td>
              <td className="border border-gray-300 p-2">
                {user.isBlocked ? "Yes" : "No"}
              </td>
              <td className="border border-gray-300 p-2">
                {user.preferredTime || "NA"}
              </td>
              <td className="border border-gray-300 p-2 flex justify-center">
                {user.isBlocked ? (
                  <button
                    className="px-4 py-2 w-24 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => unblockHandler(user.id)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 w-24 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => blockHandler(user.id)}
                  >
                    Block
                  </button>
                )}
                <button
                  className="ml-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  onClick={() => deleteHandler(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Homepage;
