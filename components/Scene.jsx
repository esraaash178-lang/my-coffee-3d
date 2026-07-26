'use client';

import Steam from './steam';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
gsap.registerPlugin(ScrollTrigger);

// 1. مكون المجسم الحقيقي (لما يكون عندك ملف .glb جاهز)
function Model({ url }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 4,
        x: Math.PI * 1,
        scrollTrigger: {
          trigger: '#scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={20} />
      <group position={[0, 0.3, 0]}>
        <Steam count={30} />
      </group>
    </group>
  );
}

// 2. مكون المكعب المؤقت (شغال حالياً لحد ما تجهزي ملف الـ 3D)
function TempBox() {
  const boxRef = useRef();

  useEffect(() => {
    if (!boxRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 16,
        x: Math.PI * 2,
        scrollTrigger: {
          trigger: 'document.body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      gsap.to(modelRef.current.position, {
        x: 2.5,
        scrollTrigger: {
          trigger: 'document.body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useFrame((_, delta) => {
    if (modelRef.current) {
        const maxscroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage= scrollY / maxscroll;
      modelRef.current.rotation.y = scrollPercentage * Math.PI * 16;
      const targetY = Math.sin(scrollY * 0.008) * 0.15;
      modelRef.current.position.y += (targetY - modelRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <mesh ref={modelRef} rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff5500" roughness={0.2} metalness={0.5} />
    </mesh>
  );
}

// المشهد الرئيسي
export default function Scene() {
  // لو معاكي ملف 3D جاهز، غيري المتغير ده لـ true وحطي المسار بتاعه تحت
  const hasModel = true; // false لو لسه ما عندكش ملف 3D جاهز

  return (
    <div className="fixed top-0 left-[-90] w-full h-screen z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[2, 2, 2]} intensity={0.5} />
        
        {hasModel ? <Model url="coffee_cup.glb" /> : <TempBox />}
        <EffectComposer>
            <Bloom
                intensity={0.3}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
            />
        </EffectComposer>
      </Canvas>
    </div>
  );
}