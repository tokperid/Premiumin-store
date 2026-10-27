# Setup Guide - Premiumin Ajaaa

## 🎯 Prototype Status
✅ Frontend lengkap (katalog, cart, checkout)
✅ API routes ready
✅ Design responsive & modern
⏳ Integration payment & WhatsApp (perlu API keys)

## 📋 Setup Steps

### 1. Midtrans (Payment Gateway)
**Waktu: 10 menit | Biaya: Gratis untuk testing**

1. Buka https://midtrans.com → Daftar
2. Pilih "Development" environment (gratis)
3. Lengkapi profil bisnis
4. Dapatkan credentials:
   - Dashboard → Settings → Access Keys
   - Copy **Server Key** & **Client Key**
5. Masukkan ke `.env.local`:
   ```
   MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
   MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
   MIDTRANS_IS_PRODUCTION=false
   ```

**Catatan**: 
- Mode development = testing, uang tidak benar-benar terpotong
- Nanti upgrade ke production setelah siap live

### 2. Fonnte (WhatsApp Auto-Send)
**Waktu: 5 menit | Biaya: ~50k-100k/bulan**

1. Buka https://fonnte.com → Register
2. Hubungkan WhatsApp Business:
   - Dashboard → Add Device
   - Scan QR dengan WhatsApp Business
3. Dapatkan API Token:
   - Dashboard → API Token
   - Copy token
4. Masukkan ke `.env.local`:
   ```
   FONNTE_API_TOKEN=xxx
   ```

**Alternatif gratis** (lebih ribet):
- WhatsApp Cloud API (Meta) - gratis tapi perlu verifikasi bisnis
- Baileys library - gratis tapi perlu server sendiri

### 3. Google Sheets (Stock Management)
**Waktu: 15 menit | Biaya: Gratis**

#### A. Buat Spreadsheet
1. Buka https://sheets.google.com → Buat spreadsheet baru
2. Nama: "Stock Akun Premium"
3. Buat kolom di row 1:
   ```
   Platform | Variant | Email | Password | Status | OrderID | TanggalTerjual
   ```
4. Input data akun (contoh):
   ```
   netflix | nf-sh-1m | user@email.com | pass123 | available | |
   spotify | sp-sh-1m | spotify@email.com | pass456 | available | |
   ```

#### B. Setup API Access
1. Buka https://console.cloud.google.com
2. Buat project baru: "Premiumin Ajaaa"
3. Enable Google Sheets API:
   - APIs & Services → Enable APIs → Search "Google Sheets API" → Enable
4. Buat Service Account:
   - APIs & Services → Credentials → Create Credentials → Service Account
   - Name: "premiumin-service"
   - Role: Editor
5. Download credentials:
   - Klik service account → Keys → Add Key → Create New Key → JSON
   - File akan terdownload otomatis
6. Dapatkan credentials:
   - Buka file JSON
   - Copy `client_email` dan `private_key`
7. Share spreadsheet:
   - Kembali ke Google Sheets
   - Klik "Share" → Add `client_email` dari JSON
   - Permission: Editor

8. Dapatkan Spreadsheet ID:
   - URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy SPREADSHEET_ID

9. Masukkan ke `.env.local`:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@xxx.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SPREADSHEET_ID=xxx
   ```

### 4. Environment Variables
1. Copy `.env.example` ke `.env.local`
2. Isi semua credentials yang sudah didapat
3. **JANGAN** commit `.env.local` ke Git!

### 5. Deploy ke Vercel
**Waktu: 5 menit | Biaya: Gratis**

1. Push code ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/premiumin-ajaaa.git
   git push -u origin main
   ```

2. Import ke Vercel:
   - Buka https://vercel.com → Login dengan GitHub
   - Click "Add New Project"
   - Import repository
   - Framework: Next.js (auto-detect)

3. Set Environment Variables:
   - Settings → Environment Variables
   - Tambahkan semua dari `.env.local`
   - Ganti `NEXT_PUBLIC_APP_URL` dengan domain Vercel

4. Deploy!
   - Click "Deploy"
   - Tunggu 2-3 menit
   - Website live di `xxx.vercel.app`

### 6. Domain Gratis (Optional)
**Cloudflare** atau **Niagahoster**:
1. Daftar domain `.my.id` (gratis)
2. Point ke Vercel nameserver
3. SSL otomatis dari Vercel

## 🔄 Flow Sistem

```
1. Customer buka web
   ↓
2. Pilih produk → Tambah ke cart
   ↓
3. Checkout → Isi nama & WA
   ↓
4. Generate order → Midtrans payment link
   ↓
5. Customer bayar (Gopay/QRIS/Transfer/dll)
   ↓
6. Midtrans webhook → Verify payment
   ↓
7. Query Google Sheets → Ambil akun available
   ↓
8. Update Sheets → Mark as sold
   ↓
9. Fonnte API → Kirim akun via WA
   ↓
10. Customer terima akun otomatis
```

## 📊 Manage Stock

### Input Stock Baru
1. Buka Google Sheets
2. Tambah row baru:
   - Platform: `netflix`
   - Variant: `nf-sh-1m`
   - Email: `user@email.com`
   - Password: `pass123`
   - Status: `available`
   - OrderID: (kosong)
   - TanggalTerjual: (kosong)

### Cek Stock
- Frontend otomatis query Sheets setiap page load
- Stock real-time update
- Produk habis otomatis disabled

### Riwayat Penjualan
- Filter Status = `sold`
- Sort by TanggalTerjual
- Bisa export ke Excel

## 🔐 Security Notes

1. **Jangan share** `.env.local` atau credentials
2. **Service Account** hanya punya akses ke 1 spreadsheet
3. **Midtrans webhook** perlu verify signature (sudah ada di code)
4. **Private key** harus di-escape dengan `\n` untuk newline

## 💰 Estimasi Biaya Bulanan

| Service | Biaya |
|---------|-------|
| Midtrans | Gratis (potong 2-3% per transaksi) |
| Fonnte | Rp 50.000 - 100.000 |
| Vercel | Gratis |
| Google Sheets | Gratis |
| Domain .my.id | Gratis |
| **Total** | **Rp 50.000 - 100.000/bulan** |

## 🆘 Troubleshooting

### "Midtrans error"
- Cek Server Key & Client Key benar
- Pastikan mode Development untuk testing
- Cek console log untuk detail error

### "WhatsApp tidak terkirim"
- Cek Fonnte token valid
- Pastikan WhatsApp Business connected
- Test manual kirim via dashboard Fonnte

### "Google Sheets error"
- Cek service account email sudah di-share ke spreadsheet
- Cek private key format (harus ada `\n` untuk newline)
- Cek spreadsheet ID benar

## 📞 Support

Jika ada kendala setup, hubungi developer atau cek dokumentasi resmi:
- Midtrans: https://docs.midtrans.com
- Fonnte: https://fonnte.com/docs
- Google Sheets API: https://developers.google.com/sheets/api
- Vercel: https://vercel.com/docs
