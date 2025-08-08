import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Vehicle({ speed, isAutoDrive }) {
  const vehicleRef = useRef();
  const [position, setPosition] = useState([0, 0.5, 0]);

  useFrame(() => {
    if (isAutoDrive && vehicleRef.current) {
      const newZ = position[2] - speed / 100;
      const newPosition = [position[0], position[1], newZ];
      setPosition(newPosition);
      vehicleRef.current.position.set(...newPosition);
    }
  });

  return (
    <mesh ref={vehicleRef} position={position}>
      <boxGeometry args={[1, 1, 2]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#555" />
    </mesh>
  );
}

function DrivingSimulator() {
  const [isAutoDrive, setIsAutoDrive] = useState(false);

  const toggleAutoDrive = () => {
    setIsAutoDrive(!isAutoDrive);
  };

  return (
    <div>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Ground />
        <Vehicle speed={2} isAutoDrive={isAutoDrive} />
        <OrbitControls />
      </Canvas>
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <button onClick={toggleAutoDrive}>{isAutoDrive ? 'Stop' : 'Start AutoDrive'}</button>
      </div>
    </div>
  );
}

export default DrivingSimulator;
