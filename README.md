# KPK & FPB Interaktif Mobile V5

Versi ini memperbaiki alur pembelajaran berdasarkan evaluasi materi terbaru. Fokus utama V5 adalah mengurangi bagian yang membingungkan, mengutamakan pohon faktor, pasangan faktor visual, hasil perkalian otomatis, dan manipulasi objek yang nyaman di HP.

## Perubahan V5


- Pertemuan 1C disederhanakan: siswa melihat faktor prima beserta pangkatnya, lalu memilih langsung faktor berpangkat terbesar yang digunakan untuk KPK.
- Validasi Aktivitas 1B diperbaiki agar membaca pilihan kartu langsung dari keadaan visual tombol, bukan hanya state global.
- Aktivitas 1C dan 1D menampilkan panel pilihan faktor segera setelah kedua pohon faktor selesai, lengkap dengan tray “Dipilih” yang berubah pada saat siswa mengetuk kartu.
- Interaksi pasangan faktor Pertemuan 2 dan Aktivitas 2B diperbaiki dengan event langsung pada tombol. Pasangan muncul pada ketukan yang sama dan tidak lagi bergantung pada atribut `disabled`.
- Simbol perkalian ditambahkan di antara `2¹ × 3¹` pada penjelasan pangkat terkecil FPB.
- Benda Aktivitas 2A kini ditulis langsung di HTML agar selalu terlihat walaupun proses inisialisasi JavaScript terlambat. Tap tetap menjadi cara utama di HP, dengan drag sebagai tambahan di desktop.
- Simulasi lampu KPK berjalan sampai detik ke-24 sehingga siswa melihat pertemuan bersama pada detik ke-12 dan ke-24.
- Bagian pola menampilkan label **Kelipatan Persekutuan Terkecil** secara eksplisit.
- Tabel faktor prima KPK dan FPB dihapus. Konsep pangkat terbesar/terkecil kini ditampilkan dengan kartu faktor yang lebih sederhana.
- Contoh KPK ditambah dengan 40 dan 28 untuk memperlihatkan pangkat berbeda serta faktor prima 5 dan 7.
- Aktivitas 1A menjadi memilih kelanjutan kelipatan. Aktivitas 1B hanya satu soal.
- Aktivitas 1C dan 1D menggunakan pohon faktor sebagai interaksi utama, dilanjutkan pemilihan pangkat terbesar dan hasil otomatis.
- Pertemuan 2 menampilkan pernyataan hasil pengelompokan buah setelah tombol **Coba Kelompokkan**.
- Faktor 12 dan 18 dipelajari melalui pasangan faktor. Saat satu angka dipilih/ditarik, pasangannya muncul otomatis dengan animasi panah.
- Aktivitas 2A memakai 4 pensil dan 6 penghapus yang benar-benar dapat dipindahkan ke dua paket. Di HP gunakan pola ketuk benda lalu ketuk paket.
- Aktivitas 2B fokus pada pohon faktor 24 dan 36, pasangan faktor, FPB terbesar, dan sorotan pangkat terkecil yang sama.

Aplikasi web pembelajaran interaktif berbasis **HTML5, CSS3, dan Vanilla JavaScript**. Dirancang untuk siswa SMP/MTs Kelas VII dan dapat dipublikasikan langsung menggunakan **GitHub Pages** tanpa backend.

## Fitur

- Alur progresif: Pertemuan 1 → Aktivitas 1 → Pertemuan 2 → Aktivitas 2 → Evaluasi.
- Progress belajar tersimpan otomatis di `localStorage`.
- Simulasi lampu untuk memahami KPK.
- Garis bilangan dan pola kelipatan interaktif.
- Interaksi touch-first: matching kartu angka, pilihan kartu, dan multi-select faktor/kelipatan menggantikan input teks.
- Tidak ada textarea atau input angka yang harus diketik siswa; evaluasi numerik juga memakai kartu pilihan.
- Faktorisasi prima tanpa mengetik pangkat: pohon faktor menjadi interaksi utama.
- Pohon faktor interaktif: siswa memilih pasangan faktor sampai semua daun menjadi prima, lalu aplikasi menampilkan hasil faktorisasi untuk dipakai memilih pangkat terbesar/terkecil.
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
  interactions.js
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
  "hint": "Bandingkan beberapa kelipatan dari 6 dan 8.",
  "explanation": "Kelipatan persekutuan terkecilnya adalah 24."
}
```

Tipe yang tersedia: `mcq`, `number`, `truefalse`, dan `drag`.


## Interaksi faktorisasi prima

Pada Aktivitas 1 dan Aktivitas 2, siswa tidak perlu mengetik simbol pangkat. Di HP, ketuk kotak faktorisasi lalu ketuk kartu seperti `2²`, `2³`, atau `3²`. Di desktop, kartu juga dapat diseret. Tombol **Pohon Faktor** memandu pemecahan bilangan komposit menjadi pasangan faktor sampai seluruh ujungnya merupakan bilangan prima. Setelah selesai, tombol **Masukkan ke Jawaban** mengubah daun pohon menjadi bentuk berpangkat secara otomatis.

Untuk layar sentuh, tap adalah interaksi utama. Drag-and-drop HTML5 tetap tersedia pada desktop. Target sentuh dibuat besar dan layout utama berubah menjadi satu kolom pada layar HP.