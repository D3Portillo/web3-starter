import { useEffect, useState } from "react"
import { useAccount, useBalance, useContractRead } from "wagmi"

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

export const useConnectedAccount = () => {
  const [isConnected, setIsConnected] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    setIsConnected((address?.length || 0) > 1)
  }, [address])

  return {
    isConnected,
    address,
  }
}
