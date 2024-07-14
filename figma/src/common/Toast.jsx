import { toast } from "react-toastify";

export const successNotify = (message) => {
  toast.success(message?message:'Success', {
    position: "top-right",
    autoClose: 15000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}
export const errorNotify = (message) => {
  toast.error(message?message:'Something went wrong!', {
    position: "top-right",
    autoClose: 15000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

