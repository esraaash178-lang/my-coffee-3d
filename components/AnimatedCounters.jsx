'use client';

import { motion } from 'framer-motion';

export default function AnimatedCounters() {
  const stats = [
    { number: '+٥,٠٠٠', label: 'كوب قهوة شهرياً' },
    { number: '١٠٠٪', label: 'حبوب بن عضوي فاخر' },
    { number: '٤.٩★', label: 'تقييم العملاء' },
    { number: '+١٥', label: 'خلطة قهوة خاصة' },
  ];

  return (
    <section className="py-12 border-y border-amber-500/20 bg-zinc-950/50 backdrop-blur-md my-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="space-y-1"
          >
            <h3 className="text-3xl md:text-5xl font-black text-amber-500 tracking-tight">
              {stat.number}
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}