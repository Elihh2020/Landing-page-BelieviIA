"use client";

import { useEffect, useRef } from "react";
import { trackViewContent } from "@/lib/tracking";

/**
 * Dispara view_content uma única vez quando o visitante atinge 50% da página
 * ou chega à seção de Soluções — o que ocorrer primeiro.
 */
export default function ScrollDepthTracker() {
  const firedRef = useRef(false);

  useEffect(() => {
    const fireOnce = (detail: string) => {
      if (firedRef.current) return;
      firedRef.current = true;
      trackViewContent(detail);
    };

    const onScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const ratio = window.scrollY / scrollableHeight;
      if (ratio >= 0.5) fireOnce("50_percent_scroll");
    };

    const solucoes = document.getElementById("solucoes");
    const observer = solucoes
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) fireOnce("secao_solucoes");
          },
          { threshold: 0.3 }
        )
      : null;

    if (solucoes && observer) observer.observe(solucoes);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return null;
}
