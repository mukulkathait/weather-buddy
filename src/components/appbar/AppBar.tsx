import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/stateHook";
import { logout } from "../../store/authSlice";

function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex justify-between px-6 py-2 border-b bg-yellow-300">
      <div
        className="text-lg text-orange-800 cursor-pointer text-center px-2 grid place-content-center font-bold hover:text-orange-600"
        onClick={() => {
          navigate("/");
        }}
      >
        🌤️Weather Buddy
      </div>
      <div className="flex gap-2">
        {location.pathname === "/homepage" ? (
          <button
            className="border bg-green-600 text-white text-lg font-semibold px-3 py-1 rounded-md hover:bg-white hover:border hover:border-green-600 hover:text-green-600"
            onClick={() => navigate("/api-keys")}
          >
            API Keys
          </button>
        ) : location.pathname === "/api-keys" ? (
          <button
            className="border bg-green-600 text-white text-lg font-semibold px-3 py-1 rounded-md hover:bg-white hover:border hover:border-green-600 hover:text-green-600"
            onClick={() => navigate("/homepage")}
          >
            Dashboard
          </button>
        ) : null}
        <button
          className="border bg-blue-600 text-white text-lg font-semibold px-3 py-1 rounded-md hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AppBar;
