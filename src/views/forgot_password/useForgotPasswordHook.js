import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "variables/regex";
import RoutesName from "variables/route";
import * as yup from "yup";

const useForgotPasswordHook = () => {
  const { signin, resetPassword } = RoutesName;

  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Required")
      .matches(emailRegex, "Invalid email"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      navigate(resetPassword);
    },
  });

  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    formik;

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
    signin,
  };
};

export default useForgotPasswordHook;
