"use client";
import { setupChromaKey } from "@/lib/chroma-key";
import React, { useEffect, useRef } from "react";

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  size?: {
    width: number;
    height: number;
  };
  options?: {
    minHue?: number;
    maxHue?: number;
    minSaturation?: number;
    threshold?: number;
  };
  onEnded?: (currentTime: number) => void;
}

const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({
  src,
  className,
  size = { width: 256, height: 144 },
  options = {
    minHue: 60,
    maxHue: 180,
    minSaturation: 0.1,
    threshold: 1.0,
  },
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stopChromaKeyRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const handleEnded = () => {
      if (typeof onEnded === "function") {
        onEnded(video.currentTime);
      }
    };

    video.addEventListener("ended", handleEnded);

    const startChromaKey = async () => {
      try {
        video.src = src;
        video.crossOrigin = "anonymous";
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        video.width = size.width;
        video.height = size.height;

        await video.play();

        stopChromaKeyRef.current = setupChromaKey(video, canvas, {
          minHue: options.minHue!,
          maxHue: options.maxHue!,
          minSaturation: options.minSaturation!,
          threshold: options.threshold!,
        });
      } catch (error) {
        console.error("Failed to start video/chroma key:", error);
      }
    };

    startChromaKey();

    return () => {
      stopChromaKeyRef.current?.();
      video.removeEventListener("ended", handleEnded);
    };
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, options]);

  return (
    <article
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} />
    </article>
  );
};

export default ChromaKeyVideo;
