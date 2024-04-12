export const containsSpecialChars = (password) => {
  const specialChars = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;
  return specialChars.test(password);
};

export { findInputError } from "./findInputError";
export { isFormInvalid } from "./isFormInvalid";

export const input_container_styles = "flex  w-full flex-col mb-2";

export const label_styles =
  "font-bold text-sm capitalize text-[#B9B9B9] mb-1";

export const general_input_styles =
  "bg-[#D9D9D9] w-full  rounded-lg px-[0.68vw] text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh]";
