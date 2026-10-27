import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    productId: string;
    variantId: string;
    productName: string;
    variantName: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'rejected';
  paymentProof?: string;
  accountData?: string;
  createdAt: string;
}

const DB_PATH = join(process.cwd(), 'db.json');

function getOrders(): Order[] {
  if (!existsSync(DB_PATH)) return [];
  return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
}

function saveOrders(orders: Order[]) {
  writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));
}

// GET - Ambil semua pesanan (untuk admin)
export async function GET(request: NextRequest) {
  const orders = getOrders();
  return NextResponse.json({ orders: orders.reverse() });
}

// POST - Buat pesanan baru (dari customer)
export async function POST(request: NextRequest) {
  try {
    const { customerName, customerPhone, items, total } = await request.json();

    if (!customerName || !customerPhone || !items?.length) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const orders = getOrders();
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newOrder: Order = {
      id: orderId,
      customerName,
      customerPhone,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);
    saveOrders(orders);

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Pesanan dibuat. Silakan upload bukti pembayaran.',
    });
  } catch (error) {
    console.error('Order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update status pesanan (untuk admin)
export async function PUT(request: NextRequest) {
  try {
    const { orderId, status, accountData } = await request.json();
    
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    if (status) orders[orderIndex].status = status;
    if (accountData) orders[orderIndex].accountData = accountData;
    
    saveOrders(orders);

    return NextResponse.json({ success: true, order: orders[orderIndex] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}