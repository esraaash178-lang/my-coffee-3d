'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LightCard({ title, desc, price, icon, onOrder }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgba(217, 119, 6, 0.1)', 'rgba(245, 158, 11, 0.8)', 'rgba(217, 119, 6, 0.1)']
  );
  const titleColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#ffffff', '#fbbf24', '#ffffff']
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        borderColor: borderColor,
        boxShadow: useTransform(
          glowOpacity,
          (v) => `0 0 ${v * 25}px rgba(245, 158, 11, ${v * 0.4})`
        ),
      }}
      className="relative p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-md border transition-all duration-300 group text-center"
    >
      {/* 🌟 لو فيه أيقونة تظهر في الأعلى */}
      {icon && <div className="text-4xl mb-4">{icon}</div>}

      <motion.h3
        style={{ color: titleColor }}
        className="text-xl font-bold mb-2 transition-colors"
      >
        {title}
      </motion.h3>

      <p className="text-zinc-400 text-sm mb-4">{desc}</p>

      {/* 🌟 لو فيه سعر يظهر السعر والزرار */}
      {price && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-amber-500 font-bold">{price}</span>
          <button 
            onClick={onOrder}
            className="px-4 py-2 text-xs rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300"
          >
            اطلب الآن
          </button>
        </div>
      )}
    </motion.div>
  );
}