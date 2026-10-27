'use client';

import { useState } from 'react';
import { products } from './data/products';
import { CartItem, ProductVariant } from '@/types';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (productId: string, productName: string, variant: ProductVariant) => {
    setCart(prev => {
      const existing = prev.find(item => item.variantId === variant.id);
      if (existing) {
        return prev.map(item =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        productId,
        variantId: variant.id,
        productName,
        variantName: variant.name,
        price: variant.price,
        quantity: 1,
      }];
    });
  };

  const removeFromCart = (variantId: string) => {
    setCart(prev => prev.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(variantId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
              🎬
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Premiumin Ajaaa</h1>
              <p className="text-xs text-gray-300">Akun Premium Terpercaya</p>
            </div>
          </div>
          <Cart 
            items={cart}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={() => setShowCheckout(true)}
          />
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Akun Premium Streaming & Music
        </h2>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          Nikmati layanan premium dengan harga terjangkau. Full garansi & pengiriman otomatis via WhatsApp.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-200">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span>✅</span> Full Garansi
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span>⚡</span> Pengiriman Otomatis
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span>💳</span> Pembayaran Aman
          </div>
        </div>
      </section>

      {/* Products - Streaming */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🎬</span> Streaming Premium
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            .filter(p => p.category === 'streaming')
            .map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
        </div>
      </section>

      {/* Products - Music */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🎵</span> Music Premium
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            .filter(p => p.category === 'music')
            .map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
        </div>
      </section>

      {/* Terms */}
      <section className="container mx-auto px-4 py-12 mt-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">📒 Syarat & Ketentuan</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>✅ Semua produk yang kami jual <strong>full GARANSI</strong> langsung hubungi admin jika bermasalah</li>
            <li>✅ 1 Bulan = 27-30 hari</li>
            <li>✅ Mohon untuk tidak spam wa admin</li>
            <li>✅ Kami tidak menerima refund kecuali produk habis</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-300 text-sm">
          <p>© 2026 Premiumin Ajaaa. Akun Premium Terpercaya.</p>
          <p className="mt-2">Hubungi admin untuk bantuan & pertanyaan</p>
        </div>
      </footer>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          totalPrice={totalPrice}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setCart([]);
            setShowCheckout(false);
          }}
        />
      )}
    </div>
  );
}
