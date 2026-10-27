'use client';

import { useState } from 'react';
import { CartItem } from '@/types';

interface CartProps {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, totalItems, totalPrice, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowCart(!showCart)}
        className="relative bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="text-white font-semibold">{totalItems}</span>
        </div>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {showCart && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-gray-900 rounded-xl shadow-2xl border border-white/20 z-50 max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-white/10">
              <h3 className="font-bold text-white text-lg">Keranjang Belanja</h3>
            </div>

            {items.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <p className="text-4xl mb-2">🛒</p>
                <p>Keranjang kosong</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {items.map(item => (
                    <div
                      key={item.variantId}
                      className="bg-white/5 rounded-lg p-3 border border-white/10"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-400">{item.variantName}</p>
                        </div>
                        <button
                          onClick={() => onRemove(item.variantId)}
                          className="text-red-400 hover:text-red-300 text-xl leading-none"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-white/10 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                            className="px-3 py-1 text-white hover:bg-white/10 rounded-l-lg"
                          >
                            −
                          </button>
                          <span className="text-white font-semibold px-2">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                            className="px-3 py-1 text-white hover:bg-white/10 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-white font-bold">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10 bg-black/20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300">Total</span>
                    <span className="text-2xl font-bold text-white">
                      Rp {totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      onCheckout();
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
