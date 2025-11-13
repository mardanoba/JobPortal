// src/components/HeroPanorama.tsx
import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

interface HeroPanoramaProps {
  title: string;
  subtitle: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
  panoramaUrl?: string;
}

const HeroPanorama: React.FC<HeroPanoramaProps> = ({
  title,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
  panoramaUrl = 'https://images.unsplash.com/photo-1507666405896-69d19ac3e3fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Default to a panorama image (replace with your own default if needed)
}) => {
  const panoramaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load Pannellum CSS and JS if not already loaded
    const loadPannellum = async () => {
      if (!(window as any).pannellum) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://cdn.pannellum.org/2.5/pannellum.css';
        document.head.appendChild(css);

        const script = document.createElement('script');
        script.src = 'https://cdn.pannellum.org/2.5/pannellum.js';
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize Pannellum viewer
      if (panoramaRef.current && (window as any).pannellum) {
        (window as any).pannellum.viewer(panoramaRef.current, {
          type: 'equirectangular',
          panorama: panoramaUrl, // Use the provided or default URL
          autoLoad: true,
          showControls: false, // Hide controls for background use
          autoRotate: -2, // Slow auto-rotation for subtle effect
          compass: false,
          keyboardZoom: false,
          mouseZoom: false, // Disable zoom for background
          draggable: true, // Allow dragging to rotate
          // Initial view
          yaw: 0,
          pitch: 0,
          hfov: 120, // Wide field of view
        });
      }
    };

    loadPannellum();

    // Cleanup on unmount
    return () => {
      if (panoramaRef.current && (window as any).pannellum) {
        const viewer = (window as any).pannellum.viewer(panoramaRef.current);
        if (viewer) viewer.destroy();
      }
    };
  }, [panoramaUrl]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden"> {/* Adjust height as needed for your layout */}
      {/* Panorama container - full width/height background */}
      <div
        ref={panoramaRef}
        className="absolute inset-0 z-[1]"
      />

      {/* Overlay content - centered text and CTAs */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-[2] bg-black/40 p-5" // Semi-transparent overlay for readability
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          {title.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <p className="text-white/95 text-lg md:text-xl max-w-2xl mb-10">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to={cta1Link}
            className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-blue-50 transition"
          >
            {cta1Text}
          </Link>
          <Link
            to={cta2Link}
            className="text-white border border-white/80 font-bold px-6 py-3 rounded-lg hover:bg-white/10 hover:-translate-y-1 transition"
          >
            {cta2Text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroPanorama;