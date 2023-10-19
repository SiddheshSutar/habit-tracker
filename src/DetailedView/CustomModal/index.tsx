import React from 'react'
import { Dialog } from "@mui/material";

export const CustomModal = ({
    open,
    handleClose,
    children
}) => {
    return (
        <Dialog onClose={handleClose} open={open}>
            {children}
        </Dialog>
    );
}