import type { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"

type FormatDecimals = "4" | "2"

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "standard",
  maximumFractionDigits: 2,
})

const shortNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "standard",
  minimumFractionDigits: 4,
})

export const formatNumberCompact = (
  number: string | number,
  decimals?: FormatDecimals
) =>
  (decimals === "4" ? shortNumberFormatter : compactNumberFormatter).format(
    number as any
  )

export const prettifyNumber = (
  number: number | BigNumber,
  decimals?: FormatDecimals
) => {
  const rawNumber = typeof number === "number" ? number : number?.toString()
  if (rawNumber < 0) return "< 0"
  if (rawNumber == 0) return "0"
  if (rawNumber < 1e-10) return "< 0.0001"
  if (isNaN(rawNumber as any)) return "0"
  return formatNumberCompact(rawNumber, decimals)
}

export const prettifyEther = (number?: BigNumber, decimals?: FormatDecimals) =>
  prettifyNumber(Number(formatEther(number || 0)), decimals)

export const toFiniteNumber = (number: any = 0) => {
  const parsedNumber = Number(number)
  return Number.isFinite(parsedNumber) ? parsedNumber : 0
}
