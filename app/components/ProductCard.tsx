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

  const handleAddToCart = (variant: ProductVariant) => {
    onAddToCart(product.id, product.name, variant);
    setSelectedVariant(variant);
    setTimeout(() => setSelectedVariant(null), 1000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">{product.icon}</div>
          <div>
            <h4 className="font-bold text-white text-lg">{product.name}</h4>
            <p className="text-xs text-gray-300">{product.variants.length} paket tersedia</p>
          </div>
        </div>

        {!showVariants ? (
          <button
            onClick={() => setShowVariants(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Lihat Paket
          </button>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {product.variants.map(variant => (
              <div
                key={variant.id}
                className="bg-black/20 rounded-lg p-3 border border-white/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-white font-medium text-sm">{variant.name}</p>
                    <p className="text-xs text-gray-400">{variant.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">
                      Rp {variant.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Stok: {variant.stock}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(variant)}
                  disabled={variant.stock === 0 || selectedVariant?.id === variant.id}
                  className={`w-full py-2 rounded-md text-sm font-semibold transition-all ${
                    variant.stock === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : selectedVariant?.id === variant.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {variant.stock === 0
                    ? 'Habis'
                    : selectedVariant?.id === variant.id
                    ? '✓ Ditambahkan'
                    : '+ Keranjang'}
                </button>
              </div>
            ))}
            <button
              onClick={() => setShowVariants(false)}
              className="w-full text-gray-300 text-sm py-2 hover:text-white"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
