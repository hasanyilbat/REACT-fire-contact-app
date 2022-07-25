import { toast } from "react-toastify";

export const toastWarnNotify = (msg) => {
  toast.warn(msg, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
