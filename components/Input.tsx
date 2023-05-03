import { classnames } from "@/lib/helpers"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={classnames(
        "bg-blue-200 border border-blue-50 bg-opacity-10 py-3 px-4 focus:outline-none w-full rounded-lg",
        props.className
      )}
    />
  )
}

export default Input
