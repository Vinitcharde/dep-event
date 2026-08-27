import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  interactive?: boolean;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

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

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 3. Lighting (Warm Gold & Aegean Deep Blue)
    const ambientLight = new THREE.AmbientLight(0x1a2436, 1.5);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 3.5, 60);
    goldPointLight.position.set(12, 10, 15);
    scene.add(goldPointLight);

    const aegeanPointLight = new THREE.PointLight(0x1e3a8a, 4, 80);
    aegeanPointLight.position.set(-15, -12, 10);
    scene.add(aegeanPointLight);

    const bronzeBackLight = new THREE.PointLight(0xb45309, 2.5, 50);
    bronzeBackLight.position.set(0, 18, -10);
    scene.add(bronzeBackLight);

    // 4. Astrolabe / Celestial Armillary 3D Object Group
    const astrolabeGroup = new THREE.Group();
    scene.add(astrolabeGroup);
    astrolabeGroup.position.set(6, -1, -2);

    // Materials
    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });

    const bronzeRingMat = new THREE.MeshStandardMaterial({
      color: 0x9a6b32,
      metalness: 0.9,
      roughness: 0.35,
    });

    const greekTrimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.7,
      roughness: 0.4,
    });

    // Outer Celestial Sphere Rings
    const ringOuterGeom = new THREE.TorusGeometry(8.5, 0.08, 16, 100);
    const ringOuter = new THREE.Mesh(ringOuterGeom, goldRingMat);
    astrolabeGroup.add(ringOuter);

    const ringMidGeom = new THREE.TorusGeometry(7.2, 0.07, 16, 90);
    const ringMid = new THREE.Mesh(ringMidGeom, bronzeRingMat);
    ringMid.rotation.x = Math.PI / 3;
    ringMid.rotation.y = Math.PI / 4;
    astrolabeGroup.add(ringMid);

    const ringEclipticGeom = new THREE.TorusGeometry(6.0, 0.06, 16, 80);
    const ringEcliptic = new THREE.Mesh(ringEclipticGeom, greekTrimMat);
    ringEcliptic.rotation.x = -Math.PI / 4;
    ringEcliptic.rotation.z = Math.PI / 6;
    astrolabeGroup.add(ringEcliptic);

    const ringInnerGeom = new THREE.TorusGeometry(4.5, 0.05, 12, 70);
    const ringInner = new THREE.Mesh(ringInnerGeom, goldRingMat);
    ringInner.rotation.y = Math.PI / 2;
    astrolabeGroup.add(ringInner);

    // Central Navigational Sphere (The Lodestone / Mythic Compass)
    const centralSphereGeom = new THREE.IcosahedronGeometry(1.8, 2);
    const centralSphereMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x1e293b,
      emissiveIntensity: 0.4,
      wireframe: true,
    });
    const centralSphere = new THREE.Mesh(centralSphereGeom, centralSphereMat);
    astrolabeGroup.add(centralSphere);

    // Inner Glowing Core (The Light of Ithaca)
    const coreGeom = new THREE.SphereGeometry(0.7, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffe89e,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    astrolabeGroup.add(core);

    // Meridian Axis Rod
    const axisGeom = new THREE.CylinderGeometry(0.04, 0.04, 19, 16);
    const axis = new THREE.Mesh(axisGeom, bronzeRingMat);
    astrolabeGroup.add(axis);

    // 5. Constellation Stars & Aegean Nebula Particles
    const starCount = 650;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const goldColor = new THREE.Color(0xfde68a);
    const aegeanColor = new THREE.Color(0x93c5fd);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Spread in wide volume behind & around
      starPositions[idx] = (Math.random() - 0.5) * 70;
      starPositions[idx + 1] = (Math.random() - 0.5) * 50;
      starPositions[idx + 2] = (Math.random() - 0.5) * 40 - 5;

      const pick = Math.random();
      const col = pick > 0.6 ? goldColor : pick > 0.3 ? aegeanColor : whiteColor;
      starColors[idx] = col.r;
      starColors[idx + 1] = col.g;
      starColors[idx + 2] = col.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Constellation Line Nodes (The Pleiades & Homer's Navigator Stars)
    const pleiadesNodes: THREE.Vector3[] = [
      new THREE.Vector3(-14, 8, -6),
      new THREE.Vector3(-12, 10, -5),
      new THREE.Vector3(-10, 8.5, -6),
      new THREE.Vector3(-8.5, 9.8, -5.5),
      new THREE.Vector3(-7, 7.5, -6.2),
      new THREE.Vector3(-9, 6.2, -6.5),
      new THREE.Vector3(-11, 6.5, -6.0),
    ];

    const pleiadesLineGeom = new THREE.BufferGeometry().setFromPoints(pleiadesNodes);
    const pleiadesLineMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.45,
      linewidth: 1,
    });
    const pleiadesLine = new THREE.Line(pleiadesLineGeom, pleiadesLineMat);
    scene.add(pleiadesLine);

    // 7. Mouse and Resize Handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    const handleResize = () => {
      if (!renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Responsive positioning of the 3D astrolabe
      if (w < 768) {
        astrolabeGroup.position.set(0, 4, -8);
        astrolabeGroup.scale.set(0.65, 0.65, 0.65);
      } else if (w < 1200) {
        astrolabeGroup.position.set(4, 0, -4);
        astrolabeGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        astrolabeGroup.position.set(6.5, -1, -2);
        astrolabeGroup.scale.set(1, 1, 1);
      }
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Rotate Astrolabe rings
      astrolabeGroup.rotation.y = elapsedTime * 0.08 + mouseRef.current.x * 0.4;
      astrolabeGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.15 + mouseRef.current.y * 0.3;

      ringMid.rotation.z = elapsedTime * 0.12;
      ringEcliptic.rotation.y = elapsedTime * -0.15;
      ringInner.rotation.x = elapsedTime * 0.18;
      centralSphere.rotation.y = elapsedTime * -0.22;

      // Subtle starfield drift & parallax
      starField.rotation.y = elapsedTime * 0.015 + mouseRef.current.x * 0.05;
      starField.rotation.x = mouseRef.current.y * 0.05;

      // Pulse core light
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.25;
      core.scale.set(pulse, pulse, pulse);

      // Camera subtle parallax
      camera.position.x = mouseRef.current.x * 1.8;
      camera.position.y = mouseRef.current.y * 1.2;
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
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      id="odyssey-three-canvas-container"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
    />
  );
};
