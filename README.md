# Matematika Kelas VII: KPK dan FPB

Aplikasi web pembelajaran interaktif berbasis **HTML5, CSS3, dan Vanilla JavaScript**. Dirancang untuk siswa SMP/MTs Kelas VII dan dapat dipublikasikan langsung menggunakan **GitHub Pages** tanpa backend.

## Fitur

- Alur progresif: Pertemuan 1 → Aktivitas 1 → Pertemuan 2 → Aktivitas 2 → Evaluasi.
- Progress belajar tersimpan otomatis di `localStorage`.
- Simulasi lampu untuk memahami KPK.
- Garis bilangan dan pola kelipatan interaktif.
- Faktorisasi prima tanpa mengetik pangkat: kartu faktor prima dapat di-drag-and-drop atau diketuk pada HP.
- Pohon faktor interaktif: siswa memilih pasangan faktor sampai semua daun menjadi prima, lalu hasil dapat dimasukkan otomatis ke jawaban.
- Visual pembagian buah/paket untuk memahami FPB.
- LKPD interaktif dengan validasi otomatis dan petunjuk.
- Kuis akhir 10 soal acak dengan komposisi konsep, KPK, FPB, strategi, dan soal cerita.
- Nilai dan ringkasan penguasaan materi otomatis.
- Tombol fullscreen, suara opsional, reset progress, dan responsive mobile.
- Tidak membutuhkan framework, database, atau server aplikasi.

## Struktur

```text
index.html
css/
  style.css
  responsive.css
  animation.css
js/
  app.js
  navigation.js
  factor-tools.js
  kpk.js
  fpb.js
  quiz.js
  progress.js
assets/
  images/
  icons/
data/
  questions.json
```

## Menjalankan secara lokal

Karena soal dimuat dari JSON, gunakan server statis sederhana agar `fetch()` bekerja konsisten. Aplikasi tetap memiliki fallback soal jika JSON gagal dimuat.

Dengan Python:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Deploy ke GitHub Pages

1. Buat repository GitHub baru.
2. Upload seluruh isi folder ini ke root repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`.
6. Simpan. GitHub akan memberikan URL Pages setelah deployment selesai.

## Menambah soal

Edit `data/questions.json`. Setiap soal memakai properti seperti:

```json
{
  "id": "kpk-contoh",
  "category": "KPK",
  "type": "number",
  "question": "KPK dari 6 dan 8 adalah ...",
  "answer": 24,
  "hint": "Tuliskan beberapa kelipatan dari 6 dan 8.",
  "explanation": "Kelipatan persekutuan terkecilnya adalah 24."
}
```

Tipe yang tersedia: `mcq`, `number`, `truefalse`, dan `drag`.


## Interaksi faktorisasi prima

Pada Aktivitas 1 dan Aktivitas 2, siswa tidak perlu mengetik simbol pangkat. Pilih kotak faktorisasi, lalu seret atau ketuk kartu seperti `2²`, `2³`, atau `3²`. Tombol **Pohon Faktor** memandu pemecahan bilangan komposit menjadi pasangan faktor sampai seluruh ujungnya merupakan bilangan prima. Setelah selesai, tombol **Masukkan ke Jawaban** mengubah daun pohon menjadi bentuk berpangkat secara otomatis.

Drag-and-drop menggunakan HTML5 Drag and Drop pada desktop. Untuk layar sentuh, tersedia fallback tap: ketuk kotak jawaban terlebih dahulu, lalu ketuk kartu faktor.
