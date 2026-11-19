# 🌟 Portfolio Website - Deployment & Customization Guide

Website portofolio statis interaktif (Next.js/React + Tailwind + Smooth Scroll + Framer Motion).
Website ini sudah dioptimalkan dan siap di-deploy langsung ke **Cloudflare Pages** tanpa server backend sama sekali.

---

## 📁 Struktur Folder Proyek

```text
Web 2/
├── dist/                     # 👉 Folder website siap hosting (Cloudflare Pages)
│   ├── index.html            # Halaman Utama (Home)
│   ├── about-me.html         # Halaman About
│   ├── works.html            # Halaman Works / Projects
│   ├── images/               # Semua gambar lokal (foto profil, logo, picsum portofolio)
│   │   ├── me.png            # Foto profil potret
│   │   ├── me-sitting.png    # Foto profil utama duduk
│   │   ├── logo.png          # Logo website
│   │   └── picsum/           # 12 gambar cover proyek portofolio
│   ├── videos/               # Video animasi 3D (glassyObj.mp4)
│   ├── audios/               # Efek suara (calmSound.mp3, hover, transition)
│   ├── _next/static/         # Bundle stylesheet Tailwind, font, dan script interaktivitas
│   └── favicon.ico           # Ikon tab browser
│
├── customize.py              # 🛠️ Script praktis untuk mengedit data diri sekaligus
└── README.md                 # Dokumentasi panduan ini
```

---

## 🛠️ Cara Mengotak-Atik & Mengedit Website

Karena website ini dibangun dari komponen Next.js/React interaktif, teks terdapat pada file HTML dan file script interaktivitas.

Untuk mempermudah Anda tanpa perlu mencari satu per satu secara manual:

### Cara 1: Menggunakan Script `customize.py` (Paling Cepat & Praktis)
1. Buka file [customize.py](file:///home/alfito/Documents/Web%202/customize.py).
2. Ubah teks yang diinginkan di bagian `REPLACEMENTS`:
   ```python
   REPLACEMENTS = {
       "Hi! i'm Alfito": "Teks Baru Anda",
       "Depok, Indonesia": "Kota Anda",
       "SMK Negeri 2 Depok": "Sekolah/Kampus Anda",
       "https://github.com/flyychmoreeee": "https://github.com/username-anda",
       # dst...
   }
   ```
3. Buka terminal di folder ini dan jalankan:
   ```bash
   python3 customize.py
   ```
   *Script akan otomatis mengupdate semua halaman (`index.html`, `about-me`, `works`) dan file script-nya sekaligus!*

### Cara 2: Mengganti Foto Sendiri
- **Foto Profil Utama**: Ganti file [dist/images/me-sitting.png](file:///home/alfito/Documents/Web%202/dist/images/me-sitting.png) dengan foto Anda (format PNG transparan disarankan).
- **Foto Profil Sekunder**: Ganti [dist/images/me.png](file:///home/alfito/Documents/Web%202/dist/images/me.png).
- **Logo**: Ganti [dist/images/logo.png](file:///home/alfito/Documents/Web%202/dist/images/logo.png).
- **Gambar Proyek**: Ganti gambar di folder [dist/images/picsum/](file:///home/alfito/Documents/Web%202/dist/images/picsum/) (`1.jpg` s/d `12.jpg`).

---

## 💻 Cara Menjalankan di Lokal (Preview)

Jalankan perintah ini di terminal:
```bash
python3 -m http.server 8080 --directory dist
```
Buka browser di **http://localhost:8080**.
> **Tips:** Gunakan `Ctrl + Shift + R` (Hard Reload) di browser setiap kali melakukan perubahan agar browser tidak menggunakan cache lama.

---

## 🚀 Cara Hosting ke Cloudflare Pages

### Opsi A: Drag & Drop via Dashboard (Paling Mudah)
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) lalu login.
2. Di menu kiri, pilih **Workers & Pages** -> **Create Application** -> tab **Pages** -> **Upload assets**.
3. Beri nama proyek (misal `portfolio-alfito`).
4. Tarik / drag & drop seluruh isi **folder `dist`**.
5. Klik **Deploy site**.

### Opsi B: Menggunakan Git (GitHub / GitLab)
1. Push folder repositori ini ke GitHub.
2. Di Cloudflare Pages, pilih **Connect to Git** dan pilih repositori Anda.
3. Di Build Settings:
   - **Framework preset**: `None`
   - **Build command**: *(kosongkan)*
   - **Build output directory**: `dist`
4. Klik **Save and Deploy**. Setiap kali Anda push, Cloudflare akan otomatis mengupdate website Anda!
