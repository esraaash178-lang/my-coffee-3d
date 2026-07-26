'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LightCard from './LightCard';

export default function Testimonials() {
  // قائمة التقييمات (مع إمكانية إضافة تقييمات جديدة ليها)
  const [reviews, setReviews] = useState([
    {
      title: 'سارة أحمد ⭐⭐⭐⭐⭐',
      desc: '"القهوة هنا تجربة مختلفة تماماً، النكهة غنية والتحميص اليومي فارق جداً في الطعم."',
    },
    {
      title: 'عمر الخولي ⭐⭐⭐⭐⭐',
      desc: '"أفضل سبانيش لاتيه جربته! الديزاين والجو العام للمكان ينقلك لعالم تاني."',
    },
    {
      title: 'مينا يوسف ⭐⭐⭐⭐⭐',
      desc: '"فكرة اصنع قهوتك بنفسك عبقرية، وجودة حبوب البن العضوية باينة في كل بوق."',
    },
  ]);

  // حالة النموذج (Form State)
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // دالة إضافة التقييم الجديد
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const stars = '⭐'.repeat(Number(rating));
    const newReview = {
      title: `${name} ${stars}`,
      desc: `"${comment}"`,
    };

    // إضافة التقييم الجديد لأول القائمة
    setReviews([newReview, ...reviews]);

    // إعادة ضبط النموذج
    setName('');
    setComment('');
    setSubmitted(true);

    // إخفاء رسالة النجاح بعد 3 ثواني
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-amber-500 mb-3">
          💬 ماذا يقول عشاق أورا؟
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          تجارب حقيقية من عملائنا، وشاركونا رأيكم بلمسة منكم!
        </p>
      </div>

      {/* 🌟 عرض الكروت بالحركة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {reviews.slice(0, 6).map((review, i) => (
          <LightCard
            key={i}
            title={review.title}
            desc={review.desc}
          />
        ))}
      </div>

      {/* ✍️ نموذج كتابة رأي جديد */}
      <div className="bg-zinc-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-amber-500/20 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-amber-400 mb-4 text-center">
          شاركنا تجربتك ورأيك ☕
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* حقل الاسم */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1">اسمك:</label>
              <input
                type="text"
                required
                placeholder="مثال: إسراء..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
              />
            </div>

            {/* حقل التقييم بالنجوم */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1">التقييم:</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-amber-400 focus:outline-none focus:border-amber-500 transition-colors text-sm cursor-pointer"
              >
                <option value="5">⭐⭐⭐⭐⭐ (ممتاز جداً)</option>
                <option value="4">⭐⭐⭐⭐ (جيد جداً)</option>
                <option value="3">⭐⭐⭐ (جيد)</option>
              </select>
            </div>
          </div>

          {/* حقل الرأي */}
          <div>
            <label className="block text-xs text-zinc-400 mb-1">رأيك في القهوة والمكان:</label>
            <textarea
              required
              rows={3}
              placeholder="اكتب انطباعك ورأيك هنا..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
            />
          </div>

          {/* زرار الإرسال */}
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 active:scale-95"
          >
            إضافة الرأي فوراً 
          </button>

          {/* رسالة تأكيد النجاح */}
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs text-emerald-400 mt-2 font-bold"
            >
              ✨ تم إضافة رأيك بنجاح وظهر ضمن الكروت فوق!
            </motion.p>
          )}
        </form>
      </div>
    </section>
  );
}