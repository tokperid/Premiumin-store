'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    productName: string;
    variantName: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: string;
  paymentProof?: string;
  accountData?: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [accountInput, setAccountInput] = useState('');

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const saveAccountData = async (orderId: string, accountData: string) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, accountData }),
    });
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, accountData } : o));
    setAccountInput('');
    setExpandedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📋 Admin Dashboard - Premiumin Ajaaa</h1>
        
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400">Belum ada pesanan.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">ID Pesanan</p>
                    <p className="font-mono font-bold text-blue-400">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">Waktu</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleString('id-ID')}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    order.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'delivered' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-400">Customer</p>
                    <p className="font-semibold">{order.customerName}</p>
                    <a href={`https://wa.me/${order.customerPhone.replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                      {order.customerPhone}
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Total</p>
                    <p className="text-xl font-bold">Rp {order.total.toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">Items</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1">
                      <span>{item.productName} - {item.variantName} (x{item.quantity})</span>
                      <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>

                {order.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => updateStatus(order.id, 'confirmed')} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition-colors">
                      ✅ Konfirmasi Pembayaran
                    </button>
                    <button onClick={() => updateStatus(order.id, 'rejected')} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                      ❌
                    </button>
                  </div>
                )}
                {order.status === 'confirmed' && (
                  <div className="mt-4 space-y-3">
                    {order.accountData ? (
                      <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                        <p className="text-xs text-gray-400 mb-2">✅ Akun Sudah Diinput</p>
                        <p className="text-sm text-white whitespace-pre-wrap bg-gray-900/50 p-2 rounded font-mono">{order.accountData}</p>
                        <button onClick={() => updateStatus(order.id, 'delivered')} className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold transition-colors">
                          🚀 Kirim Akun & Tandai Selesai
                        </button>
                      </div>
                    ) : expandedOrder === order.id ? (
                      <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg space-y-3">
                        <p className="text-sm text-white font-bold">📝 Input Akun (Email + Password)</p>
                        <textarea
                          value={accountInput}
                          onChange={e => setAccountInput(e.target.value)}
                          placeholder="Email: user@gmail.com&#10;Password: Anda123&#10;PIN: 1234&#10;(atau format apapun)"
                          className="w-full px-3 py-2 bg-gray-900 border border-purple-500/50 rounded text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-purple-400"
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => saveAccountData(order.id, accountInput)}
                            disabled={!accountInput.trim()}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
                          >
                            ✅ Simpan Akun
                          </button>
                          <button 
                            onClick={() => setExpandedOrder(null)}
                            className="px-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-bold"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
                        <p className="text-sm text-yellow-200 mb-3">⏳ Pembayaran dikonfirmasi. Silakan input akun yang sudah dibeli.</p>
                        <button 
                          onClick={() => setExpandedOrder(order.id)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-bold transition-colors"
                        >
                          + Input Akun
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}