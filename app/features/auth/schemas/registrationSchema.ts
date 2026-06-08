import * as Yup from "yup";

export const registrationSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please provide a valid email address.",
    )
    .required("Email is required."),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters long.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Confirm password is required."),
}).required();

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please provide a valid email address.",
    )
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
}).required();

export type registrationFormData = Yup.InferType<typeof registrationSchema>;
export type loginFormData = Yup.InferType<typeof loginSchema>;
