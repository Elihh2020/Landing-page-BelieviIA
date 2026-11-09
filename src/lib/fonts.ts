import { Space_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** Fonte manuscrita usada só na "nota da equipe" da seção Diferenciais. */
export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});
