import { useNavigate } from "react-router-dom";

function Missing() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-black flex flex-col gap-4 items-center justify-center">
      <div className="text-white font-extrabold text-3xl">
        Whoops!! Maybe you are lost.
      </div>
      <button
        className="text-black bg-white text-lg px-4 py-2 rounded-md font-semibold"
        onClick={() => navigate("/homepage")}
      >
        Go Back to 🌤️Weather Buddy
      </button>
    </div>
  );
}

export default Missing;
