# Premiumin Ajaaa - E-Commerce Website (Gratis 100%)

Website jualan akun premium streaming & music dengan sistem manual transfer dan verifikasi admin.

## Fitur
- ✅ Katalog produk lengkap (15+ platform)
- ✅ Shopping cart
- ✅ Checkout manual transfer
- ✅ Admin Dashboard untuk verifikasi pembayaran
- ✅ Stock management via Google Sheets
- ✅ Order tracking manual

## Setup

### 1. Google Sheets untuk Stock
1. Buat Google Sheet baru dengan nama "Stock Akun Premium"
2. Buat kolom: Platform | Variant | Akun | Password | Status | OrderID | TanggalTerjual
3. Aktifkan Google Sheets API di Google Cloud Console
4. Buat Service Account & download credentials
5. Share spreadsheet ke email service account
6. Masukkan credentials ke `.env.local`

### 2. Install & Run
```bash
npm install
npm run dev
```

Buka `http://localhost:3000` (website customer)
Buka `http://localhost:3000/admin` (admin dashboard)

### 3. Deploy ke Vercel
1. Push code ke GitHub
2. Import ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy!

## Struktur Database (Google Sheets)

| Platform | Variant | Akun | Password | Status | OrderID | TanggalTerjual |
|----------|---------|-------|----------|--------|---------|----------------|
| netflix | nf-sh-1m | user@email.com | pass123 | available | | |
| netflix | nf-sh-1m | user2@email.com | pass456 | sold | ORD-123 | 2026-10-29 |

## Flow
1. Customer buka web → pilih produk → tambah ke cart
2. Checkout → isi nama & WA → buat pesanan
3. Customer transfer manual → kirim bukti + ID ke WA admin
4. Admin buka `/admin` → verifikasi bukti → konfirmasi pembayaran
5. Admin ambil akun dari Google Sheets secara manual → kirim via WA
6. Admin update status pesanan di dashboard & Sheets

## Tech Stack
- Next.js 16 (React 19)
- Tailwind CSS
- Google Sheets (database)
- Vercel (hosting)
- Local JSON file (simpan order sementara)

## Kontak
Admin WhatsApp: [nomor WhatsApp admin Anda]

## 🔐 Security Notes

1. **Jangan share** `.env.local` atau credentials
2. **Service Account** hanya punya akses ke 1 spreadsheet
3. **Private key** harus di-escape dengan `\n` untuk newline

## 💰 Estimasi Biaya Bulanan

| Service | Biaya |
|---------|-------|
| Vercel | Gratis |
| Google Sheets | Gratis |
| Domain .my.id | Gratis |
| **Total** | **Rp 0 / bulan** |

## 🆘 Troubleshooting

### "Google Sheets error"
- Cek service account email sudah di-share ke spreadsheet
- Cek private key format (harus ada `\n` untuk newline)
- Cek spreadsheet ID benar

### "Admin dashboard tidak muncul"
- Pastikan sudah build & run `npm run dev`
- Akses `http://localhost:3000/admin`

## 📞 Support

Jika ada kendala setup, hubungi developer atau cek dokumentasi resmi:
- Google Sheets API: https://developers.google.com/sheets/api
- Vercel: https://vercel.com/docs
