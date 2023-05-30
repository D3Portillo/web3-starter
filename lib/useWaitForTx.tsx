import { useCallback } from "react"
import Link from "next/link"
import toast from "react-hot-toast"

type WaitForTx = {
  successMessage?: string
  errorMessage?: string
  loadingMessage?: string
  onSuccess?: (txHash: string) => void
  onError?: (txHash: string) => void
}

/** Wagmi Transaction */
export type WTX = { hash: string; wait: () => Promise<any> }

const TRACKING: Record<string, boolean> = {}
const useWaitForTx = ({
  successMessage = "Transaction complete",
  loadingMessage,
  errorMessage,
  onSuccess,
  onError,
}: WaitForTx = {}) => {
  const waitForTx = useCallback(function (
    tx: WTX | undefined,
    overrides: Partial<WaitForTx> = {}
  ) {
    if (!tx) return
    // Early exit if undefined

    const { hash } = tx
    if (TRACKING[hash]) return
    // Early exit if already tracking this TX

    TRACKING[hash] = true
    // Turn tracking flag on

    const LOADING_MESSAGE = overrides.loadingMessage || loadingMessage
    const ERROR_MESSAGE = overrides.errorMessage || errorMessage
    const SUCESS_MESSAGE = overrides.successMessage || successMessage

    const toastId = toast.loading(
      <section className="flex items-center gap-3 whitespace-nowrap">
        <span>{LOADING_MESSAGE || "Sending..."}</span>{" "}
        <Link
          target="_blank"
          className="font-semibold text-diva-blue hover:underline"
          href={`https://goerli.etherscan.io/tx/${hash}`}
        >
          View Tx
        </Link>
      </section>
    )

    function handleShowError() {
      toast.dismiss(toastId)
      if (ERROR_MESSAGE) setTimeout(() => toast.error(ERROR_MESSAGE))
      ;(overrides.onError || onError)?.(hash)
    }

    ;(tx?.wait || Promise.resolve)()
      .then(({ status }: { status: number }) => {
        if (status == 0) return handleShowError()
        // Early exit if tx failed

        toast.dismiss(toastId)
        if (SUCESS_MESSAGE) setTimeout(() => toast.success(SUCESS_MESSAGE))
        ;(overrides.onSuccess || onSuccess)?.(hash)
      })
      .catch(handleShowError)
  },
  [])

  return { waitForTx }
}

export default useWaitForTx
