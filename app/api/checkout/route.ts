import { NextRequest, NextResponse } from 'next/server';
import { CartItem } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { customerName, customerPhone, items, total } = await request.json();

    if (!customerName || !customerPhone || !items?.length) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    // Simpan order ke database (nanti ganti dengan DB real)
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Stub payment URL - nanti ganti dengan Midtrans
    const paymentUrl = `https://payment-demo.premiumin-ajaa.com?order=${orderId}&amount=${total}`;

    // Log order (nanti ganti dengan Google Sheets/webhook)
    console.log('New Order:', {
      orderId,
      customerName,
      customerPhone,
      items: items.map((item: CartItem) => ({
        product: item.productName,
        variant: item.variantName,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      status: 'pending',
      timestamp: new Date().toISOString(),
    });

    // Response with payment URL
    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl,
      message: 'Order berhasil dibuat. Silakan lanjutkan pembayaran.',
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
