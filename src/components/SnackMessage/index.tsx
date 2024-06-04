import React from "react"
import { Snackbar } from "@mui/material"
import { Messages } from "../../messages"

interface SnackMessageProps {
  show: boolean
  message: string
}

export const SnackMessage: React.FC<SnackMessageProps> = ({
  show,
  message,
}) => (
  <Snackbar
    open={!!message || !!show}
    message={message || Messages.WAITING_GEOLOCATION}
  />
)
