'use client';

import { useState } from 'react';
import { products } from './data/products';
import { CartItem, ProductVariant } from '@/types';
import ProductCard from './components/ProductCard';

const WHATSAPP_NUMBER = '6285174478377';

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // WhatsApp checkout
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    const cartDetails = cart
      .map(item => `• ${item.productName} - ${item.variantName}\n   Qty: ${item.quantity}x Rp${item.price.toLocaleString('id-ID')}\n   Subtotal: Rp${(item.price * item.quantity).toLocaleString('id-ID')}`)
      .join('\n\n');

    const message = `*Assalamualaikum Admin* 👋\n\nSaya ingin membeli produk berikut:\n\n${cartDetails}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n*💰 TOTAL: Rp${totalPrice.toLocaleString('id-ID')}*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nMohon konfirmasi dan instruksi pembayaran. Terima kasih!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const streamingProducts = products.filter(p => p.category === 'streaming');
  const musicProducts = products.filter(p => p.category === 'music');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center font-bold text-lg">
                PA
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">Premiumin Ajaaa</h1>
                <p className="text-xs text-slate-400">Premium Store</p>
              </div>
            </div>

            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-bold hidden sm:inline">{totalItems}</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 z-50">
                  {cart.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-4xl mb-2">🛒</div>
                      <p className="text-slate-400">Keranjang Anda kosong</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 space-y-3 max-h-72 overflow-y-auto border-b border-slate-700/50">
                        {cart.map(item => (
                          <div key={item.variantId} className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-semibold text-sm line-clamp-1">{item.productName}</p>
                              <p className="text-slate-400 text-xs line-clamp-1">{item.variantName}</p>
                              <p className="text-cyan-400 font-bold text-sm mt-1">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                className="bg-slate-600 hover:bg-slate-500 text-white w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-colors"
                              >
                                −
                              </button>
                              <span className="text-white w-6 text-center text-sm font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                className="bg-slate-600 hover:bg-slate-500 text-white w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-colors"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(item.variantId)}
                                className="ml-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cart Summary */}
                      <div className="p-4 space-y-3 border-b border-slate-700/50">
                        <div className="flex justify-between items-center text-white">
                          <span className="font-semibold">Total Harga:</span>
                          <span className="text-xl font-bold text-cyan-400">Rp{totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <div className="p-4">
                        <button
                          onClick={handleCheckoutWhatsApp}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.732 5.41 2.124 7.778l-2.256 8.23c-.145.527.054 1.083.602 1.269.548.186 1.149-.083 1.334-.612l2.281-8.315a9.87 9.87 0 007.665-9.35c0-.51-.023-1.02-.067-1.528zm0-2.382c5.514 0 9.996 4.482 9.996 9.996s-4.482 9.996-9.996 9.996S2.478 20.514 2.478 15.006 6.96 5.01 12.474 5.01z" />
                          </svg>
                          Checkout via WhatsApp
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 sm:py-20 border-b border-slate-700/50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            🎬 Akun Premium Streaming & Music
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Nikmati ribuan film, series, dan lagu premium. Harga terjangkau, akun terjamin, dan pengiriman instant!
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <div className="bg-slate-800/50 hover:bg-slate-800 border border-cyan-500/30 px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors">✅ Full Garansi</div>
            <div className="bg-slate-800/50 hover:bg-slate-800 border border-cyan-500/30 px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors">⚡ Instant Delivery</div>
            <div className="bg-slate-800/50 hover:bg-slate-800 border border-cyan-500/30 px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors">🔒 Aman & Terpercaya</div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Streaming Products */}
        {streamingProducts.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">🎥 Streaming Services</h2>
              <span className="text-sm bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-3 py-1 rounded-full font-semibold">{streamingProducts.length} Produk</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {streamingProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* Music Products */}
        {musicProducts.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">🎵 Music Services</h2>
              <span className="text-sm bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-3 py-1 rounded-full font-semibold">{musicProducts.length} Produk</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {musicProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* S&K Section */}
      <section className="bg-slate-900/50 border-t border-slate-700/50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <span>📒</span> Syarat & Ketentuan
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm sm:text-base">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold flex-shrink-0">✓</span>
                <span>Semua produk yang kami jual <strong>full GARANSI</strong> — hubungi admin jika bermasalah</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold flex-shrink-0">✓</span>
                <span>1 Bulan = 27-30 hari kalender</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold flex-shrink-0">✓</span>
                <span>Mohon untuk tidak spam WhatsApp admin</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold flex-shrink-0">✓</span>
                <span>Kami tidak menerima refund, kecuali produk habis/tidak tersedia</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700/50 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 text-slate-400 text-sm sm:text-base">
            <p className="font-semibold text-white">© 2026 Premiumin Ajaaa</p>
            <p>Premium Accounts Store — Terpercaya & Bergaransi</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-cyan-400 font-semibold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.55 1.694 2.334 3.374 3.866 4.905 1.531 1.531 3.21 3.316 4.905 3.866l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              085174478377
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
