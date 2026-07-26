'use client';
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0f0f]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="text-center"
      >
        <h1 className="text-amber-500 text-5xl font-bold tracking-widest">AURA</h1>
        <p className="text-zinc-400 text-sm mt-2">قهوة تُصنع بشغف</p>
      </motion.div>
    </motion.div>
  );
}