'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoffeeBuilder({ onOrderCustom }) {
  const [base, setBase] = useState({ name: 'إسبريسو سينجل', price: 45 });
  const [milk, setMilk] = useState({ name: 'حليب مبخر', price: 15 });
  const [flavor, setFlavor] = useState({ name: 'بدون نكهة', price: 0 });

  const bases = [
    { name: 'إسبريسو سينجل', price: 45 },
    { name: 'إسبريسو دبل', price: 60 },
    { name: 'قهوة تركية / عربية', price: 40 },
  ];

  const milks = [
    { name: 'بدون حليب', price: 0 },
    { name: 'حليب مبخر', price: 15 },
    { name: 'حليب شوفان (Oat)', price: 20 },
  ];

  const flavors = [
    { name: 'بدون نكهة', price: 0 },
    { name: 'صوص كراميل', price: 15 },
    { name: 'لمسة فانيليا', price: 15 },
    { name: 'رشة هيل', price: 10 },
  ];

  const totalPrice = base.price + milk.price + flavor.price;

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-amber-500 mb-3">
           اصنع فنجانك بأسلوبك
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          اختر مكوناتك المفضل وشوف السعر والتركيبة بتتغير فوراً!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 🛠️ خيارات التخصيص */}
        <div className="lg:col-span-2 space-y-6 bg-zinc-900/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-amber-500/20">
          
          {/* 1. الأساس */}
          <div>
            <label className="block text-amber-400 text-sm font-bold mb-3">1. اختر أساس القهوة:</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {bases.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setBase(item)}
                  className={`p-3 rounded-xl text-sm border transition-all duration-300 text-right flex justify-between items-center ${
                    base.name === item.name
                      ? 'bg-amber-500 text-black border-amber-500 font-bold'
                      : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-amber-500/50'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs opacity-80">{item.price} ج.م</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. الحليب */}
          <div>
            <label className="block text-amber-400 text-sm font-bold mb-3">2. نوع الحليب:</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {milks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setMilk(item)}
                  className={`p-3 rounded-xl text-sm border transition-all duration-300 text-right flex justify-between items-center ${
                    milk.name === item.name
                      ? 'bg-amber-500 text-black border-amber-500 font-bold'
                      : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-amber-500/50'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs opacity-80">{item.price > 0 ? `+${item.price} ج.م` : 'مجاناً'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. النكهة */}
          <div>
            <label className="block text-amber-400 text-sm font-bold mb-3">3. النكهة الإضافية:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {flavors.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setFlavor(item)}
                  className={`p-3 rounded-xl text-sm border transition-all duration-300 text-right flex flex-col justify-between ${
                    flavor.name === item.name
                      ? 'bg-amber-500 text-black border-amber-500 font-bold'
                      : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-amber-500/50'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs mt-1 opacity-80">{item.price > 0 ? `+${item.price} ج.م` : 'بدون'}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ☕ كارت النتيجة والملخص */}
        <div className="bg-gradient-to-b from-amber-500/10 to-zinc-900 border border-amber-500/40 p-6 rounded-3xl backdrop-blur-md sticky top-28 text-center flex flex-col items-center">
          <div className="text-5xl mb-4 animate-bounce">☕</div>
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">مشروبك المبتكر</h3>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${base.name}-${milk.name}-${flavor.name}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="my-3"
            >
              <h4 className="text-xl font-bold text-amber-400">{base.name}</h4>
              <p className="text-xs text-zinc-300 mt-1">
                {milk.price > 0 ? `مع ${milk.name}` : 'سادة'} 
                {flavor.price > 0 ? ` + ${flavor.name}` : ''}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="w-full my-4 border-t border-zinc-800" />

          <div className="flex justify-between items-center w-full mb-6 px-2">
            <span className="text-zinc-400 text-sm">الإجمالي:</span>
            <span className="text-3xl font-black text-amber-500">{totalPrice} <span className="text-sm font-normal">ج.م</span></span>
          </div>

          <button 
            onClick={() => onOrderCustom(`${base.name} ${milk.name} ${flavor.name}`, totalPrice)}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 active:scale-95"
          >
            طلب المشروب المخصص 
          </button>
        </div>
      </div>
    </section>
  );
}