// utils/toastService.js
import { Toast } from "toastify-react-native";

export const displaySuccess = (message) => {
  Toast.success(message, "top");
};

export const displayError = (error) => {
  Toast.error(error, "top");
};
