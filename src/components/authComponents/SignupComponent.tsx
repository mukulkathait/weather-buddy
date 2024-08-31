import React, { useState } from "react";
import InputComponent from "../utilities/InputComponent";
import GoogleLoginComponent from "./GoogleLoginComponent";
import axios from "axios";

interface SignupProps {
  toggleForm: () => void;
}

const SignupComponent: React.FC<SignupProps> = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/auth/signup",
        data: {
          email,
          password,
          username,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    // Add signup logic here
    console.log("Sign up with", { username, email, password });
  };

  return (
    <form
      onSubmit={handleSignup}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl mb-6 text-center">Sign Up</h2>
      <InputComponent
        id="username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
          Sign Up
        </button>
        <button
          type="button"
          onClick={toggleForm}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Already have an account? Log in
        </button>
        <div className="border-2 w-full border-slate-300"></div>
        <div className="text-center mt-4">
          <GoogleLoginComponent />
        </div>
      </div>
    </form>
  );
};

export default SignupComponent;
