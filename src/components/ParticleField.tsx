import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 150 }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrb({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    mesh.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.3;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function isMobile(): boolean {
  return window.innerWidth < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent);
}

export function ParticleField() {
  const [visible, setVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Skip on mobile (save battery) and when WebGL is not available
    if (isMobile() || !hasWebGL()) return;

    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (hasError || !visible) return null;

  return (
    <div className="absolute inset-0 z-0" style={{ opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
        onError={() => setHasError(true)}
        fallback={null}
      >
        <Particles count={120} />
        <FloatingOrb position={[-3, 2, -2]} color="#8b5cf6" speed={0.8} />
        <FloatingOrb position={[3, -1, -3]} color="#ec4899" speed={1.2} />
        <FloatingOrb position={[0, 3, -4]} color="#6366f1" speed={0.6} />
      </Canvas>
    </div>
  );
}
