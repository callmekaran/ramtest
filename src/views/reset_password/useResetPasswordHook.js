import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordRegex } from "variables/regex";
import RoutesName from "variables/route";
import * as yup from "yup";

const useResetPasswordHook = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { signin } = RoutesName;

  const initialValues = {
    password: "",
    confirm: "",
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .required("Required")
      .matches(
        passwordRegex,
        "Password must contain at least one letter, one number, one special character (!@#$%^&*), and be at least 8 characters long."
      ),
    confirm: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      navigate(signin);
    },
  });

  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    formik;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
    handleShowPassword,
    showPassword,
    signin,
  };
};

export default useResetPasswordHook;
