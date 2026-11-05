import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon provisório gerado em build-time (marca "B" em ciano sobre verde
 * escuro). Substitua por favicon.ico / icon.png oficial quando o logo da
 * marca estiver disponível.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#032e2b",
          borderRadius: 12,
        }}
      >
        <span style={{ fontSize: 38, fontWeight: 700, color: "#06ffef" }}>B</span>
      </div>
    ),
    { ...size }
  );
}
