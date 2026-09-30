import { useEffect, useRef } from "react";

export default function MatrixRain({ opacity = 0.12 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Character set - mix of Matrix code, numbers, and custom constants
    const matrixChars = "0101103839X二十三ΩΨΦΞΔΛΓΣ";
    const alphabet = matrixChars.split("");

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Initial drops y positions
    let rainDrops: number[] = Array(columns).fill(1).map(() => Math.random() * -100);

    const draw = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = `rgba(0, 0, 0, 0.085)`;
      ctx.fillRect(0, 0, width, height);

      // Soft monochromatic grey for the majority of particles, low opacity
      ctx.fillStyle = `rgba(113, 113, 122, ${opacity * 0.7})`; // Tailwind zinc-500
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Highlight custom constant 3839 or 23 occasionally with extremely subtle green glow
        if (Math.random() > 0.985) {
          ctx.fillStyle = "rgba(52, 211, 153, 0.8)"; // Bright minimal green highlight
          ctx.fillText(Math.random() > 0.5 ? "3839" : "23", x - 5, y);
          ctx.fillStyle = `rgba(113, 113, 122, ${opacity * 0.7})`;
        } else {
          ctx.fillText(text, x, y);
        }

        // Reset drop top if it reaches screen bounds or randomly
        if (y > height && Math.random() > 0.98) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    // Use ResizeObserver for responsive canvas scaling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width || window.innerWidth;
        height = canvas.height = entry.contentRect.height || window.innerHeight;
        columns = Math.floor(width / fontSize);
        rainDrops = Array(columns).fill(1).map(() => Math.random() * -100);
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
