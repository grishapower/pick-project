import { toast } from "react-toastify";
import { CheckIcon } from "~/images/icons";
import { CloseIcon } from "~/images/icons/CloseIcon";

export const callToast = (text: string) => {
  return toast(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // progress: ,
    // theme: "light",
    icon: () => (
      <div className="bg-green flex-center min-w-6 h-6 w-6 rounded-full p-1">
        <CheckIcon fill="white" />
      </div>
    ),
    className: "test bg-bgSecond rounded-2xl h-[72px]",
    bodyClassName: "text-white text-base",
    closeButton: () => (
      <CloseIcon
        fill="#373A41"
        className="absolute"
        style={{ right: 10, top: 10 }}
      />
    ),
    style: {
      boxShadow: "0px 4px 10px 0px #00000040",
    },
  });
};
