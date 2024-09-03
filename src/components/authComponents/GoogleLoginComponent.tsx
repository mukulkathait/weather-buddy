import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "../api/axios";
import { useAppDispatch } from "../../store/stateHook";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";

const GoogleLoginComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      const idToken = response.credential;
      console.log("idToken: ", idToken);
      try {
        const response = await axios({
          method: "post",
          url: "/auth/google-auth",
          data: {
            idToken,
          },
        });
        if (response.data) {
          dispatch(login({ token: response.data.access_token }));
          navigate("homepage");
        }
      } catch (error) {
        console.log("Login Failed: ", error);
      }
    } else {
      console.error("Google login did not return a credential.");
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
      />
    </div>
  );
};

export default GoogleLoginComponent;
