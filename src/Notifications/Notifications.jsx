/**
 * Component: To display all states of api lifecycles OR any popups needed inbetween
 */
import { alertSelector, reset } from "../reduxSlices/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { toastTimeout } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { memo, useRef } from "react";

const Notifications = () => {

    const { fetchToDosStatus } = useSelector(alertSelector)

    const toastId = useRef(null);
    const dispatch = useDispatch();

    if (fetchToDosStatus === 'loading' && toastId.current !== 'fetchToDosStatus:loading') {
        toast.loading('Fetching todos', { autoClose: toastTimeout })
        toastId.current = 'fetchToDosStatus:loading'
    }
    if (fetchToDosStatus === 'completed') {
        toast.dismiss();
        toastId.current = null
        toastId.current = toast.success('Fetched todos')
        setTimeout(() => {
            dispatch(reset('fetchToDosStatus'))
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

export default memo(Notifications);