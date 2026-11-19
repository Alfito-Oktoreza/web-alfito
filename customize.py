import os
import json

"""
Script ini mempermudah Anda mengganti teks, nama, sekolah, lokasi, 
kontak, dan informasi lainnya di seluruh website (baik di file HTML 
maupun file JavaScript React bundle) dalam satu kali jalan!

Cara pakai:
1. Ubah dictionary REPLACEMENTS di bawah sesuai yang Anda mau.
2. Jalankan perintah di terminal:
   python3 customize.py
"""

# Daftar kata yang ingin diganti:
# "Teks Lama": "Teks Baru"
REPLACEMENTS = {
    # Nama dan Sapaan
    "Hi! i'm Rasya": "Hi! i'm Alfito",
    "Hi! i&#x27;m Rasya": "Hi! i&#x27;m Alfito",
    "I'm Rasya Zildan": "I'm Alfito",
    "I&#x27;m Rasya Zildan": "I&#x27;m Alfito",
    "I'm Rasya": "I'm Alfito",
    "I&#x27;m Rasya": "I&#x27;m Alfito",
    "Rasya Zildan": "Alfito",
    "Made with ❤️ by Rasya": "Made with ❤️ by Alfito",
    "Rasya - Portfolio": "Alfito - Portfolio",
    "Rasya": "Alfito",

    # Sekolah & Lokasi
    "SMK Negeri 4 Malang": "SMK Negeri 2 Depok",
    "Malang, Indonesia": "Yogyakarta, Indonesia",
    "based in Malang": "based in Yogyakarta",

    # Kontak & Media Sosial
    "mailto:mrasyazildan@gmail.com": "mailto:alfitoreza25@gmail.com",
    # "https://github.com/flyychmoreeee": "https://github.com/username-anda",
    # "https://www.linkedin.com/in/rasya-zildan-19588b2a4/": "https://www.linkedin.com/in/username-anda",
    # "https://wa.me/62895421845451": "https://wa.me/628xxxxxxxxxx",
}

def main():
    target_dir = "dist"
    updated_files = 0

    print("🚀 Memulai pembaruan konten di folder dist/...\n")

    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith((".html", ".js")):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()

                    original_content = content
                    for old_text, new_text in REPLACEMENTS.items():
                        if old_text in content:
                            content = content.replace(old_text, new_text)

                    if content != original_content:
                        with open(filepath, "w", encoding="utf-8") as f:
                            f.write(content)
                        print(f"✅ Diperbarui: {filepath}")
                        updated_files += 1
                except Exception as e:
                    print(f"❌ Error pada {filepath}: {e}")

    print(f"\n🎉 Selesai! Sebanyak {updated_files} berkas berhasil diperbarui.")
    print("💡 Buka http://localhost:8080 dan tekan Ctrl + Shift + R untuk melihat perubahannya.")

if __name__ == "__main__":
    main()
