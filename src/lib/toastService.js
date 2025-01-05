import { toast } from "react-toastify";

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

  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    case "info":
      toast.info(message, config);
      break;
    case "warning":
      toast.warn(message, config);
      break;
    default:
      toast(message, config);
  }
};