import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"

import { Roboto } from "@next/font/google"
import { WagmiConfig, createClient, configureChains } from "wagmi"
import { mainnet } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { Toaster } from "react-hot-toast"

const { provider, chains } = configureChains([mainnet], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: "replace.this",
  // replace with your appUrl or appName
  chains,
})

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
})

const nextFont = Roboto({ weight: ["400", "500", "700"], subsets: [] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={nextFont.className}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root [data-rk] {
              --rk-radii-modal: 1rem;
            }
            [data-rk] * {
              font-family: ${nextFont.style.fontFamily} !important;
            }
          `,
        }}
      />
      <Toaster />
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  )
}
