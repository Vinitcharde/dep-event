import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DepartmentEvent, ViewMode, CameraPreset } from '../types';

interface ThreeSpatialCanvasProps {
  events: DepartmentEvent[];
  selectedEvent: DepartmentEvent | null;
  onSelectEvent: (event: DepartmentEvent) => void;
  onOpenRegister: (event: DepartmentEvent) => void;
  viewMode: ViewMode;
  autoOrbit: boolean;
  cameraPreset: CameraPreset;
  searchQuery: string;
  selectedCategory: string;
}

/* Category specific color mappings */
const CATEGORY_COLORS: Record<string, { hex: number; hexStr: string; glow: number }> = {
  'Data Science & Machine Learning': { hex: 0x00f0ff, hexStr: '#00f0ff', glow: 0x0284c7 },
  'Entrepreneurship & Innovation': { hex: 0xf59e0b, hexStr: '#f59e0b', glow: 0xd97706 },
  'Sports & Gaming Strategy': { hex: 0xa855f7, hexStr: '#a855f7', glow: 0x7e22ce },
  'Cinema & Production': { hex: 0x38bdf8, hexStr: '#38bdf8', glow: 0x0284c7 },
  'Keynote Gala': { hex: 0xffd700, hexStr: '#ffd700', glow: 0xb45309 },
  'VFX & Technology': { hex: 0xf43f5e, hexStr: '#f43f5e', glow: 0xe11d48 },
};

const DEFAULT_COLOR = { hex: 0xfbbf24, hexStr: '#fbbf24', glow: 0xd97706 };

export const ThreeSpatialCanvas: React.FC<ThreeSpatialCanvasProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onOpenRegister,
  viewMode,
  autoOrbit,
  cameraPreset,
  searchQuery,
  selectedCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number>(0);

  // References to interactive meshes
  const monolithGroupsRef = useRef<Map<string, THREE.Group>>(new Map());
  const interactiveMeshesRef = useRef<THREE.Mesh[]>([]);
  const hoveredIdRef = useRef<string | null>(null);

  // Target camera state for smooth flight animations
  const cameraAnimRef = useRef<{
    isAnimating: boolean;
    startTime: number;
    duration: number;
    startPos: THREE.Vector3;
    targetPos: THREE.Vector3;
    startLook: THREE.Vector3;
    targetLook: THREE.Vector3;
  }>({
    isAnimating: false,
    startTime: 0,
    duration: 1200,
    startPos: new THREE.Vector3(),
    targetPos: new THREE.Vector3(),
    startLook: new THREE.Vector3(),
    targetLook: new THREE.Vector3(),
  });

  // Carousel rotation angle for holo-ring
  const carouselAngleRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number>(0);

  // Helper function to create canvas texture for monolith display
  const createMonolithCanvasTexture = useCallback((event: DepartmentEvent): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1400;
    const ctx = canvas.getContext('2d')!;

    const catStyle = CATEGORY_COLORS[event.category] || DEFAULT_COLOR;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, '#060d1f');
    bgGrad.addColorStop(0.5, '#020612');
    bgGrad.addColorStop(1, '#010309');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Glowing futuristic border
    ctx.strokeStyle = catStyle.hexStr;
    ctx.lineWidth = 14;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    // Corner tech notches
    ctx.fillStyle = catStyle.hexStr;
    const notchSize = 40;
    ctx.fillRect(16, 16, notchSize, 14);
    ctx.fillRect(16, 16, 14, notchSize);
    ctx.fillRect(canvas.width - 16 - notchSize, 16, notchSize, 14);
    ctx.fillRect(canvas.width - 30, 16, 14, notchSize);
    ctx.fillRect(16, canvas.height - 30, notchSize, 14);
    ctx.fillRect(16, canvas.height - 16 - notchSize, 14, notchSize);
    ctx.fillRect(canvas.width - 16 - notchSize, canvas.height - 30, notchSize, 14);
    ctx.fillRect(canvas.width - 30, canvas.height - 16 - notchSize, 14, notchSize);

    // Milestone Header
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(event.voyageMilestone.toUpperCase(), 50, 90);

    // Track Category Pill
    ctx.fillStyle = `${catStyle.hexStr}33`;
    ctx.fillRect(50, 120, 420, 50);
    ctx.strokeStyle = catStyle.hexStr;
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 120, 420, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(event.category.toUpperCase(), 70, 154);

    // Badge Pill
    ctx.fillStyle = '#ffffff15';
    ctx.fillRect(canvas.width - 380, 120, 330, 50);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(event.badge, canvas.width - 360, 154);

    // Main Event Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px Cinzel, serif';
    const words = event.title.split(' ');
    let line = '';
    let yPos = 260;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 900 && n > 0) {
        ctx.fillText(line, 50, yPos);
        line = words[n] + ' ';
        yPos += 64;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 50, yPos);

    // Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 30px "Cormorant Garamond", serif';
    const subWords = event.subtitle.split(' ');
    let subLine = '';
    let subY = yPos + 60;
    for (let n = 0; n < subWords.length; n++) {
      const testLine = subLine + subWords[n] + ' ';
      if (ctx.measureText(testLine).width > 900 && n > 0) {
        ctx.fillText(subLine, 50, subY);
        subLine = subWords[n] + ' ';
        subY += 40;
      } else {
        subLine = testLine;
      }
    }
    ctx.fillText(subLine, 50, subY);

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, subY + 30);
    ctx.lineTo(canvas.width - 50, subY + 30);
    ctx.stroke();

    // Event Info Grid Box
    ctx.fillStyle = '#0a1428';
    ctx.fillRect(50, subY + 50, canvas.width - 100, 240);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(50, subY + 50, canvas.width - 100, 240);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('📅 ' + event.date, 80, subY + 110);
    ctx.fillText('⏰ ' + event.time, 80, subY + 165);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('📍 ' + event.venue.name + ' • ' + event.venue.hall, 80, subY + 220);

    // Key Prize / Perk mention
    const prizePerk = event.registration.perks.find(p => p.includes('Prize') || p.includes('₹') || p.includes('experience')) || event.registration.perks[0];
    if (prizePerk) {
      ctx.fillStyle = '#10b98122';
      ctx.fillRect(50, subY + 310, canvas.width - 100, 70);
      ctx.strokeStyle = '#10b98188';
      ctx.strokeRect(50, subY + 310, canvas.width - 100, 70);
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('🏆 ' + prizePerk, 80, subY + 355);
    }

    // Call to action button visual
    ctx.fillStyle = catStyle.hexStr;
    ctx.beginPath();
    ctx.roundRect(50, canvas.height - 180, canvas.width - 100, 110, [20]);
    ctx.fill();

    ctx.fillStyle = '#020612';
    ctx.font = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CLICK IN 3D TO OPEN DOSSIER & VIDEO ➔', canvas.width / 2, canvas.height - 110);
    ctx.textAlign = 'left';

    // Scanlines texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let y = 0; y < canvas.height; y += 8) {
      ctx.fillRect(0, y, canvas.width, 3);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Smooth camera animation helper
  const animateCameraTo = useCallback((targetPos: THREE.Vector3, targetLook: THREE.Vector3, duration = 1200) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    cameraAnimRef.current = {
      isAnimating: true,
      startTime: performance.now(),
      duration,
      startPos: camera.position.clone(),
      targetPos: targetPos.clone(),
      startLook: controls.target.clone(),
      targetLook: targetLook.clone(),
    };
  }, []);

  // Set camera by preset
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    if (cameraPreset === 'front') {
      animateCameraTo(new THREE.Vector3(0, 3, 26), new THREE.Vector3(0, 0, 0), 1000);
    } else if (cameraPreset === 'perspective') {
      animateCameraTo(new THREE.Vector3(18, 12, 24), new THREE.Vector3(0, 0, 0), 1000);
    } else if (cameraPreset === 'top') {
      animateCameraTo(new THREE.Vector3(0, 32, 2), new THREE.Vector3(0, 0, 0), 1000);
    }
  }, [cameraPreset, animateCameraTo]);

  // Focus on selected event
  useEffect(() => {
    if (!selectedEvent) return;
    const monolith = monolithGroupsRef.current.get(selectedEvent.id);
    if (!monolith) return;

    // Position camera right in front of the monolith
    const worldPos = new THREE.Vector3();
    monolith.getWorldPosition(worldPos);

    // Calculate normal offset direction based on monolith rotation
    const normalOffset = new THREE.Vector3(0, 0, 7.5);
    normalOffset.applyQuaternion(monolith.quaternion);

    const cameraFocusPos = worldPos.clone().add(normalOffset);
    cameraFocusPos.y += 0.8;

    animateCameraTo(cameraFocusPos, worldPos.clone().add(new THREE.Vector3(0, 0.5, 0)), 1200);
  }, [selectedEvent, animateCameraTo]);

  // Update layout when viewMode changes
  useEffect(() => {
    const radius = 14;
    const count = events.length;

    events.forEach((event, idx) => {
      const group = monolithGroupsRef.current.get(event.id);
      if (!group) return;

      if (viewMode === '3d-orbit-arena') {
        const angle = (idx / count) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        group.position.set(x, 0, z);
        group.rotation.set(0, -angle - Math.PI / 2, 0);
        group.scale.set(1, 1, 1);
      } else if (viewMode === '3d-holo-ring') {
        const ringRadius = 9.5;
        const angle = (idx / count) * Math.PI * 2 + carouselAngleRef.current;
        const x = Math.cos(angle) * ringRadius;
        const z = Math.sin(angle) * ringRadius;
        group.position.set(x, 0, z);
        group.rotation.set(0, -angle - Math.PI / 2, 0);
        group.scale.set(0.9, 0.9, 0.9);
      } else if (viewMode === '3d-voyage-warp') {
        // Deep space S-curve spline
        const t = idx / (count - 1 || 1);
        const z = (t - 0.5) * 36;
        const x = Math.sin(t * Math.PI * 2) * 8;
        const y = Math.cos(t * Math.PI) * 2.5;
        group.position.set(x, y, z);
        group.rotation.set(0, Math.sin(t * Math.PI) * 0.4, 0);
        group.scale.set(0.95, 0.95, 0.95);
      } else if (viewMode === '3d-holo-cinema') {
        // Positioned flanking the central video screen
        const offset = (idx - Math.floor(count / 2)) * 6.5;
        group.position.set(offset, -1.5, 4);
        group.rotation.set(0, -offset * 0.08, 0);
        group.scale.set(0.7, 0.7, 0.7);
      }
    });

    if (viewMode === '3d-orbit-arena') {
      animateCameraTo(new THREE.Vector3(0, 6, 26), new THREE.Vector3(0, 0, 0), 1200);
    } else if (viewMode === '3d-holo-ring') {
      animateCameraTo(new THREE.Vector3(0, 2, 17), new THREE.Vector3(0, 0, 0), 1200);
    } else if (viewMode === '3d-voyage-warp') {
      animateCameraTo(new THREE.Vector3(12, 8, -22), new THREE.Vector3(0, 0, 0), 1400);
    } else if (viewMode === '3d-holo-cinema') {
      animateCameraTo(new THREE.Vector3(0, 2, 16), new THREE.Vector3(0, 0, -4), 1200);
    }
  }, [viewMode, events, animateCameraTo]);

  // Main Three.js Scene Initialization
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030712, 0.018);

    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 6, 26);
    cameraRef.current = camera;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxDistance = 55;
    controls.minDistance = 4;
    controls.maxPolarAngle = Math.PI / 2 + 0.12; // Avoid going fully under floor
    controls.autoRotate = autoOrbit;
    controls.autoRotateSpeed = 0.75;
    controlsRef.current = controls;

    // 4. Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.8);
    scene.add(ambientLight);

    const centralCoreLight = new THREE.PointLight(0xffd700, 4.5, 40);
    centralCoreLight.position.set(0, 0, 0);
    scene.add(centralCoreLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 3.5, 45);
    cyanPointLight.position.set(16, 12, 16);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(0xa855f7, 3.5, 45);
    violetPointLight.position.set(-16, -8, 16);
    scene.add(violetPointLight);

    const amberSpotLight = new THREE.SpotLight(0xf59e0b, 5, 60, Math.PI / 4, 0.4);
    amberSpotLight.position.set(0, 24, 0);
    amberSpotLight.target.position.set(0, 0, 0);
    scene.add(amberSpotLight);
    scene.add(amberSpotLight.target);

    // 5. Central Astrolabe / Quantum Holo-Core
    const astrolabeGroup = new THREE.Group();
    scene.add(astrolabeGroup);
    astrolabeGroup.position.set(0, 0, 0);

    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xb45309,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2,
    });

    const cyanRingMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.2,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.06, 16, 90), goldRingMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.05, 16, 80), cyanRingMat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.04, 16, 70), goldRingMat);
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    astrolabeGroup.add(ring1, ring2, ring3);

    // Glowing Core Sphere
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfff3c4 });
    const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 24, 24), coreMat);
    astrolabeGroup.add(coreSphere);

    // Inner Wireframe Icosahedron
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
    });
    const wireIco = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), wireMat);
    astrolabeGroup.add(wireIco);

    // 6. Holographic Grid Floor & Concentric Energy Waves
    const gridHelper = new THREE.PolarGridHelper(32, 16, 8, 64, 0xf59e0b, 0x1e3a8a);
    gridHelper.position.y = -3.8;
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    if (gridMat) {
      gridMat.opacity = 0.28;
      gridMat.transparent = true;
    }
    scene.add(gridHelper);

    // Radial Cyber Wave Rings on Floor
    const floorRingsGroup = new THREE.Group();
    floorRingsGroup.position.y = -3.78;
    scene.add(floorRingsGroup);

    [8, 14, 20, 26].forEach((rad, i) => {
      const ringGeom = new THREE.RingGeometry(rad - 0.08, rad + 0.08, 64);
      const ringM = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xffd700 : 0x00f0ff,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(ringGeom, ringM);
      mesh.rotation.x = Math.PI / 2;
      floorRingsGroup.add(mesh);
    });

    // 7. Multi-Colored Stardust & Nebula Particle Field
    const particleCount = 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x00f0ff);
    const cGold = new THREE.Color(0xffd700);
    const cEmerald = new THREE.Color(0x10b981);
    const cViolet = new THREE.Color(0xa855f7);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 80;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 80;

      const rnd = Math.random();
      const col = rnd > 0.8 ? cGold : rnd > 0.6 ? cCyan : rnd > 0.4 ? cEmerald : rnd > 0.2 ? cViolet : cWhite;
      particleColors[i3] = col.r;
      particleColors[i3 + 1] = col.g;
      particleColors[i3 + 2] = col.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.26,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const starParticles = new THREE.Points(particleGeom, particleMat);
    scene.add(starParticles);

    // 8. 3D Event Monoliths / Podiums
    const monolithMap = new Map<string, THREE.Group>();
    const interactiveMeshes: THREE.Mesh[] = [];

    const radius = 14;
    const count = events.length;

    events.forEach((event, idx) => {
      const catStyle = CATEGORY_COLORS[event.category] || DEFAULT_COLOR;
      const angle = (idx / count) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.rotation.set(0, -angle - Math.PI / 2, 0);

      // Monolith Pedestal Base
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x070d1e,
        metalness: 0.85,
        roughness: 0.25,
        emissive: catStyle.glow,
        emissiveIntensity: 0.4,
      });
      const baseGeom = new THREE.CylinderGeometry(2.4, 2.7, 0.4, 32);
      const baseMesh = new THREE.Mesh(baseGeom, baseMat);
      baseMesh.position.y = -2.8;
      group.add(baseMesh);

      // Glowing Base Ring
      const baseRingGeom = new THREE.TorusGeometry(2.55, 0.08, 16, 64);
      const baseRingMat = new THREE.MeshBasicMaterial({ color: catStyle.hex });
      const baseRing = new THREE.Mesh(baseRingGeom, baseRingMat);
      baseRing.position.y = -2.6;
      baseRing.rotation.x = Math.PI / 2;
      group.add(baseRing);

      // Vertical Hologram Light Pillar Beam
      const pillarGeom = new THREE.CylinderGeometry(0.1, 0.6, 6, 16);
      const pillarMat = new THREE.MeshBasicMaterial({
        color: catStyle.hex,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const pillar = new THREE.Mesh(pillarGeom, pillarMat);
      pillar.position.y = 0.2;
      group.add(pillar);

      // Main High-Res Screen Display Plane
      const screenTexture = createMonolithCanvasTexture(event);
      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTexture,
        metalness: 0.3,
        roughness: 0.4,
        emissive: catStyle.glow,
        emissiveIntensity: 0.25,
      });
      const screenGeom = new THREE.BoxGeometry(3.6, 4.9, 0.12);
      const screenMesh = new THREE.Mesh(screenGeom, screenMat);
      screenMesh.position.y = 0;
      screenMesh.userData = { eventId: event.id, eventObj: event };
      group.add(screenMesh);
      interactiveMeshes.push(screenMesh);

      // Screen Frame Glow Rim
      const frameGeom = new THREE.BoxGeometry(3.72, 5.02, 0.08);
      const frameMat = new THREE.MeshBasicMaterial({
        color: catStyle.hex,
        wireframe: true,
      });
      const frameMesh = new THREE.Mesh(frameGeom, frameMat);
      frameMesh.position.y = 0;
      group.add(frameMesh);

      // Floating Crown Ring on top of monolith
      const crownGeom = new THREE.TorusGeometry(1.2, 0.04, 12, 32);
      const crownMat = new THREE.MeshBasicMaterial({
        color: catStyle.hex,
      });
      const crownMesh = new THREE.Mesh(crownGeom, crownMat);
      crownMesh.position.y = 2.8;
      crownMesh.rotation.x = Math.PI / 2;
      group.add(crownMesh);

      scene.add(group);
      monolithMap.set(event.id, group);
    });

    monolithGroupsRef.current = monolithMap;
    interactiveMeshesRef.current = interactiveMeshes;

    // 9. Raycasting Setup for Mouse Hover & Clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedEvent = (e: MouseEvent): { mesh: THREE.Mesh; event: DepartmentEvent } | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current);
      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        if (mesh.userData?.eventObj) {
          return { mesh, event: mesh.userData.eventObj as DepartmentEvent };
        }
      }
      return null;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const result = getIntersectedEvent(e);
      if (result) {
        const id = result.event.id;
        hoveredIdRef.current = id;
        container.style.cursor = 'pointer';

        // Lift & illuminate hovered monolith
        monolithMap.forEach((grp, mapId) => {
          if (mapId === id) {
            grp.position.y = 0.5;
            const mat = result.mesh.material as THREE.MeshStandardMaterial;
            if (mat && 'emissiveIntensity' in mat) mat.emissiveIntensity = 0.6;
          } else {
            grp.position.y = 0;
          }
        });
      } else {
        hoveredIdRef.current = null;
        container.style.cursor = 'grab';
        monolithMap.forEach((grp) => {
          grp.position.y = 0;
        });
      }

      // If user is dragging in holo-ring mode
      if (isDraggingRef.current && viewMode === '3d-holo-ring') {
        const deltaX = e.clientX - lastMouseXRef.current;
        carouselAngleRef.current += deltaX * 0.008;
        lastMouseXRef.current = e.clientX;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.clientX;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      const result = getIntersectedEvent(e);
      if (result) {
        onSelectEvent(result.event);
      }
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Controls update
      controls.autoRotate = autoOrbit;
      controls.update();

      // Rotate Astrolabe rings
      astrolabeGroup.rotation.y = elapsed * 0.12;
      ring1.rotation.z = elapsed * 0.15;
      ring2.rotation.x = elapsed * -0.18;
      ring3.rotation.y = elapsed * 0.22;
      wireIco.rotation.y = elapsed * -0.35;
      wireIco.rotation.x = elapsed * 0.2;

      // Pulse Central Core
      const pulseScale = 1 + Math.sin(elapsed * 3) * 0.18;
      coreSphere.scale.set(pulseScale, pulseScale, pulseScale);

      // Star particles gentle drift
      starParticles.rotation.y = elapsed * 0.012;
      starParticles.rotation.x = Math.sin(elapsed * 0.05) * 0.02;

      // Floor rings subtle pulse
      floorRingsGroup.rotation.z = elapsed * -0.04;

      // Floating wave animation for all monoliths
      monolithMap.forEach((grp, id) => {
        const isHovered = hoveredIdRef.current === id;
        const isSelected = selectedEvent?.id === id;
        const baseFloatY = Math.sin(elapsed * 2 + id.length) * 0.15;
        if (!isHovered) {
          grp.position.y = (isSelected ? 0.6 : 0) + baseFloatY;
        }
      });

      // Smooth Camera Animation Easing
      if (cameraAnimRef.current.isAnimating) {
        const now = performance.now();
        const progress = Math.min((now - cameraAnimRef.current.startTime) / cameraAnimRef.current.duration, 1);

        // Smooth cubic ease out
        const ease = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(cameraAnimRef.current.startPos, cameraAnimRef.current.targetPos, ease);
        controls.target.lerpVectors(cameraAnimRef.current.startLook, cameraAnimRef.current.targetLook, ease);

        if (progress >= 1) {
          cameraAnimRef.current.isAnimating = false;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, [events, createMonolithCanvasTexture, onSelectEvent, autoOrbit, selectedEvent, viewMode]);

  return (
    <div
      ref={containerRef}
      id="three-spatial-viewport"
      className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[88vh] select-none touch-none overflow-hidden rounded-3xl border border-amber-500/25 bg-[#030712] shadow-2xl"
    >
      {/* Viewport Floating HUD Badge */}
      <div className="pointer-events-none absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-amber-400/40 bg-slate-950/80 px-3.5 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-300">
          3D Interactive Spatial Engine
        </span>
      </div>

      {/* Interactive Helper Hint */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/75 px-3 py-1.5 text-[11px] text-slate-300 backdrop-blur-md">
        <span>🖱️ Drag to rotate 360° • Scroll to zoom • Click any 3D event to focus &amp; inspect</span>
      </div>
    </div>
  );
};
