import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'netflix',
    name: 'Netflix Premium',
    category: 'streaming',
    icon: '🎬',
    variants: [
      { id: 'nf-sh-1m', name: 'Sharing 1 Bulan', duration: '1 Bulan', price: 15000, stock: 10, category: 'sharing' },
      { id: 'nf-sh-1y', name: 'Sharing 1 Tahun', duration: '1 Tahun', price: 175000, stock: 5, category: 'sharing' },
      { id: 'nf-pr-1m', name: 'Private 1 Bulan', duration: '1 Bulan', price: 15000, stock: 10, category: 'private' },
      { id: 'nf-pr-3m', name: 'Private 3 Bulan', duration: '3 Bulan', price: 30000, stock: 8, category: 'private' },
      { id: 'nf-pr-6m', name: 'Private 6 Bulan', duration: '6 Bulan', price: 55000, stock: 5, category: 'private' },
      { id: 'nf-pr-1y', name: 'Private 1 Tahun', duration: '1 Tahun', price: 85000, stock: 3, category: 'private' },
    ],
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    category: 'music',
    icon: '🎵',
    variants: [
      { id: 'sp-sh-1m', name: 'Sharing 1 Bulan', duration: '1 Bulan', price: 10000, stock: 15, category: 'sharing' },
      { id: 'sp-sh-3m', name: 'Sharing 3 Bulan', duration: '3 Bulan', price: 28000, stock: 10, category: 'sharing' },
      { id: 'sp-pr-1m', name: 'Private 1 Bulan', duration: '1 Bulan', price: 25000, stock: 8, category: 'private' },
      { id: 'sp-pr-3m', name: 'Private 3 Bulan', duration: '3 Bulan', price: 70000, stock: 5, category: 'private' },
    ],
  },
  {
    id: 'wetv',
    name: 'We TV VIP',
    category: 'streaming',
    icon: '📺',
    variants: [
      { id: 'wetv-sh-1m', name: 'Sharing 1 Bulan', duration: '1 Bulan', price: 18000, stock: 10, category: 'sharing' },
      { id: 'wetv-sh-3m', name: 'Sharing 3 Bulan', duration: '3 Bulan', price: 45000, stock: 5, category: 'sharing' },
    ],
  },
  {
    id: 'disney',
    name: 'Disney+ Hotstar',
    category: 'streaming',
    icon: '🏰',
    variants: [
      { id: 'disney-sh-1m', name: 'Sharing 1 Bulan', duration: '1 Bulan', price: 32000, stock: 8, category: 'sharing' },
    ],
  },
  {
    id: 'viu',
    name: 'Viu Premium',
    category: 'streaming',
    icon: '🎭',
    variants: [
      { id: 'viu-sh-1m-hp', name: 'Sharing 1 Bulan HP', duration: '1 Bulan', price: 13000, stock: 10, category: 'sharing' },
      { id: 'viu-sh-1m-tv', name: 'Sharing 1 Bulan TV', duration: '1 Bulan', price: 18000, stock: 10, category: 'sharing' },
      { id: 'viu-pr-1m-hp', name: 'Private 1 Bulan HP', duration: '1 Bulan', price: 28000, stock: 5, category: 'private' },
      { id: 'viu-pr-1m-tv', name: 'Private 1 Bulan TV', duration: '1 Bulan', price: 25000, stock: 5, category: 'private' },
    ],
  },
  {
    id: 'prime',
    name: 'Prime Video',
    category: 'streaming',
    icon: '🎥',
    variants: [
      { id: 'prime-sh-1m', name: 'Sharing 1 Bulan', duration: '1 Bulan', price: 20000, stock: 8, category: 'sharing' },
      { id: 'prime-pr-1m', name: 'Private 1 Bulan', duration: '1 Bulan', price: 35000, stock: 5, category: 'private' },
    ],
  },
  {
    id: 'iqiyi',
    name: 'iQiyi VIP',
    category: 'streaming',
    icon: '🐼',
    variants: [
      { id: 'iqiyi-sh-1m-hp', name: 'Sharing 1 Bulan HP', duration: '1 Bulan', price: 13000, stock: 10, category: 'sharing' },
      { id: 'iqiyi-sh-1m-tv', name: 'Sharing 1 Bulan TV', duration: '1 Bulan', price: 20000, stock: 10, category: 'sharing' },
      { id: 'iqiyi-pr-1m-hp', name: 'Private 1 Bulan HP', duration: '1 Bulan', price: 32000, stock: 5, category: 'private' },
      { id: 'iqiyi-pr-1m-tv', name: 'Private 1 Bulan TV', duration: '1 Bulan', price: 35000, stock: 5, category: 'private' },
    ],
  },
  {
    id: 'hbo',
    name: 'HBO GO Premium',
    category: 'streaming',
    icon: '🎬',
    variants: [
      { id: 'hbo-sh-1m-mobile', name: 'Sharing 1 Bulan Mobile', duration: '1 Bulan', price: 25000, stock: 8, category: 'sharing' },
      { id: 'hbo-sh-1m-tv', name: 'Sharing 1 Bulan TV', duration: '1 Bulan', price: 32000, stock: 8, category: 'sharing' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube Premium',
    category: 'streaming',
    icon: '▶️',
    variants: [
      { id: 'yt-cust-1m', name: 'Email Customer 1 Bulan', duration: '1 Bulan', price: 10000, stock: 15, category: 'sharing' },
      { id: 'yt-cust-3m', name: 'Email Customer 3 Bulan', duration: '3 Bulan', price: 45000, stock: 10, category: 'sharing' },
    ],
  },
  {
    id: 'iflix',
    name: 'Iflix Premium',
    category: 'streaming',
    icon: '📹',
    variants: [
      { id: 'iflix-sh-1y', name: 'Sharing 1 Tahun', duration: '1 Tahun', price: 30000, stock: 5, category: 'sharing' },
    ],
  },
  {
    id: 'bstation',
    name: 'Bstation',
    category: 'streaming',
    icon: '📱',
    variants: [
      { id: 'bstation-sh-1m', name: 'Sharing 1 Bulan', duration: '1 Bulan', price: 13000, stock: 10, category: 'sharing' },
    ],
  },
  {
    id: 'drakor',
    name: 'Drakor.ID',
    category: 'streaming',
    icon: '🇰🇷',
    variants: [
      { id: 'drakor-sh-1y', name: 'Sharing 1 Tahun', duration: '1 Tahun', price: 30000, stock: 5, category: 'sharing' },
    ],
  },
  {
    id: 'youku',
    name: 'Youku',
    category: 'streaming',
    icon: '🇨🇳',
    variants: [
      { id: 'youku-sh-1m', name: 'Sharing 1 Bulan', duration: '1 Bulan', price: 13000, stock: 10, category: 'sharing' },
      { id: 'youku-sh-1y', name: 'Sharing 1 Tahun', duration: '1 Tahun', price: 45000, stock: 5, category: 'sharing' },
    ],
  },
  {
    id: 'loklok',
    name: 'LOKLOK',
    category: 'streaming',
    icon: '🔒',
    variants: [
      { id: 'loklok-sh-1m-hp', name: 'Sharing 1 Bulan HP', duration: '1 Bulan', price: 25000, stock: 8, category: 'sharing' },
      { id: 'loklok-sh-1m-tv', name: 'Sharing 1 Bulan TV', duration: '1 Bulan', price: 32000, stock: 8, category: 'sharing' },
    ],
  },
  {
    id: 'visionplus',
    name: 'Vision+',
    category: 'streaming',
    icon: '👁️',
    variants: [
      { id: 'vision-sh-1m', name: 'Sharing 1 Bulan', duration: '1 Bulan', price: 20000, stock: 10, category: 'sharing' },
      { id: 'vision-pr-1m', name: 'Private 1 Bulan', duration: '1 Bulan', price: 35000, stock: 5, category: 'private' },
    ],
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    category: 'music',
    icon: '🍎',
    variants: [
      { id: 'apple-gift-1m', name: 'Gift Code 1 Bulan', duration: '1 Bulan', price: 18000, stock: 10, category: 'private' },
    ],
  },
];
