'use client';

import { useState } from 'react';
import { CartItem } from '@/types';

interface CheckoutModalProps {
  cart: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ cart, totalPrice, onClose, onSuccess }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successOrderId, setSuccessOrderId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim() || !phone.trim()) {
      setError('Nama dan nomor WhatsApp wajib diisi');
      return;
    }

    if (!/^(\+62|62|0)[0-9]{9,12}$/.test(phone.replace(/\s/g, ''))) {
      setError('Nomor WhatsApp tidak valid');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          items: cart,
          total: totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Checkout gagal');

      setSuccessOrderId(data.orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-white/20 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <h2 className="text-2xl font-bold text-white">{successOrderId ? '✅ Pesanan Diterima' : 'Checkout'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {successOrderId ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
            <h3 className="text-xl font-bold text-white mb-2">Terima kasih!</h3>
            <p className="text-gray-300 mb-4">Pesananmu berhasil dibuat.</p>
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
              <p className="text-xs text-gray-400 mb-1">ID Pesanan</p>
              <p className="text-xl font-mono font-bold text-blue-400 mb-4">{successOrderId}</p>
              <p className="text-xs text-gray-400 mb-1">Total yang harus dibayar</p>
              <p className="text-2xl font-bold text-white">Rp {totalPrice.toLocaleString('id-ID')}</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-left mb-6">
              <p className="font-bold text-yellow-400 text-sm mb-2">Langkah Selanjutnya:</p>
              <ol className="text-xs text-yellow-200/80 space-y-2 list-decimal list-inside">
                <li>Transfer total pembayaran ke rekening admin.</li>
                <li>Simpan bukti transfer (screenshot).</li>
                <li>Kirim bukti transfer + ID Pesanan ke WhatsApp admin.</li>
                <li>Admin akan memproses dan mengirim akun dalam 1-5 menit.</li>
              </ol>
            </div>

            <a 
              href={`https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20sudah%20bayar%20untuk%20pesanan%20${successOrderId}.%20Berikut%20bukti%20transfernya:`}
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-lg transition-colors"
            >
              Kirim Bukti ke WhatsApp Admin
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Nama Lengkap</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Masukkan nama" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" disabled={loading} />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Nomor WhatsApp</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="08xxxxxxxxxx" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" disabled={loading} />
            </div>
            {error && <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">{error}</div>}
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Total Pembayaran</span>
                <span className="text-2xl font-bold text-white">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-bold transition-all ${loading ? 'bg-gray-600 text-gray-400' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'}`}>
              {loading ? 'Memproses...' : 'Buat Pesanan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
