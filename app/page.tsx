'use client';

import Scene from '@/components/Scene';
import { motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import Lenis from 'lenis';
import LightCard from '@/components/LightCard';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';
import CoffeeBuilder from '@/components/CoffeeBuilder';
import Testimonials from '@/components/Testimonials';
import WhatsAppButton from '@/components/WhatsAppButton';
import LocationAndHours from '@/components/LocationAndHours';
import AnimatedCounters from '@/components/AnimatedCounters';
import ScrollToTop from '@/components/ScrollToTop';
import { supabase } from '@/lib/supabase';


export default function Home() {
  // States الحساب والبيانات
  const [selectedItem, setSelectedItem] = useState<{ title: string; price: string } | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // دالة تأكيد وإرسال الطلب
  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('يرجى كتابة الاسم ورقم الهاتف');
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('orders')
      .insert([
        { 
          customer_name: customerName, 
          phone: phone,
          address: address,
          items: selectedItem?.title, 
          total_price: selectedItem?.price,
          status: 'قيد التجهيز'
        }
      ]);

    setLoading(false);

    if (error) {
      alert('حدث خطأ أثناء إرسال الطلب: ' + error.message);
    } else {
      setIsSuccess(true);
    }
  };

  // دالة إغلاق المودال
  const closeModal = () => {
    setSelectedItem(null);
    setCustomerName('');
    setPhone('');
    setAddress('');
    setIsSuccess(false);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. تايمر الـ Preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // 2. تهيئة مكتبة Lenis للسكرول
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // تنظيف التايمر و Lenis عند الخروج
    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  const menuItems = [
    { title: 'إسبراسو سينجل', price: '45 ج.م', desc: 'نكهة مركزة وقوية من أجود حبات البني الإثيوبي.' },
    { title: 'كابوتشينو فانيلا', price: '65 ج.م', desc: 'مزيج رائع بين الإسبراسو والحليب المبخر مع لمسة فانيلا.' },
    { title: 'سبانيش لاتيه', price: '75 ج.م', desc: 'قهوة غنية ومُحلاة مع حليب مكثف ومذاق لا يُنسى.' },
    { title: 'آيس كراميل ماكياتو', price: '80 ج.م', desc: 'قهوة باردة منعشة مع صوص الكراميل اللذيذ.' },
  ];

  return (
    <main dir="rtl" className="relative min-h-screen text-white bg-[#0f0f0f] selection:bg-amber-500 selection:text-black">
       <AnimatePresence>
      {loading && <Preloader />}
    </AnimatePresence>
      <CustomCursor />
      
      {/* 1. خلفية الـ 3D */}
      <Scene />

      {/* 2. شريط التنقل (Navbar) مع حركة ظهور عند التحميل */}
     <motion.nav
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 backdrop-blur-md bg-black/20"
>
  <span className="text-2xl font-black tracking-widest text-amber-500">
    AURA COFFEE
  </span>
  <div className="hidden md:flex gap-8 text-[#d1d5db] font-medium">
    <a href="#hero" className="hover:text-amber-500 transition-colors">الرئيسية</a>
    <a href="#menu" className="hover:text-amber-500 transition-colors">المنيو</a>
    <a href="#features" className="hover:text-amber-500 transition-colors">المميزات</a>
  </div>
  <a
    href="#menu"
    className="px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 active:scale-95 text-center inline-block"
  >
    اطلب الآن
  </a>
</motion.nav>

      {/* 3. المحتوى الرئيسي */}
      <div id="scroll-container" className="relative z-10 pointer-events-auto">
        
        {/* === SECTION 1: HERO === */}
        <section id="hero" className="min-h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-between relative">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="-mt-10 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-semibold mb-4"
          >
            مذاق لا يُنسى ✨
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            قهوة صُنعت <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-amber-600">
              بكل حب.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 max-w-sm md:max-w-md ml-auto md:ml-30 text-right leading-relaxed mb-30"
            >     
            تجربة فريدة تبدأ من اختيار أجود حبات البني العالمية، وتمر بالتحميص المثالي لتصل إليك في كل فنجان.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4"
          >
            <a href="#menu" className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all shadow-lg shadow-amber-500/20">
              استكشف القائمة
            </a>
          </motion.div>
        </section>

        {/* === SECTION 2: MENU === */}
        <section id="menu" className="min-h-screen py-24 px-8 md:px-20 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4">قائمة المشروبات المميزة</h2>
            <p className="text-gray-400">اختر مشروبك المفضل المصنوع بتأني وشغف</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
            {menuItems.map((item, index) => (
              <LightCard
  key={index}
  icon="☕"
  title={item.title}
  desc={item.desc}
  price={item.price}
      onOrder={() => setSelectedItem({ title: item.title, price: item.price })}
/>
            ))}
          </div>
        </section>

        {/* === SECTION 3: FEATURES === */}
        <section id="features" className="min-h-screen py-24 px-8 md:px-20 flex flex-col justify-center items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black mb-12"
          >
            لماذا أورا كافيه؟
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            {[
              { icon: '🌱', title: 'حبوب بن عضوية', desc: 'مستوردة مباشرة من مزارع القهوة المستدامة.' },
              { icon: '🔥', title: 'تحميص يومي', desc: 'نضمن لك أعلى طزاجة ونكهة غنية في كل كوب.' },
              { icon: '☕', title: 'خبراء باريستا', desc: 'شغف وااحترافية في إعداد مشروبك بالمعايير العالمية.' },
            ].map((feature, i) => (
              <LightCard
                key={i}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                price=" "
                onOrder={() => {}}
              />
            ))}
          </div>
        </section>
         {/* 📊 قسم عداد الأرقام الإحصائي */}
      <AnimatedCounters />
        {/* === SECTION: COFFEE BUILDER === */}
<CoffeeBuilder 
onOrderCustom={(title:any, price:any) => setSelectedItem({ title, price })}
/>
 {/* 💬 قسم آراء العملاء */}
      <Testimonials />
       {/* 📍 قسم العنوان ومواعيد العمل */}
      <LocationAndHours />
        {/* 🟢 زرار الواتساب السريع */}
      <WhatsAppButton />
       {/* ⬆️ زرار العودة للأعلى */}
      <ScrollToTop />

        {/* === FOOTER === */}
        <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© 2026 AURA COFFEE. جميع الحقوق محفوظة.</p>
        </footer>
{/* Pop-up Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 max-w-md w-full relative text-right text-white shadow-2xl">
            <button 
              onClick={closeModal}
              className="absolute top-4 left-4 text-gray-400 hover:text-white text-xl font-bold transition"
            >
              ✕
            </button>

            {!isSuccess ? (
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div className="text-center mb-4">
                  <span className="text-3xl block mb-1">☕</span>
                  <h3 className="text-xl font-bold text-amber-500">طلب {selectedItem.title}</h3>
                  <p className="text-gray-400 text-sm">السعر: {selectedItem.price}</p>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-300">الاسم *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسمك"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-300">رقم الهاتف *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-300">العنوان / ملاحظات</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="العنوان أو ملاحظات الطلب"
                    rows={2}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500 text-right resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl transition disabled:opacity-50 mt-2"
                >
                  {loading ? 'جاري الإرسال...' : 'تأكيد الطلب 🚀'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">تم إرسال طلبك بنجاح!</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  شكراً لك يا <span className="text-amber-400 font-semibold">{customerName}</span>، طلبك لـ (<span className="text-amber-400">{selectedItem.title}</span>) قيد التجهيز الآن ☕✨
                </p>
                <button
                  onClick={closeModal}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-amber-500 font-bold py-2.5 rounded-xl border border-amber-500/30 transition mt-2"
                >
                  إغلاق
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </main>
  );
}