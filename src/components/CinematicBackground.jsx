import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 600 }) => {
  const points = useRef();
  const lines = useRef();

  // Generate random positions
  const [positions, linesPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    // Create random static connections to look like a neural network
    const linesPos = [];
    for (let i = 0; i < count; i++) {
      const connections = Math.floor(Math.random() * 3);
      for (let j = 0; j < connections; j++) {
        const target = Math.floor(Math.random() * count);
        linesPos.push(
          pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
          pos[target * 3], pos[target * 3 + 1], pos[target * 3 + 2]
        );
      }
    }
    return [pos, new Float32Array(linesPos)];
  }, [count]);

  const mouse = useRef([0, 0]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.1;
    
    // Subtle mouse parallax
    mouse.current[0] += (state.pointer.x - mouse.current[0]) * 0.05;
    mouse.current[1] += (state.pointer.y - mouse.current[1]) * 0.05;
    
    if (points.current) {
      points.current.rotation.y = time + mouse.current[0] * 0.2;
      points.current.rotation.x = mouse.current[1] * 0.2;
    }
    if (lines.current) {
      lines.current.rotation.y = time + mouse.current[0] * 0.2;
      lines.current.rotation.x = mouse.current[1] * 0.2;
    }
  });

  return (
    <group>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#a78bfa" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
      
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linesPositions.length / 3} array={linesPositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.08} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

export default function CinematicBackground({ performanceMode = false }) {
  if (performanceMode) {
    // CSS Fallback
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: 'var(--navy-deep)' }}>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '40vw', height: '40vw', background: 'var(--violet)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%', animation: 'spin 20s linear infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '30vw', height: '30vw', background: 'var(--cyan)', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%', animation: 'spin 15s linear infinite reverse' }}></div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'var(--navy-deep)' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <fog attach="fog" args={['#02020a', 5, 20]} />
        <ParticleField count={800} />
      </Canvas>
    </div>
  );
}
