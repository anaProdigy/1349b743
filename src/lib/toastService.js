import { toast } from "react-toastify";
//to do
export const showToast = ({
  message,
  type = "success",
  position = "bottom-center",
  duration = 3000,
  mode = "light", // "light" or "dark"
}) => {
  const className =
    mode === "dark"
      ? "bg-black text-white shadow-lg"
      : "bg-white text-black shadow-lg";

  const config = {
    position,
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: mode,
    className,
  };
};