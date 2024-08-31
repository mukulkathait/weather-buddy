import React, { useState } from "react";
import LoginComponent from "../components/authComponents/LoginComponent";
import SignupComponent from "../components/authComponents/SignupComponent";

const Authentication: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 gap-2">
      <div className="text-5xl font-bold text-white">🌤️ Weather Buddy 🌤️</div>
      <div className="text-xl font-bold text-white">
        _______________ Admin Page _______________
      </div>
      <div className="w-full max-w-sm">
        {isLogin ? (
          <LoginComponent toggleForm={toggleForm} />
        ) : (
          <SignupComponent toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Authentication;
