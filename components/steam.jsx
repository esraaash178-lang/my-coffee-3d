'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Steam({ count = 25 }) {
  const meshRef = useRef();

  // تجهيز مواضع أولية عشوائية وسرعات لكل جزيء بخار
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 0.4, // انتشار خفيف أفقياً
        y: Math.random() * 1.5,          // ارتفاعات مختلفة
        z: (Math.random() - 0.5) * 0.4,
        speed: 0.005 + Math.random() * 0.008, // سرعة الصعود
        scale: 0.1 + Math.random() * 0.15,    // أحجام متفاوته
        opacity: Math.random(),
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // تحريك البخار لأعلى
      particle.y += particle.speed;
      particle.x += Math.sin(particle.y * 5) * 0.001; // تموج خفيف مع الهواء

      // إعادة تدوير البخار لما يطلع لفوق خالص
      if (particle.y > 1.8) {
        particle.y = 0;
        particle.x = (Math.random() - 0.5) * 0.3;
      }

      // تطبيق المواضع والأحجام
      dummy.position.set(particle.x, particle.y + 0.6, particle.z); // +0.6 عشان يبدأ من فوهة المجست
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      {/* شكل كروي ناعم للجزيئات */}
      <sphereGeometry args={[0.2, 16, 16]} />
      {/* خامة ناعمة شبه شفافة تعطي إحساس الدخان */}
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}