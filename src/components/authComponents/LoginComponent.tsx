import React, { ErrorInfo, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../utilities/InputComponent";
import GoogleLoginComponent from "./GoogleLoginComponent";
import axios from "../api/axios";
import { useAppDispatch } from "../../store/stateHook";
import { login } from "../../store/authSlice";

interface LoginProps {
  toggleForm: () => void;
}

const LoginComponent: React.FC<LoginProps> = ({ toggleForm }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!email || !password) {
      setWarning("Please fill in both email and password fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "/auth/login",
        data: {
          email,
          password,
        },
      });

      if (response.status < 400) {
        dispatch(
          login({
            token: response.data.access_token,
          })
        );
        navigate("homepage");
      }
    } catch (error: any) {
      // Check for invalid credentials
      if (error.response && error.response.status === 401) {
        setWarning("Invalid email or password.");
      } else {
        console.error("An error occurred during login:", error);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl mb-6 text-center">Login</h2>

      {warning && ( // Conditionally render the warning message
        <div className="mb-4 text-red-500 text-center">{warning}</div>
      )}

      {loading ? ( // Show loading indicator if loading is true
        <div className="text-center text-blue-500">
          Processing... Please wait
        </div>
      ) : (
        <>
          <InputComponent
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputComponent
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col items-center justify-between gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Don't have an account? Sign up
            </button>
            <div className="border-2 w-full border-slate-300"></div>
            <div className="text-center mt-4">
              <GoogleLoginComponent setLoading={setLoading} />{" "}
              {/* Pass setLoading to GoogleLoginComponent */}
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginComponent;
