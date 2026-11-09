import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Believi IA — automação de processos e soluções personalizadas";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/logo-believi.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

/** Imagem de compartilhamento (Open Graph), gerada no build com a logo oficial. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#070A0A",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(6,255,239,0.25), transparent 55%)",
          padding: 80,
        }}
      >
        <img src={logoSrc} alt="" width={606} height={142} />
        <p
          style={{
            marginTop: 40,
            fontSize: 32,
            color: "#A6B5B1",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Automação de processos e soluções personalizadas para a sua empresa
        </p>
      </div>
    ),
    { ...size }
  );
}
