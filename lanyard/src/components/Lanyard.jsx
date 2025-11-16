/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Import your photo and logo
import cardImage from '../assets/my-pic.png';
import logoImage from '../assets/android-chrome-512x512.png';

extend({ MeshLineGeometry, MeshLineMaterial });

// Helper function to create text canvas
function createTextCanvas(text, color, fontSize, fontWeight) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set text style
  ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw text
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  return canvas;
}

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="lanyard-canvas-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  const segmentProps = { 
    type: 'dynamic', 
    canSleep: true, 
    colliders: false, 
    angularDamping: 4, 
    linearDamping: 4 
  };
  
  // Load textures
  const cardTexture = useTexture(cardImage);
  const logoTexture = useTexture(logoImage);
  
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(), 
      new THREE.Vector3(), 
      new THREE.Vector3(), 
      new THREE.Vector3()
    ])
  );
  
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 1024
  );

  // Create rope joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ 
        x: vec.x - dragged.x, 
        y: vec.y - dragged.y, 
        z: vec.z - dragged.z 
      });
    }
    
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) 
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody 
          position={[2, 0, 0]} 
          ref={card} 
          {...segmentProps} 
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.7, 1.0, 0.01]} />
          <group
            scale={2.0}
            position={[0, -1.1, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {/* Card Front */}
            <group position={[0, 0, 0.011]}>
              {/* Photo Section - Upper part */}
              <mesh position={[0, 0.35, 0]}>
                <planeGeometry args={[1.5, 1.4]} />
                <meshStandardMaterial 
                  map={cardTexture}
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
              
              {/* Name and Title Section - Lower part */}
              <mesh position={[0, -0.6, 0]}>
                <planeGeometry args={[1.5, 0.8]} />
                <meshStandardMaterial 
                  color="#ffffff"
                  metalness={0.2}
                  roughness={0.8}
                />
              </mesh>
              
              {/* Text: Name */}
              <mesh position={[0, -0.45, 0.001]}>
                <planeGeometry args={[1.4, 0.2]} />
                <meshBasicMaterial>
                  <canvasTexture attach="map" image={createTextCanvas('Mohammed Saud Al-Rumaihi', '#1e3c72', 24, 'bold')} />
                </meshBasicMaterial>
              </mesh>
              
              {/* Text: Title */}
              <mesh position={[0, -0.7, 0.001]}>
                <planeGeometry args={[1.4, 0.15]} />
                <meshBasicMaterial>
                  <canvasTexture attach="map" image={createTextCanvas('Software Engineer', '#667eea', 18, 'normal')} />
                </meshBasicMaterial>
              </mesh>
              
              {/* Divider Line */}
              <mesh position={[0, -0.25, 0.001]}>
                <planeGeometry args={[1.3, 0.01]} />
                <meshBasicMaterial color="#667eea" />
              </mesh>
            </group>
            
            {/* Card Back with Logo */}
            <group position={[0, 0, -0.011]}>
              <mesh>
                <planeGeometry args={[1.6, 2.25]} />
                <meshStandardMaterial 
                  color="#1e3c72"
                  metalness={0.5}
                  roughness={0.5}
                />
              </mesh>
              
              {/* Logo on back */}
              <mesh position={[0, 0, 0.001]}>
                <planeGeometry args={[0.8, 0.8]} />
                <meshStandardMaterial 
                  map={logoTexture}
                  transparent={true}
                  metalness={0.3}
                  roughness={0.7}
                />
              </mesh>
            </group>
            
            {/* Card Frame/Base */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.6, 2.25, 0.02]} />
              <meshStandardMaterial 
                color="#ffffff"
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
            
            {/* Card Border */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(1.6, 2.25, 0.02)]} />
              <lineBasicMaterial color="white" linewidth={2} />
            </lineSegments>
            
            {/* Clip/Holder at top */}
            <mesh position={[0, 1.1, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
              <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      
      {/* Lanyard Band/Rope */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
