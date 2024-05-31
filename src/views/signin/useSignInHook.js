import { useAuth } from "context/AuthContext";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailRegex } from "variables/regex";
import { passwordRegex } from "variables/regex";
import RoutesName from "variables/route";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { post_api } from "api";
import { toast } from "react-toastify";
// import { useQuery, useMutation } from "@tanstack/react-query";

const useSignInHook = () => {
  const { login } = useAuth();

  const { signup, forgotPassword, dashboard } = RoutesName;

  const navigate = useNavigate();

  const signIn = async (values) => {
    try {
      const { data, message } = await post_api("auth/login", values);
      toast.success(message);
      return data;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const useHandleLogin = async (values) => {
    const data = await signIn(values);
    if (data) {
      login(data);
    }
  };

  const [profile, setProfile] = useState({});

  const handleGoogleLogin = async (userData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_GOOGLE_API_URI_V1}/userinfo?access_token=${userData.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setProfile(data);
      const socialLoginResponse = await post_api("auth/social-login", {
        first_name: data.name,
        email: data.email,
        profile_pic: data.picture,
      });
      toast.success(socialLoginResponse.message);
      login(socialLoginResponse.data);
      navigate(dashboard);
    } catch (error) {
      toast.error(error.data.message);
      return;
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: (error) => console.log("Google login Failed:", error),
  });

  const googleLogOut = () => {
    googleLogout();
    setProfile(null);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Required")
      .matches(emailRegex, "Invalid email"),
    password: yup
      .string()
      .required("Required")
      .matches(
        passwordRegex,
        "Password must contain at least one letter, one number, one special character (!@#$%^&*), and be at least 8 characters long."
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: useHandleLogin,
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    formik;

  return {
    handleLogin: useHandleLogin,
    handleGoogleLogin,
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    signup,
    forgotPassword,
    googleLogin,
    profile,
    googleLogOut,
  };
};

export default useSignInHook;
