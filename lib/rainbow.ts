import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit"
import { toastNotConnected } from "@/lib/toaster"

export const useRkAccountModal = () => {
  const { openConnectModal = toastNotConnected } = useConnectModal()
  const { openAccountModal = openConnectModal } = useAccountModal()

  return {
    openAccountModal,
  }
}
