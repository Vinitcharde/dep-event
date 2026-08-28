import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 2, 80);
    blueLight.position.set(20, 15, 10);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x818cf8, 2, 80);
    purpleLight.position.set(-20, -15, 10);
    scene.add(purpleLight);

    // 1. Elegant Data Particle Field (Subtle Tech Particles)
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8); // Sky blue
    const color2 = new THREE.Color(0x818cf8); // Indigo
    const color3 = new THREE.Color(0x34d399); // Emerald
    const color4 = new THREE.Color(0xfbbf24); // Amber

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 90;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 60;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 50 - 5;

      const pick = Math.random();
      const col = pick > 0.6 ? color1 : pick > 0.3 ? color2 : pick > 0.15 ? color3 : color4;
      particleColors[idx] = col.r;
      particleColors[idx + 1] = col.g;
      particleColors[idx + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 2. Subtle Interconnected Constellation Network Mesh
    const nodesCount = 45;
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < nodesCount; i++) {
      nodePositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 70,
          (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 30 - 10
        )
      );
    }

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 18) {
          linePoints.push(nodePositions[i], nodePositions[j]);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.08,
    });
    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(networkLines);

    // Mouse tracking for smooth parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    let clock = new THREE.Clock();
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      // Gentle floating animation
      particles.rotation.y = elapsed * 0.015 + mouse.x * 0.05;
      particles.rotation.x = Math.sin(elapsed * 0.05) * 0.02 + mouse.y * 0.05;

      networkLines.rotation.y = elapsed * 0.008 + mouse.x * 0.03;
      networkLines.rotation.x = mouse.y * 0.03;

      camera.position.x = mouse.x * 2.5;
      camera.position.y = mouse.y * 1.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-ambient-background"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
    />
  );
};
