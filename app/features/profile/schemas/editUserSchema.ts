import * as Yup from "yup";

export const editUserSchema = Yup.object({
  name: Yup.string().trim().required("This field cannot be empty."),
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please, provide a valid email address.",
    )
    .required("This field cannot be empty."),

  avatar: Yup.string()
    .test(
      "is-url-or-blob",
      "Please, provide a valid image URL or upload a file.",
      (value) => {
        if (!value) return true;

        if (value.startsWith("blob:")) return true;

        const imageUrlRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i;
        return imageUrlRegex.test(value);
      },
    )
    .default(""),

  phone: Yup.string()
    .matches(
      /^\+38\d{10}$/,
      "Please, provide a phone number in a format +380********",
    )
    .default(""),
});

export type EditUserFormData = Yup.InferType<typeof editUserSchema>;
