import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";

const GoogleLoginComponent: React.FC = () => {
  const handleGoogleLoginSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      const idToken = response.credential;

      // Send the ID token to the backend
      fetch("http://localhost:3000/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle login success (store token, redirect, etc.)
          console.log("Login success:", data);
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    } else {
      console.error("Google login did not return a credential.");
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
