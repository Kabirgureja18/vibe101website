import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Sparkles, Check, Info } from 'lucide-react';

interface SplineSceneBackgroundProps {
  sceneUrl?: string;
  onSceneUrlChange?: (url: string) => void;
}

export const SplineSceneBackground: React.FC<SplineSceneBackgroundProps> = ({
  sceneUrl = 'https://app.spline.design/file/864e2836-2ee3-4f61-aa7d-994c8ae5b816',
  onSceneUrlChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExportedScene, setIsExportedScene] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Check URL type
  useEffect(() => {
    if (!sceneUrl) {
      setIsExportedScene(false);
      setStatusMessage('No Spline scene URL specified. Running procedural WebGL fallback.');
      return;
    }

    if (sceneUrl.includes('app.spline.design/file/')) {
      // This is an editable project workspace URL, NOT an exported .splinecode or public viewer link
      setIsExportedScene(false);
      setStatusMessage('Spline project file detected. Exported .splinecode link required for direct runtime embed.');
    } else if (sceneUrl.includes('.splinecode') || sceneUrl.includes('my.spline.design/')) {
      setIsExportedScene(true);
      setStatusMessage('Public exported Spline scene detected.');
    } else {
      setIsExportedScene(false);
      setStatusMessage('Standard 3D WebGL background active.');
    }
  }, [sceneUrl]);

  // High-performance Three.js 3D architectural canvas fallback
  useEffect(() => {
    if (isExportedScene) return;

    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 36);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create architectural geometric mesh inspired by Hervé Baillargeon's minimal structure
    // Octahedral / Icosahedral kinetic grid with neon lime & dark wireframe
    const geometry = new THREE.IcosahedronGeometry(14, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x121212,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const mainMesh = new THREE.Mesh(geometry, wireframeMat);
    scene.add(mainMesh);

    // Subtle neon lime nodes at vertices
    const pointsGeom = new THREE.BufferGeometry();
    const pos = geometry.attributes.position.clone();
    pointsGeom.setAttribute('position', pos);
    const pointsMat = new THREE.PointsMaterial({
      color: 0xD4FF00,
      size: 0.45,
      transparent: true,
      opacity: 0.8
    });
    const pointsMesh = new THREE.Points(pointsGeom, pointsMat);
    scene.add(pointsMesh);

    // Ambient floating dust particles
    const particleCount = 120;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = (Math.random() - 0.5) * 60;
      particlePositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7928CA,
      size: 0.3,
      transparent: true,
      opacity: 0.35
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) * 0.0006;
      mouseY = (e.clientY - halfH) * 0.0006;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        // Restrained, subtle ambient rotation - not a jarring loop
        mainMesh.rotation.y += delta * 0.08;
        mainMesh.rotation.x += delta * 0.03;
        pointsMesh.rotation.y = mainMesh.rotation.y;
        pointsMesh.rotation.x = mainMesh.rotation.x;

        particleSystem.rotation.y -= delta * 0.02;

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        mainMesh.position.x = targetX * 12;
        mainMesh.position.y = -targetY * 12;
        pointsMesh.position.x = mainMesh.position.x;
        pointsMesh.position.y = mainMesh.position.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframeMat.dispose();
      pointsGeom.dispose();
      pointsMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isExportedScene]);

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl && onSceneUrlChange) {
      onSceneUrlChange(customInputUrl);
      setShowConfig(false);
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 3D WebGL Container */}
      {!isExportedScene ? (
        <div ref={containerRef} className="w-full h-full absolute inset-0 opacity-70" />
      ) : (
        <iframe
          src={sceneUrl}
          title="Spline 3D Scene"
          className="w-full h-full border-0 absolute inset-0 pointer-events-auto opacity-75"
        />
      )}

      {/* Contrast Overlay Wash: Ensures 100% WCAG AA legibility for near-black typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7F2]/40 via-[#F8F7F2]/80 to-[#F8F7F2] pointer-events-none" />

      {/* Subtle Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Discrete Spline Status Indicator & Export URL Loader */}
      <div className="absolute bottom-4 left-6 z-20 pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => setShowConfig((prev) => !prev)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-neutral-600 bg-white/80 hover:bg-white border border-black/10 hover:border-black/30 rounded-md backdrop-blur-xs transition-colors cursor-pointer"
          title="Spline 3D Scene Status & Configuration"
        >
          <Box className="w-3 h-3 text-[#D4FF00] fill-black" />
          <span>Spline Scene: {isExportedScene ? 'Exported 3D Active' : 'Project File (Fallback Active)'}</span>
        </button>

        {showConfig && (
          <div className="absolute bottom-10 left-0 w-80 sm:w-96 p-4 bg-white border-2 border-black rounded-xl shadow-xl font-sans text-xs text-neutral-700 pointer-events-auto">
            <div className="flex items-center justify-between font-mono font-bold text-black uppercase tracking-wider mb-2">
              <span>Spline 3D Scene Configuration</span>
              <button
                onClick={() => setShowConfig(false)}
                className="text-neutral-400 hover:text-black cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-600 mb-3">
              {statusMessage}
            </p>
            <div className="p-2.5 bg-[#F8F7F2] border border-black/10 rounded-lg text-[11px] font-mono text-neutral-600 mb-3">
              <span className="font-bold text-black block mb-1">CURRENT URL:</span>
              <span className="break-all">{sceneUrl}</span>
            </div>
            <form onSubmit={handleApplyCustomUrl} className="space-y-2">
              <label className="block text-[11px] font-mono font-bold uppercase text-neutral-700">
                Load Exported Scene (.splinecode or viewer URL):
              </label>
              <input
                type="text"
                value={customInputUrl}
                onChange={(e) => setCustomInputUrl(e.target.value)}
                placeholder="https://my.spline.design/... or .splinecode"
                className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-black/20 rounded-md text-black outline-hidden focus:border-black"
              />
              <button
                type="submit"
                className="w-full py-1.5 text-xs font-mono font-bold bg-[#D4FF00] text-black border border-black rounded-md hover:bg-[#c2eb00] cursor-pointer transition-colors"
              >
                Load Spline Scene
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
