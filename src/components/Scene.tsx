import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Tube, 
  Box, 
  Cylinder, 
  Sphere,
  Float,
  Cloud
} from '@react-three/drei';
import * as THREE from 'three';
import { Helmet } from '../types';

interface SceneProps {
  selectedHelmet: Helmet | null;
}

// --------------------------------------------------------
// ROAD: S-BEND HIGHWAY
// --------------------------------------------------------
const Road = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(25, 0, -60),
      new THREE.Vector3(20, 0, -40),
      new THREE.Vector3(5, 0, -20),
      new THREE.Vector3(0, 0, 0),      // Apex / Transition point
      new THREE.Vector3(-15, 0, 20),
      new THREE.Vector3(-25, 0, 40),
      new THREE.Vector3(-20, 0, 60),
    ]);
  }, []);

  return (
    <group>
      {/* Asphalt */}
      <Tube args={[curve, 128, 6, 8, false]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
      </Tube>
      
      {/* Center Line (dashed effect simulated with high texture repeat or just a slightly thinner/higher tube, or just a solid line for simplicity) */}
      <Tube args={[curve, 128, 0.1, 4, false]} position={[0, 5.95, 0]}>
        <meshStandardMaterial color="#eab308" roughness={1} />
      </Tube>
      <Tube args={[curve, 128, 0.1, 4, false]} position={[0, 6, 0]}>
        <meshStandardMaterial color="#eab308" roughness={1} />
      </Tube>

      {/* Side lines */}
      <Tube args={[curve, 128, 0.15, 4, false]} position={[5.5, 2, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </Tube>
      <Tube args={[curve, 128, 0.15, 4, false]} position={[-5.5, 2, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </Tube>
    </group>
  );
};

// --------------------------------------------------------
// MOTORCYCLE & RIDER (Stylized, Leaning)
// --------------------------------------------------------
const RiderAndBike = ({ helmet }: { helmet: Helmet | null }) => {
  // Materials
  const bikeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111', roughness: 0.2, metalness: 0.8 }), []);
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#333', roughness: 0.5, metalness: 0.9 }), []);
  const tireMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 0.9 }), []);
  const suitMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.7, metalness: 0.1 }), []);
  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e53e3e', roughness: 0.4 }), []);

  const helmetBaseColor = helmet?.color || '#1a1a1a';
  const helmetVisorColor = helmet?.visorColor || '#000000';
  const helmetAccentColor = helmet?.accentColor || '#333333';

  // Spin wheels slightly in a useFrame to simulate motion if desired, but we want frozen in time!
  // "THE MOMENT LASTS FOREVER" -> no wheel spinning.

  return (
    // Bike leaning right into the curve
    <group position={[0, 6, 0]} rotation={[0, -Math.PI / 8, -0.6]}>
      
      {/* ---- BIKE ---- */}
      <group position={[0, 0, 0]}>
        {/* Wheels */}
        <Cylinder args={[1.2, 1.2, 0.6, 32]} rotation={[Math.PI/2, 0, 0]} position={[0, 1.2, 2.8]} material={tireMat} />
        <Cylinder args={[1.2, 1.2, 0.7, 32]} rotation={[Math.PI/2, 0, 0]} position={[0, 1.2, -2.8]} material={tireMat} />
        
        {/* Rims */}
        <Cylinder args={[0.9, 0.9, 0.62, 16]} rotation={[Math.PI/2, 0, 0]} position={[0, 1.2, 2.8]} material={frameMat} />
        <Cylinder args={[0.9, 0.9, 0.72, 16]} rotation={[Math.PI/2, 0, 0]} position={[0, 1.2, -2.8]} material={frameMat} />

        {/* Chassis / Body */}
        <Box args={[1.2, 1.8, 3.5]} position={[0, 2.2, 0]} material={bikeMat} />
        {/* Tank */}
        <Box args={[1.4, 1.2, 1.8]} position={[0, 3.2, 0.5]} material={bikeMat} />
        {/* Tail */}
        <Box args={[1.0, 0.8, 2]} position={[0, 2.8, -1.8]} rotation={[0.2, 0, 0]} material={bikeMat} />

        {/* Headlight fairing */}
        <Box args={[1.5, 1.2, 1]} position={[0, 2.8, 2.2]} rotation={[-0.3, 0, 0]} material={bikeMat} />
        {/* Glowing Headlight */}
        <Box args={[0.8, 0.4, 0.1]} position={[0, 2.8, 2.7]} rotation={[-0.3, 0, 0]}>
          <meshBasicMaterial color="#ffffff" />
        </Box>

        {/* Forks */}
        <Cylinder args={[0.1, 0.1, 2.5]} rotation={[0.3, 0, 0]} position={[0.4, 2.2, 2.5]} material={frameMat} />
        <Cylinder args={[0.1, 0.1, 2.5]} rotation={[0.3, 0, 0]} position={[-0.4, 2.2, 2.5]} material={frameMat} />

        {/* Swingarm */}
        <Box args={[0.2, 0.4, 2]} position={[0.5, 1.5, -1.5]} rotation={[-0.2, 0, 0]} material={frameMat} />
        <Box args={[0.2, 0.4, 2]} position={[-0.5, 1.5, -1.5]} rotation={[-0.2, 0, 0]} material={frameMat} />

        {/* Exhaust */}
        <Cylinder args={[0.2, 0.25, 1.5]} position={[0.7, 1.4, -1.8]} rotation={[0.2, 0, 0]} material={frameMat} />
      </group>

      {/* ---- RIDER ---- */}
      {/* Shifted body to the inside of the turn (right side) */}
      <group position={[0.4, 3.2, -0.2]} rotation={[0, -0.2, 0.3]}>
        
        {/* Torso leaning forward */}
        <Box args={[1.2, 1.6, 0.8]} position={[0, 0.8, 0.5]} rotation={[0.6, 0, 0]} material={suitMat} />
        
        {/* Hump on back (racing suit) */}
        <Box args={[0.6, 1.2, 0.4]} position={[0, 1.0, -0.1]} rotation={[0.6, 0, 0]} material={accentMat} />

        {/* Right Leg (knee out) */}
        <group position={[0.7, 0, 0]} rotation={[-0.2, 0.8, -0.5]}>
          {/* Thigh */}
          <Cylinder args={[0.3, 0.25, 1.2]} position={[0, -0.5, 0]} material={suitMat} />
          {/* Calf */}
          <Cylinder args={[0.25, 0.2, 1.2]} position={[0, -1.5, -0.2]} rotation={[0.8, 0, 0]} material={suitMat} />
          {/* Boot */}
          <Box args={[0.3, 0.3, 0.8]} position={[0, -2.1, -0.1]} rotation={[0.8, 0, 0]} material={bikeMat} />
        </group>

        {/* Left Leg (gripping tank) */}
        <group position={[-0.7, 0, 0]} rotation={[0.2, -0.2, 0.2]}>
          <Cylinder args={[0.3, 0.25, 1.2]} position={[0, -0.5, 0]} material={suitMat} />
          <Cylinder args={[0.25, 0.2, 1.2]} position={[0, -1.5, 0.2]} rotation={[-0.4, 0, 0]} material={suitMat} />
          <Box args={[0.3, 0.3, 0.8]} position={[0, -2.1, 0.4]} rotation={[-0.4, 0, 0]} material={bikeMat} />
        </group>

        {/* Right Arm */}
        <group position={[0.7, 1.4, 0.5]} rotation={[-0.4, 0.2, -0.4]}>
          <Cylinder args={[0.2, 0.18, 1.0]} position={[0, -0.4, 0]} material={suitMat} />
          <Cylinder args={[0.18, 0.15, 1.0]} position={[0, -1.2, 0.3]} rotation={[-0.5, 0, 0]} material={suitMat} />
        </group>

        {/* Left Arm */}
        <group position={[-0.7, 1.4, 0.5]} rotation={[0.2, -0.3, 0.3]}>
          <Cylinder args={[0.2, 0.18, 1.0]} position={[0, -0.4, 0]} material={suitMat} />
          <Cylinder args={[0.18, 0.15, 1.0]} position={[0, -1.2, -0.2]} rotation={[0.5, 0, 0]} material={suitMat} />
        </group>

        {/* ---- HELMET (THE HERO) ---- */}
        {/* Positioned on the head, looking slightly through the turn */}
        <group position={[0, 1.9, 1.1]} rotation={[-0.3, 0.4, -0.2]}>
          
          {/* Base Helmet Shell */}
          <Sphere args={[0.55, 32, 32]}>
            <meshStandardMaterial color={helmetBaseColor} roughness={0.2} metalness={0.5} />
          </Sphere>
          
          {/* Visor */}
          <Box args={[0.8, 0.4, 0.5]} position={[0, 0.05, 0.35]} rotation={[0.2, 0, 0]}>
            <meshStandardMaterial color={helmetVisorColor} roughness={0.1} metalness={0.8} />
          </Box>
          
          {/* Spoiler / Accents (depends on shape) */}
          {(helmet?.shape === 'track' || helmet?.shape === 'aggressive') && (
            <Box args={[0.4, 0.3, 0.6]} position={[0, -0.1, -0.4]} rotation={[-0.2, 0, 0]}>
              <meshStandardMaterial color={helmetAccentColor} roughness={0.3} metalness={0.3} />
            </Box>
          )}

          {helmet?.shape === 'touring' && (
            <Box args={[0.5, 0.1, 0.4]} position={[0, 0.4, -0.2]}>
              <meshStandardMaterial color={helmetAccentColor} roughness={0.4} metalness={0.2} />
            </Box>
          )}

        </group>
      </group>

    </group>
  );
};

export default function Scene({ selectedHelmet }: SceneProps) {
  return (
    <Canvas 
      shadows 
      camera={{ position: [-12, 10, -15], fov: 35 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={['#0f172a']} />
      <fog attach="fog" args={['#0f172a', 15, 80]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[20, 20, -10]} 
        intensity={2.5} 
        color="#ffedd5" // Warm sunlight
        castShadow 
      />
      <directionalLight position={[-10, -10, 10]} intensity={0.5} color="#93c5fd" />
      
      {/* Environment lighting */}
      <Environment preset="sunset" />

      {/* Atmospheric dust */}
      <Cloud position={[0, 10, -30]} opacity={0.2} speed={0.1} scale={2} color="#475569" />
      <Cloud position={[30, 5, 10]} opacity={0.1} speed={0.1} scale={1.5} color="#475569" />
      
      <group position={[0, -8, 0]}>
        <Road />
        <RiderAndBike helmet={selectedHelmet} />
        
        {/* Soft ground shadow to ground the scene */}
        <ContactShadows 
          resolution={1024} 
          scale={20} 
          blur={2} 
          opacity={0.6} 
          far={10} 
          color="#000000"
          position={[0, 5.9, 0]}
        />
      </group>

      <OrbitControls 
        makeDefault
        enablePan={false}
        minDistance={10}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={Math.PI / 6}
        target={[0, -2, 0]}
      />
    </Canvas>
  );
}
