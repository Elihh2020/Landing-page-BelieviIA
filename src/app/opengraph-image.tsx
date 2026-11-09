import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem Open Graph gerada em build-time. Substitua por uma arte oficial da
 * marca (com o logo real) quando disponível — basta trocar este arquivo por
 * uma imagem estática (ex.: opengraph-image.png) na mesma pasta.
 */
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            border: "3px solid #2DE2D0",
            borderRadius: 16,
            padding: "16px 32px",
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 700, color: "#E6EEEC" }}>
            Believi
          </span>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#2DE2D0" }}>
            IA
          </span>
        </div>
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
