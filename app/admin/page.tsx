'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Order {
  id: string;
  customer_name: string;
  items: string;
  total_price: string;
  status: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deleteOrderId, setDeleteOrderId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);
  const confirmDelete = async () => {
    if (!deleteOrderId) return;

    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', deleteOrderId);

    if (error) {
      alert('حدث خطأ أثناء الحذف: ' + error.message);
    } else {
      setOrders(orders.filter((order: any) => order.id !== deleteOrderId));
    }

    // إغلاق الكارت بعد الحذف
    setDeleteOrderId(null);
  };

  // 🔄 جلب الطلبات من Supabase
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✏️ تغيير حالة الطلب وتحديثها في الداتابيز
  const toggleOrderStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'مكتمل' ? 'قيد التجهيز' : 'مكتمل';

    // تحديث في الواجهة أولاً لسرعة الاستجابة
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));

    // تحديث في Supabase
    await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 dir-rtl font-sans cursor-auto [&_*]:cursor-auto" dir="rtl">
      {/* 🎯 إجبار ظهور الماوس الأصلي في صفحة الأدمن */}
      <style jsx global>{`
        * {
          cursor: auto !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-500">لوحة تحكم الكافيه ☕</h1>
            <p className="text-zinc-400 text-sm mt-1">إدارة الطلبات المباشرة من قاعدة البيانات</p>
          </div>
          <button 
            onClick={fetchOrders}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            🔄 تحديث البيانات
          </button>
        </header>

        {/* جدول الطلبات */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-zinc-800 font-bold text-lg text-amber-400">
            الطلبات الحالية ({orders.length})
          </div>

          {loading ? (
            <div className="p-8 text-center text-zinc-500">جاري تحميل الطلبات من الداتابيز...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">لا توجد طلبات في قاعدة البيانات حالياً. جربي إضافة طلب!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-zinc-950 text-zinc-400 uppercase border-b border-zinc-800">
                  <tr>
                    <th className="p-4">اسم العميل</th>
                    <th className="p-4">الطلب</th>
                    <th className="p-4">الإجمالي</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-800/50 transition">
                        <td className="p-4 font-medium text-white">
                  <div>{order.customer_name}</div>
                  {order.phone && (
                    <div className="text-xs text-amber-400/90 font-mono mt-0.5">
                      📞 {order.phone}
                    </div>
                  )}
                  {order.address && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      📍 {order.address}
                    </div>
                  )}
                </td>
                      <td className="p-4 text-zinc-300">{order.items}</td>
                      <td className="p-4 font-semibold text-amber-400">{order.total_price}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'مكتمل' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                     <td className="p-4 flex items-center gap-2">
  {/* زرار تغيير الحالة */}
  <button
    onClick={() => toggleOrderStatus(order.id, order.status)}
    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-700 transition"
  >
    {order.status === 'مكتمل' ? 'تغيير إلى قيد التجهيز' : 'تغيير إلى مكتمل'}
  </button>

  {/* زرار الحذف */}
  <button
    onClick={() => setDeleteOrderId(order.id)}
    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs py-1.5 px-3 rounded-lg border border-red-500/30 transition"
  >
    حذف 🗑️
  </button>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* مودال تأكيد الحذف */}
{deleteOrderId && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-xl">
        ⚠️
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1">تأكيد حذف الطلب</h3>
        <p className="text-sm text-zinc-400">
          هل أنتِ متأكدة من حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.
        </p>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={confirmDelete}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-xl transition text-sm"
        >
          نعم، احذف
        </button>
        <button
          onClick={() => setDeleteOrderId(null)}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-2 rounded-xl transition text-sm"
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}