import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.15)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.05)');

      ctx.fillStyle = gradient;

      // Draw multiple wave layers
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x++) {
          const y =
            height / 2 +
            Math.sin((x / width) * Math.PI * 4 + phase + i * 0.5) * 30 +
            Math.sin((x / width) * Math.PI * 2 + phase * 1.5 + i) * 20;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.globalAlpha = 0.3 - i * 0.1;
        ctx.fill();
      }

      phase += 0.02;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
