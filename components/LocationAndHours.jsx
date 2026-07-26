'use client';

export default function LocationAndHours() {
  return (
    <section id="location" className="py-20 px-4 max-w-5xl mx-auto text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-amber-500 mb-3">
          📍 زُرنا في فرعنا
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          بانتظاركم دائماً لتقديم أروع فنجان قهوة في أجواء هادئة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* 🕒 كارت مواعيد العمل والمعلومات */}
        <div className="bg-zinc-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-amber-500/20 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
              ⏰ مواعيد العمل
            </h3>

            <div className="space-y-4 text-sm md:text-base">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <span className="text-zinc-300">من السبت إلى الخميس:</span>
                <span className="font-bold text-amber-500">8:00 ص - 12:00 منتصف الليل</span>
              </div>

              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <span className="text-zinc-300">يوم الجمعة:</span>
                <span className="font-bold text-amber-500">1:00 ظهراً - 1:00 صباحاً</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-3 text-sm">
            <p className="flex items-center gap-2 text-zinc-300">
              📌 <span className="font-bold text-white">العنوان:</span> القاهرة، المعادي، شارع 9
            </p>
            <p className="flex items-center gap-2 text-zinc-300">
              📞 <span className="font-bold text-white">الهاتف:</span> 01000000000
            </p>
          </div>
        </div>

        {/* 🗺️ الخريطة التفاعلية (Google Maps Embed) */}
        <div className="bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-amber-500/20 overflow-hidden min-h-[300px] h-full shadow-lg">
          <iframe
            title="Aura Coffee Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.123456789!2d31.25!3d29.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjk_NTcnMzYuMCJOIDMxwrAxNScwMC4wIkU!5e0!3m2!1sar!2seg!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) invert(0.9)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[300px] rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}