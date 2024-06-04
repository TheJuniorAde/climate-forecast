import React from "react"
import { Snackbar } from "@mui/material"
import { Messages } from "../../messages"

interface SnackProps {
  show: boolean
  message: string
}

export const Snack: React.FC<SnackProps> = ({ show, message }) => (
  <Snackbar
    open={!!message || !!show}
    message={message || Messages.WAITING_GEOLOCATION}
  />
)
