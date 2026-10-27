'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, productName: string, variant: ProductVariant) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [showVariants, setShowVariants] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (variant: ProductVariant) => {
    onAddToCart(product.id, product.name, variant);
    setAddedItem(variant.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const lowestPrice = Math.min(...product.variants.map(v => v.price));

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group">
      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-700/50">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="text-3xl sm:text-4xl">{product.icon}</div>
          <span className="text-xs bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
            {product.variants.length} paket
          </span>
        </div>
        <h3 className="text-white font-bold text-base sm:text-lg line-clamp-2">{product.name}</h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Mulai dari <span className="text-cyan-400 font-bold">Rp{lowestPrice.toLocaleString('id-ID')}</span>
        </p>
      </div>

      {/* Variants List */}
      {showVariants ? (
        <div className="p-4 sm:p-5 space-y-2 max-h-96 overflow-y-auto">
          {product.variants.map(variant => (
            <div
              key={variant.id}
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 sm:p-4 hover:border-slate-600/80 transition-colors"
            >
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm sm:text-base">{variant.name}</p>
                  <p className="text-slate-400 text-xs sm:text-sm">{variant.duration}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-cyan-400 font-bold text-sm sm:text-base">
                    Rp{variant.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(variant)}
                disabled={variant.stock === 0 || addedItem === variant.id}
                className={`w-full py-2 px-3 rounded-lg text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                  variant.stock === 0
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : addedItem === variant.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30'
                }`}
              >
                {variant.stock === 0 && (
                  <>
                    <span>❌</span> Habis
                  </>
                )}
                {variant.stock > 0 && addedItem === variant.id && (
                  <>
                    <span>✓</span> Ditambahkan
                  </>
                )}
                {variant.stock > 0 && addedItem !== variant.id && (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah ke Keranjang
                  </>
                )}
              </button>
            </div>
          ))}

          {/* Close Button */}
          <button
            onClick={() => setShowVariants(false)}
            className="w-full text-slate-400 hover:text-slate-300 py-2 text-sm font-medium transition-colors mt-2"
          >
            ← Tutup
          </button>
        </div>
      ) : (
        /* Default View */
        <div className="p-4 sm:p-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {product.variants.slice(0, 2).map(variant => (
              <div key={variant.id} className="bg-slate-800/50 rounded-lg p-2 sm:p-3 border border-slate-700/50">
                <p className="text-slate-300 text-xs sm:text-sm font-medium truncate">{variant.name}</p>
                <p className="text-cyan-400 font-bold text-xs sm:text-sm">Rp{(variant.price / 1000).toFixed(0)}k</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowVariants(true)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/40 flex items-center justify-center gap-2 group"
          >
            <span>🎁</span>
            Lihat Semua Paket
          </button>
        </div>
      )}
    </div>
  );
}
