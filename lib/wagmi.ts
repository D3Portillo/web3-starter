import { useEffect, useState } from "react"
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi"

export type WriteConfigArgs = Partial<Parameters<typeof useContractWrite>[0]>
export type UseContractReadReturn = ReturnType<typeof useContractRead>

export const withFormatted = <T, Formatted>(
  result: T,
  formatterFunction: (
    data: T extends UseContractReadReturn ? T["data"] : T
  ) => Formatted
) => {
  return {
    ...result,
    formatted: formatterFunction((result as any).data),
  }
}

export const useAccountBalance = (token?: string) => {
  const { address } = useAccount()
  return useBalance({ address, watch: true, token: token as any })
}

export const useWriteTransaction = (config?: WriteConfigArgs) => {
  const { config: preparedConfig } = usePrepareContractWrite({
    chainId: config?.chainId,
    abi: config?.abi,
    functionName: config?.functionName,
    address: config?.address,
    overrides: config?.overrides,
    args: config?.args,
  })

  return useContractWrite({ ...preparedConfig, ...(config as any) })
}

export const useConnectedAccount = () => {
  const { address: rkAddress } = useAccount()
  const [address, setAddress] = useState("")

  useEffect(() => {
    setAddress(rkAddress || "")
  }, [rkAddress])

  return {
    isConnected: address.length > 1,
    address,
  }
}
