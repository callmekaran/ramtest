import { post_api } from "api";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "variables/regex";
import RoutesName from "variables/route";
import * as yup from "yup";

const useSignUpHook = () => {
  const { signin } = RoutesName;
  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    terms_and_conditions: false,
  };

  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      // .min(2, "Too Short!")
      // .max(50, "Too Long!")
      .required("Required"),
    last_name: yup
      .string(),
      // .min(2, "Too Short!")
      // .max(50, "Too Long!")
      // .required("Required"),
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
    terms_and_conditions: yup.boolean().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { message } = await post_api("auth/register", values);
        toast.success(message);
        navigate(signin);
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = formik;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    signin,
  };
};

export default useSignUpHook;
