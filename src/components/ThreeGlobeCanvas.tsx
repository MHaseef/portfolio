import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NODES = [
  { name: 'Islamabad / NUST', lat: 33.68, lon: 73.02, hub: true },
  { name: 'San Francisco', lat: 37.77, lon: -122.42 },
  { name: 'London', lat: 51.51, lon: -0.13 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
];

export const ThreeGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mouseTarget = { x: 0, y: 0 };
    let baseRotation = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const globe = new THREE.Group();
    scene.add(globe);
    const R = 2.1;

    // Wireframe sphere
    const wireGeo = new THREE.SphereGeometry(R, 26, 20);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x1B6FA8, wireframe: true, transparent: true, opacity: 0.4 });
    globe.add(new THREE.Mesh(wireGeo, wireMat));

    // Inner fill sphere
    const fillMat = new THREE.MeshBasicMaterial({ color: 0xD9E6EE, transparent: true, opacity: 0.4 });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.995, 26, 20), fillMat));

    // Starfield background
    const starCount = 700;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 40 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x8B98A3, size: 0.07, transparent: true, opacity: 0.55 });
    scene.add(new THREE.Points(starGeo, starMat));

    // Convert Lat/Lon to Vector3
    const latLonToVec3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    const nodeVecs = NODES.map(n => ({ ...n, vec: latLonToVec3(n.lat, n.lon, R) }));
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x1B6FA8 });
    const hub = nodeVecs.find(n => n.hub);

    nodeVecs.forEach(n => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 12, 12),
        n.hub ? new THREE.MeshBasicMaterial({ color: 0x135183 }) : nodeMat
      );
      mesh.position.copy(n.vec);
      globe.add(mesh);
    });

    if (hub) {
      nodeVecs.filter(n => !n.hub).forEach(n => {
        const mid = hub.vec.clone().add(n.vec).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.3);
        const curve = new THREE.QuadraticBezierCurve3(hub.vec, mid, n.vec);
        const pts = curve.getPoints(48);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: 0x1B6FA8, transparent: true, opacity: 0.7 });
        globe.add(new THREE.Line(geo, mat));
      });
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let parallaxYaw = 0;
    let parallaxPitch = 0;
    let camZ = 6;
    let camY = 0;
    let globeX = 2.1;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFrac = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;

      baseRotation += 0.0009;
      parallaxYaw += (mouseTarget.x * 0.35 - parallaxYaw) * 0.04;
      parallaxPitch += (mouseTarget.y * -0.2 - parallaxPitch) * 0.04;

      globe.rotation.y = baseRotation + scrollFrac * 3.4 + parallaxYaw;
      globe.rotation.x = parallaxPitch + scrollFrac * 0.15;

      const targetX = 2.1 * (1 - Math.min(1, scrollFrac * 2.5));
      globeX += (targetX - globeX) * 0.05;
      globe.position.x = globeX;

      const targetZ = 6 + scrollFrac * 3.2;
      const targetY = scrollFrac * 1.3;
      camZ += (targetZ - camZ) * 0.05;
      camY += (targetY - camY) * 0.05;
      camera.position.z = camZ;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
};
