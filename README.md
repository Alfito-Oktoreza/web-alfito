# Deployment Guide ke Cloudflare Pages

Folder `dist/` sudah berisi website statis lengkap yang **100% identik** dengan https://www.rasya-zildan.my.id/.
Semua aset (animasi React/Next.js, video 3D background `glassyObj.mp4`, font *Cabinet Grotesk*, foto asli Rasya, styling CSS Tailwind, dan foto proyek) sudah tersimpan lokal di dalam folder `dist/` sehingga tidak membutuhkan server/backend sama sekali.

---

## Opsi 1: Direct Upload via Dashboard Cloudflare (Paling Cepat & Mudah)

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) lalu login.
2. Di menu sidebar sebelah kiri, pilih **Workers & Pages**.
3. Klik tombol **Create Application** -> pilih tab **Pages** -> pilih **Upload assets**.
4. Masukkan **Project name** (misalnya `portfolio-rasya`).
5. Drag and drop seluruh isi **folder `dist`** (atau zip folder `dist` lalu upload).
6. Klik **Deploy site**.
7. Website langsung aktif dalam beberapa detik di subdomain `*.pages.dev` (gratis & SSL otomatis).

---

## Opsi 2: Deploy Menggunakan Wrangler CLI

Jika Anda memiliki `wrangler` terinstall:

```bash
npx wrangler pages deploy dist --project-name=portfolio-rasya
```

---

## Opsi 3: Deploy via Git (GitHub / GitLab)

1. Push folder repositori ini ke GitHub / GitLab.
2. Di Cloudflare Pages, pilih **Connect to Git**.
3. Pilih repository Anda.
4. Pada build settings:
   - **Framework preset**: `None`
   - **Build command**: *(kosongkan)*
   - **Build output directory**: `dist`
5. Klik **Save and Deploy**. Setiap kali Anda melakukan git push, Cloudflare akan auto-deploy!
