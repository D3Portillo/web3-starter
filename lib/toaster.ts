import toast from "react-hot-toast"

export const toastSuccess = (message: string) => toast.success(message)
export const toastError = (message: string) => toast.error(message)
export const toastNotConnected = () =>
  toastError("Cannot find a wallet to connect")
