import { cssTransition, toast } from "react-toastify";

const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
});

const Toasty = (message, icon) => {
    if (icon) {
        return toast.dark(
            <>
                <img src={icon} width="50" alt="wallet_icon" />
                {message}
            </>,
            {
                transition: bounce,
            }
        );
    } else {
        return toast.dark(message, {
            transition: bounce,
        });
    }
};
export default Toasty;
