import * as Yup from "yup";

export const addPetSchema = Yup.object({
  title: Yup.string().trim().required("Title is required."),
  name: Yup.string().trim().required("Pet's name is required."),
  imgUrl: Yup.string()
    .required("Pet image as URL is required.")
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Please, provide valid image URL.",
    ),
  species: Yup.string().required("Pet's species is required."),
  birthday: Yup.string()
    .trim()
    .required("Pet's birthday is required.")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please provide a birthday date."),
  sex: Yup.string().required("Pet's gender is required."),
});

export type AddPetFormData = Yup.InferType<typeof addPetSchema>;
