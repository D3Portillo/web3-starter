import { Fragment } from "react"
import Image from "next/image"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Button from "@/components/Button"
import Input from "@/components/Input"

export default function Home() {
  return (
    <Fragment>
      <main className="min-h-screen p-8">
        <h1 className="text-[calc(3vw+2rem)] font-bold mb-2">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <ConnectButton />
        <section className="flex flex-col mt-12 max-w-sm gap-4">
          <h1 className="text-lg font-semibold">A 🦄 Design System</h1>
          <Input placeholder="A lil input" />
          <Button>Click Me!</Button>
        </section>
      </main>
      <footer className="p-8 flex justify-center border-t">
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </Fragment>
  )
}
