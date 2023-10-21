/**
 * Component: To display all states of api lifecycles OR any popups needed inbetween
 */
import { alertSelector, reset } from "../../reduxSlices/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { toastTimeout } from "../../helpers";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { memo, useRef } from "react";

const Notifications_ = () => {

    const { addHabitStatus } = useSelector(alertSelector)

    const toastId = useRef(null);
    const dispatch = useDispatch();

    if (addHabitStatus === 'loading' && toastId.current !== 'addHabitStatus:loading') {
        toast.loading('Fetching todos', { autoClose: toastTimeout })
        toastId.current = 'addHabitStatus:loading'
    }
    if (addHabitStatus === 'completed') {
        toast.dismiss();
        toastId.current = null
        toastId.current = toast.success('Added habit ')
        setTimeout(() => {
            dispatch(reset('addHabitStatus'))
        }, toastTimeout);
    }
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={toastTimeout}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

const Not = memo(Notifications_)

export default Not;