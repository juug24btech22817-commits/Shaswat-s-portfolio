import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, ThreeElements } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial, Grid, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Add standard React Three Fiber JSX type definitions to the global namespace
// to allow the use of Three.js elements as intrinsic JSX tags (e.g., <mesh />, <group />, <ambientLight />).
// Fixed: Augmented both JSX and React.JSX namespaces to ensure compatibility with modern React JSX transforms (React 18+).
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

const DataShard = ({ position, size, rotation, speed }: any) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * speed;
    ref.current.rotation.y = time * speed * 0.8;
    ref.current.position.y += Math.sin(time + position[0]) * 0.002;
  });

  return (
    // Fixed: Added JSX intrinsic element support for mesh, boxGeometry, and meshBasicMaterial via augmented namespace.
    <mesh position={position} rotation={rotation} ref={ref}>
      <boxGeometry args={[size, size * 0.1, size]} />
      <meshBasicMaterial color="#00f2ff" transparent opacity={0.1} wireframe />
    </mesh>
  );
};

export const Scene: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  const particlesPosition = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  const particlesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));
    return geo;
  }, [particlesPosition]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.01;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, state.mouse.x * 0.5, 0.03);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, state.mouse.y * 0.5, 0.03);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.5;
      const targetX = state.mouse.x * (viewport.width / 6);
      const targetY = state.mouse.y * (viewport.height / 6);
      coreRef.current.position.x = THREE.MathUtils.lerp(coreRef.current.position.x, targetX, 0.05);
      coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, targetY, 0.05);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.2;
      ringRef.current.rotation.x = Math.PI / 2 + state.mouse.y * 0.2;
    }
  });

  return (
    <>
      {/* Fixed: Added JSX support for color and fog intrinsic elements via augmented namespace. */}
      <color attach="background" args={['#08090A']} />
      <fog attach="fog" args={['#08090A', 2, 25]} />
      
      {/* Fixed: Added JSX support for group intrinsic element via augmented namespace. */}
      <group position={[0, -2.5, 0]} rotation={[0, 0, 0]}>
        <Grid
          infiniteGrid
          fadeDistance={30}
          fadeStrength={5}
          cellSize={1}
          sectionSize={5}
          sectionColor="#00f2ff"
          sectionThickness={1}
          cellColor="#1e293b"
          cellThickness={0.5}
        />
      </group>

      {/* Floating Neural Particles */}
      <Points ref={pointsRef} geometry={particlesGeometry}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.4}
        />
      </Points>

      {/* Central Neural Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={coreRef} args={[1, 64, 64]} position={[0, 0, -2]}>
          <MeshDistortMaterial
            color="#00f2ff"
            envMapIntensity={0.5}
            clearcoat={1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={4}
            emissive="#00f2ff"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>

      {/* Orbital Ring */}
      <Torus ref={ringRef} args={[2.2, 0.01, 16, 100]} position={[0, 0, -2]}>
        {/* Fixed: Standard meshBasicMaterial intrinsic tag recognized via augmented namespace. */}
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.2} />
      </Torus>

      {/* Strategic Shards */}
      {Array.from({ length: 15 }).map((_, i) => (
        <DataShard 
          key={i} 
          position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, -5 - Math.random() * 10]} 
          size={0.2 + Math.random() * 0.5}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          speed={0.2 + Math.random() * 0.5}
        />
      ))}

      {/* Fixed: Added JSX support for light intrinsic elements via augmented namespace. */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
      <spotLight position={[0, 10, 0]} intensity={3} angle={0.5} penumbra={1} color="#ffffff" />
    </>
  );
};
