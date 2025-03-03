// import { googleLogout } from "@react-oauth/google";
import { Button, message } from "antd";
// import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// export function GoogleLoginButton() {
//   const responseMessage = (response: CredentialResponse) => {
//     if (response.credential) {
//       console.log(jwtDecode(response.credential));
//     }
//   };
//   const errorMessage = () => {
//     console.log("error");
//   };

//   return <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />;
// }
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../../firebase/firebase";
import baseApi from "../../utils/BaseApi";
import { useAppDispatch } from "../../redux/hook";
import {
  loginFailure,
  loginStart,
  loginSuccessWithGoogle,
} from "../../redux/slice/authSlice";
import { UserData } from "../../models/auth.models";
import { unwrapResult } from "@reduxjs/toolkit";
export function GoogleLoginButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginGoogle = async () => {
    dispatch(loginStart());
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("result:", result);
      const { data }: { data: UserData } = await baseApi.post(
        "/api/v1/auth/login-with-Google",
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );
      console.log(data);
      const { link, access_token, ...user } = data.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("link", JSON.stringify(link));
      console.log("data from login Google:", data);
      dispatch(loginSuccessWithGoogle(data));
      console.log(data.data.link);
      if (
        user.user.isCertified === "Yes" &&
        user.user.isVerified === true &&
        user.user.role === "6615424b73f8eddb58cfe6ac"
      ) {
        navigate("/course");
      } else if (user.user.role === "66153c6d09d7c5006797e0a3") {
        navigate(link);
      } else if (
        user.user.isCertified === "Proccessing" &&
        user.user.isVerified === false &&
        user.user.role === "6615424b73f8eddb58cfe6ac"
      ) {
        navigate("/instructor/wait");
      } else {
        navigate("/instructor/start");
      }
    } catch (error) {
      console.log("Could not login with Google ", error);
      dispatch(loginFailure("Unknown error"));
    }
  };
  return (
    <div className="mb-3">
      <button
        className="flex gap-2 rounded-lg border border-slate-200 px-4 py-2 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500
       dark:hover:text-slate-300"
        onClick={loginGoogle}
      >
        <img
          className="h-6 w-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span className="text-black hover:text-gray-500 shadow-sm">
          Đăng nhập với Google
        </span>
      </button>
    </div>
  );
}

export function GoogleLogoutButton() {
  const logOut = () => {
    // googleLogout();
  };

  return <Button onClick={logOut}>Log out</Button>;
}
