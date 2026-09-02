import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Low-end device & reduced motion detection
function useShouldRender3D() {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    try {
      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      const isLowEndDevice = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      if (prefersReducedMotion || isLowEndDevice) {
        setShouldRender(false);
      }
    } catch {
      // Default to true if media queries aren't supported
    }
  }, []);

  return shouldRender;
}

// Particle field (subtle texture, low count & opacity)
const ParticleField = () => {
  const count = 750;
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = (Math.random() - 0.5) * 16;
      p[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return p;
  }, [count]);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.018;
      ref.current.rotation.y = clock.getElapsedTime() * 0.012;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.22}
      />
    </Points>
  );
};

// Abstract Network Node Centerpiece Motif
const NetworkCenterpiece = () => {
  const groupRef = useRef();

  // Compute icosahedron vertices (nodes) and wireframe edges
  const { vertices, edgesGeometry } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.35, 0);
    const edges = new THREE.EdgesGeometry(geo);

    const positionAttr = geo.attributes.position;
    const verts = [];
    const seen = new Set();

    for (let i = 0; i < positionAttr.count; i++) {
      const x = Number(positionAttr.getX(i).toFixed(3));
      const y = Number(positionAttr.getY(i).toFixed(3));
      const z = Number(positionAttr.getZ(i).toFixed(3));
      const key = `${x},${y},${z}`;
      if (!seen.has(key)) {
        seen.add(key);
        verts.push([x, y, z]);
      }
    }
    return { vertices: verts, edgesGeometry: edges };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = clock.getElapsedTime() * 0.12;
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={groupRef} position={[3.2, 0.1, -1.8]}>
        {/* Semi-transparent inner faceted body for physical depth */}
        <mesh>
          <icosahedronGeometry args={[1.34, 0]} />
          <meshStandardMaterial
            color="#0d1b2a"
            transparent
            opacity={0.4}
            roughness={0.2}
            metalness={0.8}
            depthWrite={false}
          />
        </mesh>

        {/* Connecting glowing edge lines */}
        <lineSegments geometry={edgesGeometry}>
          <lineBasicMaterial color="#22d3ee" transparent opacity={0.4} />
        </lineSegments>

        {/* Glowing node spheres at each vertex */}
        {vertices.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.85}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Scene content with smooth mouse parallax
const SceneContent = () => {
  const parallaxGroupRef = useRef();

  useFrame((state) => {
    if (!parallaxGroupRef.current) return;
    // Subtly shift based on cursor position (max 0.3 units)
    const targetX = state.pointer.x * 0.3;
    const targetY = state.pointer.y * 0.3;

    parallaxGroupRef.current.position.x = THREE.MathUtils.lerp(
      parallaxGroupRef.current.position.x,
      targetX,
      0.05
    );
    parallaxGroupRef.current.position.y = THREE.MathUtils.lerp(
      parallaxGroupRef.current.position.y,
      targetY,
      0.05
    );
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      {/* Controlled lighting for depth and rim highlights */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 4]} intensity={0.85} color="#e0f2fe" />
      <pointLight position={[-4, -3, -2]} intensity={0.6} color="#0284c7" />
      <pointLight position={[4, -2, -3]} intensity={0.75} color="#22d3ee" />

      <group ref={parallaxGroupRef}>
        <ParticleField />
        <NetworkCenterpiece />
      </group>
    </>
  );
};

const Scene = () => {
  const shouldRender = useShouldRender3D();

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default Scene;
