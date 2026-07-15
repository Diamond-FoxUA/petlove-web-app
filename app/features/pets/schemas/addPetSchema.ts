import * as Yup from "yup";

export const addPetSchema = Yup.object({
  title: Yup.string().trim().required("Title is required."),
  name: Yup.string().trim().required("Pet's name is required."),

  imgURL: Yup.string()
    .required("Please select an image or enter a valid URL")
    .test(
      "is-url-or-file",
      "Please enter a valid URL (starting with http/https)",
      (value) => {
        if (!value) return false;

        if (!value.startsWith("http://") && !value.startsWith("https://")) {
          const fileExtensionRegex = /\.(jpg|jpeg|png|webp|gif|svg)$/i;
          return fileExtensionRegex.test(value) || value.length > 0;
        }

        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
    ),

  species: Yup.string().required("Pet's species is required."),
  birthday: Yup.string()
    .trim()
    .required("Pet's birthday is required.")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please provide a birthday date."),
  sex: Yup.string().required("Pet's gender is required."),
});

export type AddPetFormData = Yup.InferType<typeof addPetSchema>;
