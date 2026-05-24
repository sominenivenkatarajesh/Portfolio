import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const points = useMemo(() => {
    const p = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.04;
    ref.current.rotation.y = clock.getElapsedTime() * 0.025;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#64ffda" size={0.015} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
};

const FloatingTorus = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.3;
    ref.current.rotation.y = clock.getElapsedTime() * 0.2;
  });
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={[3.5, 0.5, -3]}>
        <torusKnotGeometry args={[0.9, 0.28, 128, 16]} />
        <meshStandardMaterial color="#64ffda" wireframe opacity={0.35} transparent />
      </mesh>
    </Float>
  );
};

const FloatingOctahedron = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.4;
    ref.current.rotation.z = clock.getElapsedTime() * 0.2;
  });
  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={ref} position={[-4, -1, -2]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#64ffda" wireframe opacity={0.2} transparent />
      </mesh>
    </Float>
  );
};

const Scene = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#0a192f' }}>
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#64ffda" />
      <pointLight position={[-10, -5, -5]} intensity={0.4} color="#112240" />
      <Stars radius={120} depth={60} count={5000} factor={3} saturation={0} fade speed={0.8} />
      <ParticleField />
      <FloatingTorus />
      <FloatingOctahedron />
    </Canvas>
  </div>
);

export default Scene;
