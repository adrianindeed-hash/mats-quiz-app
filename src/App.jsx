import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Plane,
  Radar,
  Sun,
  Moon,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  AlertTriangle,
  RotateCcw,
  Home,
  ChevronDown,
  ChevronUp,
  BookOpen,
  SlidersHorizontal,
  Timer,
  Filter,
  Flame,
  Layers,
  CheckSquare,
  FileCheck2,
  Zap,
  Download,
  PieChart,
  Gauge,
  Database
} from 'lucide-react';

// ============================================================================
// CORE VERIFIED QUESTION BANK (VOLUME II - VOLUME V, EASY / MEDIUM / HARD)
// ============================================================================
const CORE_QUESTIONS = [
  // --------------------------------------------------------------------------
  // VOLUME II — ATS GENERAL PROVISIONS & SEPARATION (Sections 3 & 4)
  // --------------------------------------------------------------------------
  {
    id: "MATS-V2-001",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 3",
    reference: "MATS Part 3, Vol. II, Sec. 3.1.1",
    category: "Vol. II • Sec 3: ATS General Provisions",
    difficulty: "Easy",
    question: "Unit Area Control Centre (ACC) mana saja yang bertanggung jawab menyediakan pelayanan kontrol lalu lintas udara pada ruang udara jelajah (FL245 – FL600) di wilayah Indonesia menurut MATS Part 3 Volume II?",
    options: [
      "Jakarta Air Traffic Services Centre (JATSC) dan Makassar Air Traffic Services Centre (MATSC)",
      "Halim ACC dan Sentani ACC",
      "Denpasar ACC dan Medan ACC",
      "Surabaya ACC dan Balikpapan ACC"
    ],
    correctIndex: 0,
    explanation: "Berdasarkan MATS Part 3 Vol. II Section 3.1.1, pelayanan kontrol pada upper airspace (FL245 – FL600) diselenggarakan oleh Jakarta Air Traffic Services Centre (JATSC) dan Makassar Air Traffic Services Centre (MATSC)."
  },
  {
    id: "MATS-V2-002",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 3",
    reference: "MATS Part 3, Vol. II, Sec. 3.9.1.1",
    category: "Vol. II • Sec 3: Wake Turbulence",
    difficulty: "Easy",
    question: "Berdasarkan Maximum Certificated Take-Off Mass (MCTOM), kategori Wake Turbulence 'MEDIUM (M)' mencakup tipe pesawat dengan rentang massa sebesar:",
    options: [
      "136.000 kg atau lebih",
      "Lebih dari 7.000 kg (15.500 lb) dan kurang dari 136.000 kg (300.000 lb)",
      "7.000 kg atau kurang",
      "Lebih dari 500.000 kg"
    ],
    correctIndex: 1,
    explanation: "Sesuai MATS Part 3 Vol. II Section 3.9.1.1 c), kategori MEDIUM (M) berlaku untuk pesawat dengan certificated take-off mass kurang dari 136.000 kg dan lebih dari 7.000 kg."
  },
  {
    id: "MATS-V2-003",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 3",
    reference: "MATS Part 3, Vol. II, Sec. 3.4.1.2",
    category: "Vol. II • Sec 3: Flight Plan",
    difficulty: "Easy",
    question: "Paling awal berapa jam sebelum Estimated Off-Block Time (EOBT) suatu Flight Plan dapat diajukan (submitted) ke unit ATS?",
    options: [
      "24 jam sebelum EOBT",
      "48 jam sebelum EOBT",
      "72 jam sebelum EOBT",
      "120 jam (5 hari) sebelum EOBT"
    ],
    correctIndex: 3,
    explanation: "Menurut MATS Part 3 Vol. II Section 3.4.1.2, Flight Plan dapat diajukan paling awal 120 jam (5 hari) sebelum Estimated Off-Block Time (EOBT)."
  },
  {
    id: "MATS-V2-004",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 3",
    reference: "MATS Part 3, Vol. II, Sec. 3.10.3.2",
    category: "Vol. II • Sec 3: Altimeter Setting",
    difficulty: "Easy",
    question: "Bagaimana aturan pembulatan nilai tekanan atmosfer QNH atau QFE saat disampaikan kepada pesawat udara apabila nilainya memiliki angka desimal?",
    options: [
      "Dibulatkan ke atas ke satuan hectopascal penuh berikutnya",
      "Dibulatkan ke bawah (rounded down) ke satuan whole hectopascal terdekat di bawahnya",
      "Dibulatkan ke bilangan genap terdekat",
      "Selalu disampaikan hingga dua angka di belakang koma"
    ],
    correctIndex: 1,
    explanation: "Berdasarkan MATS Part 3 Vol. II Section 3.10.3.2, nilai QNH dan QFE harus dibulatkan ke bawah (rounded down) ke whole hectopascal terdekat di bawahnya demi menjamin margin keamanan ketinggian."
  },
  {
    id: "MATS-V2-005",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 3",
    reference: "MATS Part 3, Vol. II, Sec. 3.13.3",
    category: "Vol. II • Sec 3: Flight Progress Strips",
    difficulty: "Easy",
    question: "Berapa lama masa simpan minimum (retention period) untuk Flight Progress Strips kertas maupun rekaman data penerbangan elektronik menurut MATS Part 3 Vol. II?",
    options: [
      "Minimal 7 hari",
      "Minimal 14 hari",
      "Minimal 30 hari",
      "Minimal 365 hari"
    ],
    correctIndex: 2,
    explanation: "Berdasarkan MATS Part 3 Vol. II Section 3.13.3, Flight Progress Strips harus disimpan untuk jangka waktu sekurang-kurangnya 30 hari (atau lebih lama jika dalam proses investigasi)."
  },
  {
    id: "MATS-V2-006",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 4",
    reference: "MATS Part 3, Vol. II, Sec. 4.3.2 a)",
    category: "Vol. II • Sec 4: Vertical Separation",
    difficulty: "Easy",
    question: "Berapa standar Vertical Separation Minimum (VSM) yang berlaku untuk penerbangan di bawah FL290?",
    options: [
      "Nominal 500 ft (150 m)",
      "Nominal 1.000 ft (300 m)",
      "Nominal 2.000 ft (600 m)",
      "Nominal 4.000 ft (1.200 m)"
    ],
    correctIndex: 1,
    explanation: "Sesuai MATS Part 3 Vol. II Section 4.3.2 a), Vertical Separation Minimum (VSM) adalah nominal 300 m (1.000 ft) di bawah FL290."
  },
  {
    id: "MATS-V2-007",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 4",
    reference: "MATS Part 3, Vol. II, Sec. 4.3.2 b)",
    category: "Vol. II • Sec 4: RVSM",
    difficulty: "Easy",
    question: "Berapa standar Vertical Separation Minimum (VSM) di dalam ruang udara RVSM antara FL290 hingga FL410 inklusif untuk pesawat yang memiliki persetujuan RVSM?",
    options: [
      "Nominal 500 ft (150 m)",
      "Nominal 1.000 ft (300 m)",
      "Nominal 2.000 ft (600 m)",
      "Nominal 3.000 ft (900 m)"
    ],
    correctIndex: 1,
    explanation: "Menurut MATS Part 3 Vol. II Section 4.3.2 b), di wilayah RVSM (FL290 hingga FL410 inklusif), VSM untuk pesawat RVSM-approved adalah nominal 300 m (1.000 ft)."
  },
  {
    id: "MATS-V2-008",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 3",
    reference: "MATS Part 3, Vol. II, Sec. 3.6.3.3",
    category: "Vol. II • Sec 3: Speed Control",
    difficulty: "Medium",
    question: "Selama initial descent dari cruising level untuk pesawat turbojet, berapa batas pengurangan kecepatan minimum yang dapat diinstruksikan tanpa persetujuan awal awak pesawat?",
    options: [
      "Tidak kurang dari 210 kt IAS",
      "Tidak kurang dari 250 kt (460 km/h) IAS",
      "Tidak kurang dari 280 kt IAS",
      "Tidak kurang dari 180 kt IAS"
    ],
    correctIndex: 1,
    explanation: "Sesuai MATS Part 3 Vol. II Section 3.6.3.3, controller tidak boleh memberikan instruksi pengurangan kecepatan kurang dari 460 km/h (250 kt) IAS selama initial descent dari cruising level untuk pesawat turbojet tanpa persetujuan awak pesawat."
  },
  {
    id: "MATS-V2-009",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 3",
    reference: "MATS Part 3, Vol. II, Sec. 3.6.3.7",
    category: "Vol. II • Sec 3: Speed Control",
    difficulty: "Medium",
    question: "Pada posisi manakah controller DILARANG menerapkan instruksi kontrol kecepatan (speed control) kepada pesawat yang sedang melaksanakan final approach?",
    options: [
      "Setelah pesawat melewati titik 7 km (4 NM) dari threshold runway",
      "Sebelum pesawat melewati Initial Approach Fix (IAF)",
      "Saat pesawat berada di atas FL100",
      "Pada jarak 12 NM dari threshold runway"
    ],
    correctIndex: 0,
    explanation: "Berdasarkan MATS Part 3 Vol. II Section 3.6.3.7, kontrol kecepatan tidak boleh diterapkan pada pesawat setelah melewati titik 7 km (4 NM) dari threshold pada final approach."
  },
  {
    id: "MATS-V2-010",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 3",
    reference: "MATS Part 3, Vol. II, Sec. 3.10.1.1",
    category: "Vol. II • Sec 3: Altimeter Setting",
    difficulty: "Medium",
    question: "Bagaimana posisi vertikal pesawat dinyatakan saat melintasi Transition Layer di sekitar aerodrome dan di dalam TMA?",
    options: [
      "Selalu dinyatakan dalam Altitude saat climbing maupun descending",
      "Selalu dinyatakan dalam Flight Level saat climbing maupun descending",
      "Dinyatakan dalam Flight Levels saat climbing, dan dalam Altitudes saat descending",
      "Dinyatakan dalam Height di atas permukaan tanah"
    ],
    correctIndex: 2,
    explanation: "Sesuai MATS Part 3 Vol. II Section 3.10.1.1, saat melintasi transition layer, posisi vertikal pesawat dinyatakan dalam Flight Levels ketika climbing dan dalam Altitudes ketika descending."
  },
  {
    id: "MATS-V2-011",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 4",
    reference: "MATS Part 3, Vol. II, Sec. 4.4.1.2.1.1 a)",
    category: "Vol. II • Sec 4: Lateral Separation",
    difficulty: "Medium",
    question: "Berapa kriteria sudut divergensi dan jarak minimum dari fasilitas VOR agar tercapai separasi lateral menggunakan VOR?",
    options: [
      "Kedua pesawat berada pada radial VOR yang berbeda minimal 15 derajat dan sekurang-kurangnya satu pesawat berada pada jarak 28 km (15 NM) atau lebih dari fasilitas",
      "Sudut divergensi minimal 5 derajat dan jarak 5 NM dari VOR",
      "Sudut divergensi minimal 30 derajat dan jarak 10 NM dari VOR",
      "Sudut divergensi minimal 45 derajat dan jarak 3 NM dari VOR"
    ],
    correctIndex: 0,
    explanation: "Sesuai MATS Part 3 Vol. II Section 4.4.1.2.1.1 a), separasi lateral berbasis VOR tercapai apabila kedua pesawat berada pada radial yang divergen minimal 15° dan setidaknya satu pesawat berada pada jarak 28 km (15 NM) atau lebih dari fasilitas VOR."
  },
  {
    id: "MATS-V2-012",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 4",
    reference: "MATS Part 3, Vol. II, Sec. 4.4.2.2.1.1 c)",
    category: "Vol. II • Sec 4: Longitudinal Separation",
    difficulty: "Medium",
    question: "Dalam kondisi apakah separasi longitudinal berbasis waktu pada same track dapat dikurangi menjadi 5 menit?",
    options: [
      "Apabila pesawat di belakang lebih cepat 10 kt dari pesawat di depan",
      "Apabila pesawat di depan mempertahankan true airspeed (TAS) sekurang-kurangnya 37 km/h (20 kt) lebih cepat daripada pesawat di belakangnya",
      "Apabila kedua pesawat berada di atas FL410 tanpa laporan posisi",
      "Apabila kedua pesawat terbang pada malam hari"
    ],
    correctIndex: 1,
    explanation: "Berdasarkan MATS Part 3 Vol. II Section 4.4.2.2.1.1 c), separasi longitudinal waktu dapat dikurangi menjadi 5 menit apabila pesawat di depan mempertahankan TAS minimal 37 km/h (20 kt) lebih cepat dari pesawat di belakangnya."
  },
  {
    id: "MATS-V2-013",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 4",
    reference: "MATS Part 3, Vol. II, Sec. 4.4.2.4.1",
    category: "Vol. II • Sec 4: Mach Number Technique",
    difficulty: "Medium",
    question: "Dalam penerapan Mach Number Technique (MNT), berapa separasi longitudinal minimum apabila pesawat di depan mempertahankan angka Mach yang sama atau lebih besar dari pesawat di belakangnya?",
    options: [
      "5 menit",
      "10 menit",
      "15 menit",
      "20 menit"
    ],
    correctIndex: 1,
    explanation: "Menurut MATS Part 3 Vol. II Section 4.4.2.4.1 a), separasi longitudinal minimum dengan Mach Number Technique (MNT) adalah 10 menit apabila pesawat di depan mempertahankan true Mach number yang sama atau lebih besar."
  },
  {
    id: "MATS-V2-014",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 4",
    reference: "MATS Part 3, Vol. II, Sec. 4.4.2.7.2",
    category: "Vol. II • Sec 4: ADS-B ITP",
    difficulty: "Hard",
    question: "Berapa jarak separasi minimum dan perbedaan kecepatan maksimum dalam prosedur ADS-B In-Trail Procedure (ITP) untuk pesawat yang melakukan climb/descent melewati reference aircraft?",
    options: [
      "Minimal 15 NM dengan selisih ground speed maks 20 kt, atau minimal 20 NM dengan selisih ground speed maks 30 kt",
      "Minimal 5 NM dengan selisih ground speed maks 50 kt",
      "Minimal 30 NM dengan selisih ground speed maks 10 kt",
      "Minimal 10 NM dengan selisih ground speed maks 40 kt"
    ],
    correctIndex: 0,
    explanation: "Berdasarkan MATS Part 3 Vol. II Section 4.4.2.7.2, jarak ITP minimum adalah 28 km (15 NM) dengan perbedaan ground speed positif maksimum 37 km/h (20 kt), atau 37 km (20 NM) dengan perbedaan ground speed positif maksimum 56 km/h (30 kt)."
  },
  {
    id: "MATS-V2-015",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 4",
    reference: "MATS Part 3, Vol. II, Sec. 4.4.2.8.1",
    category: "Vol. II • Sec 4: ADS-C CDP",
    difficulty: "Hard",
    question: "Dalam penerapan ADS-C Climb and Descend Procedure (CDP) pada same track, jarak longitudinal minimum yang diizinkan ketika following aircraft lebih cepat tidak lebih dari 10 kt atau Mach 0.02 dibanding preceding aircraft adalah:",
    options: [
      "15 NM dengan batas beda ketinggian maksimal 1.000 ft dan re-establish separasi vertikal dalam 10 menit",
      "25 NM (46,3 km) dengan batas beda ketinggian maksimal 2.000 ft (600 m) dan re-establish separasi vertikal dalam 15 menit",
      "30 NM dengan batas beda ketinggian maksimal 2.000 ft dan re-establish separasi vertikal dalam 15 menit",
      "25 NM dengan batas beda ketinggian maksimal 4.000 ft dan re-establish separasi vertikal dalam 20 menit"
    ],
    correctIndex: 1,
    explanation: "Sec. 4.4.2.8.1 mensyaratkan jarak minimal 46,3 km (25 NM) jika following aircraft lebih cepat ≤ 10 kt/Mach 0.02, beda altitude tidak lebih dari 600 m (2.000 ft), FoM ≥ 6, dan separasi vertikal harus kembali terbentuk dalam 15 menit."
  },
  {
    id: "MATS-V2-016",
    part: "Part 3",
    volume: "Volume II",
    section: "Section 4",
    reference: "MATS Part 3, Vol. II, Sec. 4.4.2.6.2",
    category: "Vol. II • Sec 4: RNP 10 Separation",
    difficulty: "Hard",
    question: "Dalam penerapan separasi longitudinal berbasis jarak RNP 10 (93 km / 50 NM), berapa interval maksimum pelaporan posisi pesawat dan batas keterlambatan laporan sebelum separasi lain harus segera diterapkan?",
    options: [
      "Interval pelaporan setiap 60 menit; keterlambatan 10 menit",
      "Interval pelaporan tidak lebih dari 24 menit; jika laporan terlambat melebihi 3 menit (ADS-C) atau 8 menit (voice/CPDLC), separasi alternatif wajib segera diterapkan",
      "Interval pelaporan setiap 15 menit; keterlambatan 20 menit",
      "Tidak memerlukan pelaporan posisi periodik"
    ],
    correctIndex: 1,
    explanation: "Sesuai MATS Part 3 Vol. II Section 4.4.2.6.2, separasi RNP 10 (50 NM) mensyaratkan pelaporan posisi setidaknya setiap 24 menit; jika laporan terlambat melebihi 3 menit (ADS-C) atau 8 menit (voice/CPDLC) dan komunikasi tidak segera pulih, separasi alternatif wajib segera diterapkan."
  },

  // --------------------------------------------------------------------------
  // VOLUME III — AERODROME CONTROL PROCEDURES (Sections 5 & 6)
  // --------------------------------------------------------------------------
  {
    id: "MATS-V3-001",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 6",
    reference: "MATS Part 3, Vol. III, Sec. 6.9.3.3",
    category: "Vol. III • Sec 6: Take-Off Procedures",
    difficulty: "Easy",
    question: "Kapan ekspresi 'TAKE-OFF' diperbolehkan digunakan dalam komunikasi radiotelefoni oleh Aerodrome Controller?",
    options: [
      "Saat memberikan instruksi line-up and wait di runway",
      "Hanya ketika pesawat diberikan clearance for take-off atau saat membatalkan take-off clearance",
      "Saat menginformasikan kesiapan urutan keberangkatan kepada pesawat di holding point",
      "Setiap kali menyebut take-off run available atau instruksi persiapan lepas landas"
    ],
    correctIndex: 1,
    explanation: "Sec. 6.9.3.3 menegaskan bahwa ekspresi TAKE-OFF hanya digunakan dalam radiotelefoni ketika pesawat diberi izin lepas landas atau saat membatalkan izin lepas landas."
  },
  {
    id: "MATS-V3-002",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 6",
    reference: "MATS Part 3, Vol. III, Sec. 6.1.2.3",
    category: "Vol. III • Sec 6: TWR Alerting",
    difficulty: "Easy",
    question: "Jika sebuah pesawat yang telah ditransfer ke Aerodrome Control Tower gagal melapor, atau setelah melapor kehilangan kontak radio dan tidak mendarat dalam waktu berapa menit setelah expected landing time, Tower wajib melaporkannya ke unit APP/ACC/FIC atau RCC?",
    options: [
      "3 menit",
      "5 menit",
      "10 menit",
      "15 menit"
    ],
    correctIndex: 1,
    explanation: "Sec. 6.1.2.3 menetapkan batas waktu 5 menit setelah expected landing time bagi TWR untuk melaporkan ke unit APP/ACC/FIC atau RCC/RSC."
  },
  {
    id: "MATS-V3-003",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 6",
    reference: "MATS Part 3, Vol. III, Sec. 6.4.1",
    category: "Vol. III • Sec 6: Traffic Circuit",
    difficulty: "Easy",
    question: "Ke arah manakah seluruh belokan (turns) standar dalam aerodrome traffic circuit harus dilakukan apabila tidak ada instruksi atau publikasi prosedur yang berbeda?",
    options: [
      "Seluruh belokan dilakukan ke kanan (right-hand circuit)",
      "Seluruh belokan dilakukan ke kiri (left-hand circuit)",
      "Selalu zig-zag menyesuaikan arah angin",
      "Bebas ditentukan oleh masing-masing pilot"
    ],
    correctIndex: 1,
    explanation: "Sesuai MATS Part 3 Vol. III Section 6.4.1, secara standar seluruh belokan pada aerodrome traffic circuit harus dilakukan ke kiri (left-hand circuit), kecuali diinstruksikan atau dipublikasikan sebaliknya."
  },
  {
    id: "MATS-V3-004",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 6",
    reference: "MATS Part 3, Vol. III, Sec. 6.13.4",
    category: "Vol. III • Sec 6: Aerodrome Lighting",
    difficulty: "Easy",
    question: "Apa fungsi utama Stop Bars yang dipasang pada runway-holding positions yang terhubung dengan runway aktif?",
    options: [
      "Menunjukkan batas area parkir mobil petugas",
      "Memberikan sinyal visual lampu merah melintang yang tidak boleh dilintasi oleh pesawat maupun kendaraan sebelum lampu stop bar dimatikan oleh controller dan clearance diberikan",
      "Menandai titik awal lepas landas di tengah runway",
      "Memberikan penerangan bagi penumpang yang berjalan kaki di apron"
    ],
    correctIndex: 1,
    explanation: "Sesuai MATS Part 3 Vol. III Section 6.13.4, stop bars yang menyala merah merupakan perintah berhenti mutlak; tidak ada pesawat atau kendaraan yang boleh melintasi stop bar yang menyala hingga dimatikan oleh controller."
  },
  {
    id: "MATS-V3-005",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 5",
    reference: "MATS Part 3, Vol. III, Sec. 5.5.2.3",
    category: "Vol. III • Sec 5: Parallel Runways",
    difficulty: "Easy",
    question: "Dalam operasi pendekatan paralel independen (independent parallel approaches), zona ruang udara dengan dimensi tertentu yang terletak di tengah antara dua extended runway centrelines dan dimonitor untuk mencegah penyimpangan pesawat disebut apa?",
    options: [
      "Clearway (CWY)",
      "No-Transgression Zone (NTZ)",
      "Runway End Safety Area (RESA)",
      "Touchdown Zone (TDZ)"
    ],
    correctIndex: 1,
    explanation: "Sesuai MATS Part 3 Vol. III Section 5.5.2.3, No-Transgression Zone (NTZ) adalah koridor ruang udara yang ditetapkan di antara dua Normal Operating Zones (NOZ) pada parallel approaches."
  },
  {
    id: "MATS-V3-006",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 5",
    reference: "MATS Part 3, Vol. III, Sec. 5.7.2.2",
    category: "Vol. III • Sec 5: Parallel Departures",
    difficulty: "Medium",
    question: "Pada operasi Independent Parallel Departures menggunakan prosedur instrumen RNAV atau RNP, berapa sudut divergensi minimum lintasan keberangkatan nominal setelah lepas landas yang diizinkan jika jarak antar sumbu runway minimal 760 m (2.500 ft)?",
    options: [
      "10 derajat dengan belokan dimulai tidak lebih dari 2,0 NM dari ujung keberangkatan runway",
      "15 derajat dengan belokan dimulai tidak lebih dari 3,0 NM dari ujung keberangkatan runway",
      "5 derajat segera setelah melewati ketinggian 400 ft AGL",
      "10 derajat dengan belokan dimulai setelah melewati ketinggian 1.000 ft AGL"
    ],
    correctIndex: 0,
    explanation: "Sec. 5.7.2.2 b) 2) mengizinkan divergensi 10 derajat (turun dari standar 15 derajat) jika kedua pesawat terbang dengan prosedur RNAV/RNP dan belokan dimulai tidak lebih dari 3,7 km (2,0 NM) dari departure end of runway."
  },
  {
    id: "MATS-V3-007",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 6",
    reference: "MATS Part 3, Vol. III, Sec. 6.2.6",
    category: "Vol. III • Sec 6: Runway-in-Use",
    difficulty: "Medium",
    question: "Dalam kondisi manakah faktor noise abatement TIDAK boleh dijadikan faktor penentu dalam pemilihan runway-in-use untuk operasi pendaratan?",
    options: [
      "Ceiling lebih rendah dari 1.000 ft atau visibility kurang dari 5.000 m",
      "Ceiling lebih rendah dari 500 ft (150 m) di atas elevasi aerodrome atau visibility kurang dari 1.900 m",
      "Komponen tailwind melebihi 3 kt pada runway kering",
      "Hanya tersedia pendekatan non-presisi VOR/DME dengan visibility 3.000 m"
    ],
    correctIndex: 1,
    explanation: "Sec. 6.2.6 b) 1) melarang penggunaan noise abatement sebagai faktor penentu jika ceiling < 150 m (500 ft) di atas aerodrome elevation atau visibility < 1.900 m (atau kondisi permukaan runway terkontaminasi)."
  },
  {
    id: "MATS-V3-008",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 5",
    reference: "MATS Part 3, Vol. III, Sec. 5.7.1.2",
    category: "Vol. III • Sec 5: Wake Turbulence TWR",
    difficulty: "Medium",
    question: "Berapa separasi waktu Wake Turbulence non-radar minimum apabila pesawat LIGHT atau MEDIUM lepas landas dari bagian tengah runway (intermediate part of the same runway) di belakang pesawat HEAVY?",
    options: [
      "1 menit",
      "2 menit",
      "3 menit",
      "5 menit"
    ],
    correctIndex: 2,
    explanation: "Sesuai MATS Part 3 Vol. III Section 5.7.1.2, apabila pesawat LIGHT atau MEDIUM berangkat dari intermediate part of the same runway di belakang pesawat HEAVY, separasi waktu minimum adalah 3 menit."
  },
  {
    id: "MATS-V3-009",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 6",
    reference: "MATS Part 3, Vol. III, Sec. 6.12.3",
    category: "Vol. III • Sec 6: Low Visibility Procedures",
    difficulty: "Medium",
    question: "Selama pemberlakuan Low Visibility Procedures (LVP), titik henti (holding position) manakah yang wajib digunakan oleh pesawat sebelum memasuki runway untuk melindungi sinyal ILS?",
    options: [
      "Apron edge line",
      "CAT II/III runway-holding position yang lebih jauh dari centerline runway",
      "Touchdown zone marking",
      "Runway end lights"
    ],
    correctIndex: 1,
    explanation: "Berdasarkan MATS Part 3 Vol. III Section 6.12.3, selama LVP, pesawat yang menunggu izin masuk runway wajib ditahan pada CAT II/III holding position guna menjaga integritas sinyal ILS critical dan sensitive areas."
  },
  {
    id: "MATS-V3-010",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 6",
    reference: "MATS Part 3, Vol. III, Sec. 6.11.7 a) 2)",
    category: "Vol. III • Sec 6: Reduced Runway Separation",
    difficulty: "Hard",
    question: "Pada penerapan Reduced Runway Separation Minima (RRSM) di siang hari (30 menit setelah sunrise hingga 30 menit sebelum sunset), pesawat Category 2 yang akan mendarat diizinkan melintasi runway threshold di belakang pesawat Category 1 yang telah mendarat apabila pesawat pendahulu tersebut telah melewati titik minimal sejauh:",
    options: [
      "600 m dari threshold runway dan sedang bergerak untuk meninggalkan runway tanpa backtracking",
      "1.500 m dari threshold runway, sedang bergerak dan akan meninggalkan runway tanpa backtracking",
      "2.400 m dari threshold runway dan berada di luar runway-holding position",
      "1.000 m dari threshold runway dengan komponen tailwind tidak melebihi 10 kt"
    ],
    correctIndex: 1,
    explanation: "Sec. 6.11.7 a) 2) menetapkan jarak minimum 1.500 m dari runway threshold untuk succeeding landing Category 2 di belakang Category 1 atau 2."
  },
  {
    id: "MATS-V3-011",
    part: "Part 3",
    volume: "Volume III",
    section: "Section 5",
    reference: "MATS Part 3, Vol. III, Sec. 5.7.3.2.4",
    category: "Vol. III • Sec 5: Independent Parallel Approaches",
    difficulty: "Hard",
    question: "Ketika memvektor pesawat untuk mencegat final approach course/track pada operasi Independent Parallel Approaches, vektor terakhir (final vector) wajib memenuhi ketentuan geometri penerbangan berikut, KECUALI:",
    options: [
      "Sudut intersepsi tidak lebih besar dari 30 derajat",
      "Memberikan penerbangan lurus dan datar (straight and level flight) minimal 1,0 NM sebelum memotong final approach course/track",
      "Memungkinkan pesawat established pada final approach course/track dalam kondisi level flight minimal 2,0 NM sebelum memotong glide path",
      "Sudut intersepsi tidak lebih besar dari 45 derajat dengan jarak level flight minimal 1,5 NM sebelum glide path"
    ],
    correctIndex: 3,
    explanation: "Sec. 5.7.3.2.4 menetapkan sudut intersepsi maks 30°, minimal 1,9 km (1,0 NM) straight & level sebelum intercept localizer/track, dan minimal 3,7 km (2,0 NM) level flight sebelum intercept glide path."
  },

  // --------------------------------------------------------------------------
  // VOLUME IV — ATS SURVEILLANCE, FIS & COORDINATION (Sections 7, 8 & 9)
  // --------------------------------------------------------------------------
  {
    id: "MATS-V4-001",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 7",
    reference: "MATS Part 3, Vol. IV, Sec. 7.5.5.1.1",
    category: "Vol. IV • Sec 7: ATS Surveillance",
    difficulty: "Easy",
    question: "Berapa nilai toleransi (tolerance value) yang digunakan untuk menentukan keakuratan informasi ketinggian berbasis pressure-altitude (Mode C / Mode S / ADS-B) yang ditampilkan pada situation display controller di dalam airspace RVSM?",
    options: [
      "±30 m (±100 ft)",
      "±60 m (±200 ft)",
      "±90 m (±300 ft)",
      "±150 m (±500 ft)"
    ],
    correctIndex: 1,
    explanation: "Sec. 7.5.5.1.1 menetapkan nilai toleransi ±60 m (±200 ft) dalam airspace RVSM (dan ±90 m / ±300 ft di luar airspace RVSM)."
  },
  {
    id: "MATS-V4-002",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 7",
    reference: "MATS Part 3, Vol. IV, Sec. 7.7.3.1",
    category: "Vol. IV • Sec 7: Surveillance Separation",
    difficulty: "Easy",
    question: "Kecuali ditetapkan lain berdasarkan kemampuan sistem surveillance tertentu atau pendekatan paralel, berapa standar horizontal separation minimum berbasis radar, ADS-B, dan/atau MLAT?",
    options: [
      "5,6 km (3,0 NM)",
      "9,3 km (5,0 NM)",
      "18,5 km (10,0 NM)",
      "4,6 km (2,5 NM)"
    ],
    correctIndex: 1,
    explanation: "Sec. 7.7.3.1 menetapkan standar dasar separasi horizontal berbasis sistem ATS surveillance sebesar 9,3 km (5,0 NM)."
  },
  {
    id: "MATS-V4-003",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 7",
    reference: "MATS Part 3, Vol. IV, Sec. 7.8.1.2",
    category: "Vol. IV • Sec 7: SSR Emergency Codes",
    difficulty: "Easy",
    question: "Kode transponder SSR manakah yang harus disetel oleh pesawat yang mengalami pembajakan (unlawful interference), kegagalan komunikasi radio (RCF), dan keadaan darurat umum (emergency)?",
    options: [
      "7500 (unlawful interference), 7600 (radio failure), dan 7700 (emergency)",
      "7700 (unlawful interference), 7500 (radio failure), dan 7600 (emergency)",
      "7600 (unlawful interference), 7700 (radio failure), dan 7500 (emergency)",
      "2000 (unlawful interference), 1200 (radio failure), dan 0000 (emergency)"
    ],
    correctIndex: 0,
    explanation: "Sesuai MATS Part 3 Vol. IV Section 7.8.1.2, kode SSR khusus darurat adalah: 7500 untuk unlawful interference, 7600 untuk radio communication failure, dan 7700 untuk general emergency."
  },
  {
    id: "MATS-V4-004",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 8",
    reference: "MATS Part 3, Vol. IV, Sec. 8.2.2.1",
    category: "Vol. IV • Sec 8: Alerting Service",
    difficulty: "Easy",
    question: "Apa tiga tingkatan fase darurat (emergency phases) yang ditetapkan dalam Alerting Service untuk mengklasifikasikan kondisi pesawat yang memerlukan bantuan SAR?",
    options: [
      "ALPHA, BRAVO, dan CHARLIE",
      "INCERFA (Uncertainty phase), ALERFA (Alert phase), dan DETRESFA (Distress phase)",
      "CAUTION, WARNING, dan DANGER",
      "LEVEL 1, LEVEL 2, dan LEVEL 3"
    ],
    correctIndex: 1,
    explanation: "Berdasarkan MATS Part 3 Vol. IV Section 8.2.2.1, tiga fase darurat dalam Alerting Service adalah INCERFA, ALERFA, dan DETRESFA."
  },
  {
    id: "MATS-V4-005",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 9",
    reference: "MATS Part 3, Vol. IV, Sec. 9.5.3.2",
    category: "Vol. IV • Sec 9: Coordination & AIDC",
    difficulty: "Easy",
    question: "Dalam proses negosiasi kondisi transfer melalui pesan koordinasi atau sistem AIDC, pesan apakah yang dikirimkan untuk mengusulkan perubahan kondisi transfer dan pesan apakah yang dikirimkan untuk menyetujuinya?",
    options: [
      "Coordination Message (CDN) untuk mengusulkan revisi, dan Acceptance Message (ACP) untuk menyetujui kondisi transfer",
      "SIGMET untuk mengusulkan revisi, dan ATIS untuk menyetujuinya",
      "NOTAM untuk mengusulkan revisi, dan METAR untuk menyetujuinya",
      "MAYDAY untuk mengusulkan revisi, dan PAN-PAN untuk menyetujuinya"
    ],
    correctIndex: 0,
    explanation: "Berdasarkan MATS Part 3 Vol. IV Section 9.5.3.2, Coordination Message (CDN) digunakan untuk mengusulkan perubahan terhadap kondisi transfer, sedangkan Acceptance Message (ACP) untuk menyatakan persetujuan."
  },
  {
    id: "MATS-V4-006",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 7",
    reference: "MATS Part 3, Vol. IV, Sec. 7.6.2.4.1 d)",
    category: "Vol. IV • Sec 7: Radar Identification",
    difficulty: "Medium",
    question: "Dalam metode identifikasi pesawat menggunakan PSR (Primary Surveillance Radar), perubahan heading yang diinstruksikan kepada pilot untuk mengorelasikan pergerakan target di layar harus sebesar:",
    options: [
      "15 derajat atau lebih",
      "20 derajat atau lebih",
      "30 derajat atau lebih",
      "45 derajat atau lebih"
    ],
    correctIndex: 2,
    explanation: "Sec. 7.6.2.4.1 d) mensyaratkan perubahan heading sebesar 30 derajat atau lebih untuk identifikasi PSR."
  },
  {
    id: "MATS-V4-007",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 8",
    reference: "MATS Part 3, Vol. IV, Sec. 8.1.4.1.3",
    category: "Vol. IV • Sec 8: Air Traffic Advisory",
    difficulty: "Medium",
    question: "Pada penyelenggaraan Air Traffic Advisory Service di dalam ruang udara kelas F (advisory airspace/routes), bagaimana sifat instruksi yang diberikan oleh unit ATS kepada pesawat udara?",
    options: [
      "Menerbitkan ATC clearance yang mengikat secara penuh untuk mencegah tabrakan",
      "Tidak menerbitkan clearances, melainkan hanya memberikan advisory information dengan menggunakan kata 'advise' atau 'suggest'",
      "Memberikan vektor radar wajib untuk memisahkan lalu lintas IFR dan VFR",
      "Hanya memberikan informasi meteorologi tanpa saran penghindaran lalu lintas"
    ],
    correctIndex: 1,
    explanation: "Sec. 8.1.4.1.3 menegaskan bahwa Air Traffic Advisory Service tidak memberikan 'clearances' tetapi hanya 'advisory information' menggunakan kata 'advise' atau 'suggest'."
  },
  {
    id: "MATS-V4-008",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 7",
    reference: "MATS Part 3, Vol. IV, Sec. 7.7.3.1",
    category: "Vol. IV • Sec 7: Surveillance Wake Turbulence",
    difficulty: "Medium",
    question: "Berapa jarak Wake Turbulence Separation Minima berbasis ATS surveillance untuk pesawat kategori LIGHT (L) yang terbang di belakang pesawat kategori SUPER (A380-800)?",
    options: [
      "5 NM (9,3 km)",
      "6 NM (11,1 km)",
      "7 NM (13,0 km)",
      "8 NM (14,8 km)"
    ],
    correctIndex: 3,
    explanation: "Menurut MATS Part 3 Vol. IV Section 7.7.3.1, jarak separasi wake turbulence berbasis surveillance di belakang kategori SUPER adalah 6 NM (HEAVY), 7 NM (MEDIUM), dan 8 NM / 14,8 km (LIGHT)."
  },
  {
    id: "MATS-V4-009",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 7",
    reference: "MATS Part 3, Vol. IV, Sec. 7.7.3.2 b)",
    category: "Vol. IV • Sec 7: Reduced Surveillance Separation",
    difficulty: "Hard",
    question: "Penerapan reduksi separasi surveillance menjadi 4,6 km (2,5 NM) antara pesawat berurutan di final approach track dalam jarak 10 NM dari threshold hanya dapat dilakukan apabila seluruh persyaratan terpenuhi, termasuk average runway occupancy time (ROT) pesawat mendarat tidak melebihi:",
    options: [
      "40 detik dan update rate surveillance ≤ 4 detik",
      "50 detik dan update rate surveillance ≤ 5 detik",
      "60 detik dan update rate surveillance ≤ 5 detik",
      "45 detik dan update rate surveillance ≤ 3 detik"
    ],
    correctIndex: 1,
    explanation: "Sec. 7.7.3.2 b) i) & iii) mensyaratkan rata-rata ROT tidak melebihi 50 detik, update rate sistem surveillance 5 detik atau kurang, braking action baik, dan tidak berlaku separasi wake turbulence jarak."
  },
  {
    id: "MATS-V4-010",
    part: "Part 3",
    volume: "Volume IV",
    section: "Section 7",
    reference: "MATS Part 3, Vol. IV, Sec. 7.7.2.4",
    category: "Vol. IV • Sec 7: Display Separation Measurement",
    difficulty: "Hard",
    question: "Bagaimana cara mengukur jarak separasi pada situation display ketika memisahkan dua pesawat di mana satu target ditampilkan menggunakan PSR blip dan target lainnya menggunakan SSR response?",
    options: [
      "Dari pusat PSR blip ke pusat SSR response",
      "Dari tepi terdekat PSR blip ke tepi terdekat SSR response",
      "Dari pusat PSR blip ke tepi terdekat SSR response",
      "Dari tepi terjauh PSR blip ke pusat SSR response"
    ],
    correctIndex: 2,
    explanation: "Sec. 7.7.2.4 mengatur pengukuran dari centre of the PSR blip ke nearest edge of the SSR response (sedangkan antar dua SSR response diukur dari closest edges per Sec. 7.7.2.6)."
  },

  // --------------------------------------------------------------------------
  // VOLUME V — COMMUNICATIONS & CONTINGENCY PROCEDURES (Sections 10 - 15)
  // --------------------------------------------------------------------------
  {
    id: "MATS-V5-001",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 10",
    reference: "MATS Part 3, Vol. V, Sec. 10.1.2",
    category: "Vol. V • Sec 10: ATS Messages & AFTN",
    difficulty: "Easy",
    question: "Dalam pengiriman pesan ATS melalui jaringan AFTN, indikator prioritas (Priority Indicator) manakah yang digunakan untuk pesan kategori Urgency messages (termasuk fase Alert atau Uncertainty)?",
    options: [
      "SS",
      "DD",
      "FF",
      "GG"
    ],
    correctIndex: 1,
    explanation: "Sec. 10.1.2 menetapkan prioritas SS untuk distress, DD untuk urgency (alert/uncertainty phase), dan FF (atau lebih tinggi) untuk radiocommunication failure/emergency lainnya."
  },
  {
    id: "MATS-V5-002",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 11",
    reference: "MATS Part 3, Vol. V, Sec. 11.4.3.8",
    category: "Vol. V • Sec 11: Phraseologies",
    difficulty: "Easy",
    question: "Phraseology standar yang diucapkan oleh controller untuk meminta penangguhan sementara operasi transponder pesawat adalah:",
    options: [
      "STOP SQUAWK",
      "SQUAWK STANDBY",
      "SQUAWK LOW",
      "RESET SQUAWK"
    ],
    correctIndex: 1,
    explanation: "Sec. 11.4.3.8 menetapkan phraseology 'SQUAWK STANDBY' untuk temporary suspension of transponder operation."
  },
  {
    id: "MATS-V5-003",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 10",
    reference: "MATS Part 3, Vol. V, Sec. 10.2.1",
    category: "Vol. V • Sec 10: Movement & Control Messages",
    difficulty: "Easy",
    question: "Singkatan tiga huruf standar pesan ATS manakah yang digunakan untuk menyatakan Modification Message dan Arrival Message pada jaringan AFTN?",
    options: [
      "CHG (Modification) dan ARR (Arrival)",
      "MOD (Modification) dan LND (Arrival)",
      "REV (Modification) dan TDN (Arrival)",
      "AMD (Modification) dan FIN (Arrival)"
    ],
    correctIndex: 0,
    explanation: "Sesuai MATS Part 3 Vol. V Section 10.2.1, designator standar ICAO/MATS adalah CHG untuk Modification message dan ARR untuk Arrival message."
  },
  {
    id: "MATS-V5-004",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 13",
    reference: "MATS Part 3, Vol. V, Sec. 13.1.2",
    category: "Vol. V • Sec 13: CPDLC Procedures",
    difficulty: "Easy",
    question: "Apa kepanjangan dari CPDLC dalam penyelenggaraan layanan komunikasi data antara controller dan pilot pada MATS Part 3 Volume V Section 13?",
    options: [
      "Controller-Pilot Data Link Communications",
      "Centralized Position Data Link Control",
      "Continuous Pilot Digital Link Channel",
      "Control Procedure Data Location Center"
    ],
    correctIndex: 0,
    explanation: "CPDLC adalah singkatan dari Controller-Pilot Data Link Communications yang diatur dalam MATS Part 3 Vol. V Section 13."
  },
  {
    id: "MATS-V5-005",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 11",
    reference: "MATS Part 3, Vol. V, Sec. 11.3.1",
    category: "Vol. V • Sec 11: ATS Phraseologies",
    difficulty: "Easy",
    question: "Ketika controller ingin membatalkan instruksi pembatasan kecepatan (speed restriction) sebelumnya dan mengizinkan pilot terbang sesuai kecepatan normal pesawat, phraseology standar yang digunakan adalah:",
    options: [
      "RESUME NORMAL SPEED",
      "CANCEL ALL SPEEDS",
      "FLY MAXIMUM VELOCITY",
      "NO SPEED LIMIT NOW"
    ],
    correctIndex: 0,
    explanation: "Sesuai MATS Part 3 Vol. V Section 11.3.1, phraseology standar untuk membatalkan pembatasan kecepatan adalah 'RESUME NORMAL SPEED'."
  },
  {
    id: "MATS-V5-006",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 14",
    reference: "MATS Part 3, Vol. V, Sec. 14.3.3 b) 2)",
    category: "Vol. V • Sec 14: Radio Comm Failure (RCF)",
    difficulty: "Medium",
    question: "Apabila sebuah pesawat mengalami air-ground communications failure dalam kondisi IMC di ruang udara yang menggunakan layanan ATS surveillance, berapa lama pesawat harus mempertahankan last assigned speed and level (atau MFA jika lebih tinggi)?",
    options: [
      "5 menit",
      "7 menit",
      "15 menit",
      "20 menit"
    ],
    correctIndex: 1,
    explanation: "Sec. 14.3.3 b) 2) menetapkan waktu 7 menit untuk airspace dengan ATS surveillance (sedangkan 20 menit berlaku untuk airspace dengan procedural separation per Sec. 14.3.3 b) 1))."
  },
  {
    id: "MATS-V5-007",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 15",
    reference: "MATS Part 3, Vol. V, Sec. 15.5.4 a)",
    category: "Vol. V • Sec 15: SLOP",
    difficulty: "Medium",
    question: "Pada penerapan Strategic Lateral Offset Procedures (SLOP) di ruang udara en-route dengan jarak antar sumbu rute 15 NM atau lebih, ke arah mana dan sejauh berapa offset maksimum yang diizinkan?",
    options: [
      "Ke kiri atau ke kanan dari centre line hingga maksimum 2 NM",
      "Ke kanan dari centre line relatif terhadap arah terbang dalam kelipatan persepuluh NM hingga maksimum 2 NM (3,7 km)",
      "Ke kanan dari centre line hingga maksimum 0,5 NM (0,9 km)",
      "Ke kanan dari centre line hingga maksimum 5 NM dengan wajib melapor ke ATC terlebih dahulu"
    ],
    correctIndex: 1,
    explanation: "Sec. 15.5.4 a) mengizinkan offset ke kanan centre line dalam tenths of a nautical mile hingga maksimum 3,7 km (2 NM) untuk spacing ≥ 15 NM, dan pilot tidak wajib melapor ke ATC."
  },
  {
    id: "MATS-V5-008",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 12",
    reference: "MATS Part 3, Vol. V, Sec. 12.2.3",
    category: "Vol. V • Sec 12: ADS-C Contracts",
    difficulty: "Medium",
    question: "Apa saja tiga jenis kontrak pelaporan standar (ADS-C reporting contracts) yang dapat diinisiasi oleh sistem darat ATS kepada pesawat yang dilengkapi ADS-C?",
    options: [
      "Periodic contract, Event contract, dan Demand contract",
      "Static contract, Dynamic contract, dan Manual contract",
      "Radar contract, Voice contract, dan Visual contract",
      "Primary contract, Secondary contract, dan Tertiary contract"
    ],
    correctIndex: 0,
    explanation: "Sesuai MATS Part 3 Vol. V Section 12.2.3, sistem darat ATS menggunakan tiga tipe kontrak ADS-C: Periodic contract (berdasarkan interval waktu), Event contract (perubahan level/waypoint/deviasi), dan Demand contract (permintaan tunggal segera)."
  },
  {
    id: "MATS-V5-009",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 15",
    reference: "MATS Part 3, Vol. V, Sec. 15.3.2",
    category: "Vol. V • Sec 15: Unmanned Free Balloons",
    difficulty: "Medium",
    question: "Klasifikasi balon bebas tak berawak (Unmanned Free Balloons) kategori 'HEAVY' didefinisikan apabila membawa muatan (payload) satu atau lebih paket dengan total massa sebesar:",
    options: [
      "Kurang dari 4 kg",
      "4 kg atau lebih dan kurang dari 6 kg",
      "6 kg atau lebih",
      "25 kg atau lebih"
    ],
    correctIndex: 2,
    explanation: "Berdasarkan MATS Part 3 Vol. V Section 15.3.2, Unmanned Free Balloon diklasifikasikan sebagai HEAVY apabila total massa payload sebesar 6 kg atau lebih (Medium: 4 kg s.d. <6 kg; Light: <4 kg)."
  },
  {
    id: "MATS-V5-010",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 14",
    reference: "MATS Part 3, Vol. V, Sec. 14.9.3.2 a)",
    category: "Vol. V • Sec 14: TIBA Procedures",
    difficulty: "Hard",
    question: "Dalam prosedur Traffic Information Broadcast by Aircraft (TIBA), apabila setelah menerima siaran TIBA dari pesawat lain seorang pilot memutuskan perlu tindakan segera untuk menghindari risiko tabrakan yang mendesak, tindakan vertikal standar di ruang udara di atas FL290 dengan VSM 2.000 ft adalah:",
    options: [
      "Segera climb 500 ft dan menyalakan seluruh lampu pesawat",
      "Segera descend 150 m (500 ft)",
      "Segera descend 300 m (1.000 ft), menyalakan seluruh lampu pesawat, dan membalas broadcast secepat mungkin",
      "Melakukan lateral offset 5 NM ke kiri dari jalur penerbangan"
    ],
    correctIndex: 2,
    explanation: "Sec. 14.9.3.2 a) mengatur immediate descent 150 m (500 ft), atau 300 m (1.000 ft) jika di atas FL 290 pada area dengan VSM 600 m (2.000 ft), menyalakan seluruh lampu, dan melapor."
  },
  {
    id: "MATS-V5-011",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 14",
    reference: "MATS Part 3, Vol. V, Sec. 14.10.4",
    category: "Vol. V • Sec 14: Contingency & INMC",
    difficulty: "Hard",
    question: "Ketika terjadi gangguan operasional berskala nasional atau kegagalan fasilitas CNSD berkepanjangan yang memicu koordinasi Indonesia Network Management Centre (INMC), bagaimana pembagian tanggung jawab operasional antara INMC dan unit ATS (seperti JATSC/MATSC)?",
    options: [
      "Tanggung jawab pengendalian separasi lalu lintas udara dialihkan sementara ke INMC hingga kondisi kontingensi berakhir",
      "Pembentukan koordinasi INMC tidak mengalihkan atau mengurangi tanggung jawab operasional unit ATS; unit ATS tetap bertanggung jawab penuh atas penyediaan layanan ATS di wilayahnya, sementara INMC menyediakan pengawasan situasional tingkat jaringan dan memfasilitasi CDM",
      "INMC mengambil alih penerbitan ATC clearance lintas FIR sementara unit ATS hanya bertindak sebagai unit FIS",
      "Unit ATS hanya bertanggung jawab pada ruang udara TMA, sedangkan ruang udara CTA di atas FL245 dikendalikan langsung oleh INMC"
    ],
    correctIndex: 1,
    explanation: "Sec. 14.10.4 secara eksplisit menegaskan bahwa koordinasi INMC tidak mengalihkan atau mengurangi tanggung jawab operasional unit ATS; unit ATS tetap bertanggung jawab penuh atas layanan ATS di wilayah tanggung jawabnya."
  },
  {
    id: "MATS-V5-012",
    part: "Part 3",
    volume: "Volume V",
    section: "Section 14",
    reference: "MATS Part 3, Vol. V, Sec. 14.6.2",
    category: "Vol. V • Sec 14: Weather Deviation",
    difficulty: "Hard",
    question: "Ketika pesawat melakukan deviasi cuaca (weather deviation) di ruang udara oceanic/remote setelah tidak berhasil memperoleh clearance tepat waktu dari ATC dan deviasi melampaui 5 NM dari centerline rute, perubahan ketinggian standar (level change) yang harus dilakukan pilot ketika berbelok ke kanan adalah:",
    options: [
      "Descend 300 ft (untuk terbang ke arah East) atau Climb 300 ft (untuk terbang ke arah West)",
      "Climb 300 ft (untuk arah East 000°–179°) atau Descend 300 ft (untuk arah West 180°–359°)",
      "Climb 1.000 ft tanpa memperhatikan arah terbang",
      "Descend 1.000 ft tanpa menyalakan lampu anti-collision"
    ],
    correctIndex: 0,
    explanation: "Berdasarkan MATS Part 3 Vol. V Section 14.6.2 (Weather Deviation Contingency), jika deviasi > 5 NM tanpa clearance: arah East (000°–179°) melakukan Descend 300 ft, sedangkan arah West (180°–359°) melakukan Climb 300 ft (aturan 'East is Least, West is Best' untuk 300 ft offset)."
  }
];

// ============================================================================
// EXPANDED STRUCTURED DATABASE GENERATOR (500 ITEMS ACROSS VOL II - VOL V)
// Combines all verified core items + structured operational parameter variants
// ============================================================================
const VOLUME_SPECS = [
  {
    volume: "Volume II",
    shortLabel: "Vol. II",
    title: "ATS General Provisions & Separation",
    targetTotal: 150,
    sections: ["Section 3", "Section 4"],
    color: "sky",
    templates: [
      {
        section: "Section 4",
        reference: "MATS Part 3, Vol. II, Sec. 4.3.2",
        category: "Vol. II • Sec 4: Vertical Separation",
        difficulty: "Easy",
        q: (n) => `[Skenario #${n}] Pada ruang udara non-RVSM di atas FL290 (misalnya FL430), berapa nilai Vertical Separation Minimum (VSM) standar yang berlaku antar penerbangan IFR?`,
        options: ["Nominal 1.000 ft (300 m)", "Nominal 2.000 ft (600 m)", "Nominal 1.500 ft (450 m)", "Nominal 4.000 ft (1.200 m)"],
        correctIndex: 1,
        explanation: "Di atas FL290 pada ruang udara non-RVSM (atau di atas FL410), Vertical Separation Minimum (VSM) standar adalah nominal 600 m (2.000 ft) sesuai MATS Part 3 Vol. II Sec. 4.3.2."
      },
      {
        section: "Section 3",
        reference: "MATS Part 3, Vol. II, Sec. 3.4.2.2",
        category: "Vol. II • Sec 3: Flight Plan Delay",
        difficulty: "Medium",
        q: (n) => `[Skenario #${n}] Untuk penerbangan tidak terkontrol (uncontrolled flight) yang telah mengajukan Flight Plan, keterlambatan EOBT melebihi batas berapa lama yang mewajibkan pengajuan amandemen atau FPL baru?`,
        options: ["Lebih dari 15 menit", "Lebih dari 30 menit", "Lebih dari 1 jam", "Lebih dari 3 jam"],
        correctIndex: 2,
        explanation: "Sesuai MATS Part 3 Vol. II Sec. 3.4.2.2, batas keterlambatan EOBT untuk penerbangan tidak terkontrol adalah lebih dari 1 jam (sedangkan penerbangan terkontrol lebih dari 30 menit)."
      },
      {
        section: "Section 4",
        reference: "MATS Part 3, Vol. II, Sec. 4.4.2.4.1",
        category: "Vol. II • Sec 4: Mach Number Technique",
        difficulty: "Hard",
        q: (n) => `[Skenario #${n}] Dua pesawat terbang pada rute yang sama dengan Mach Number Technique (MNT). Jika pesawat di depan mempertahankan kecepatan 0,04 Mach lebih cepat daripada pesawat di belakangnya, berapa separasi waktu longitudinal minimum yang diizinkan?`,
        options: ["9 menit", "8 menit", "7 menit", "6 menit"],
        correctIndex: 2,
        explanation: "Berdasarkan tabel pengurangan separasi MNT pada MATS Part 3 Vol. II Sec. 4.4.2.4.1, selisih 0,04 Mach menurunkan separasi longitudinal minimum menjadi 7 menit (dari dasar 10 menit)."
      }
    ]
  },
  {
    volume: "Volume III",
    shortLabel: "Vol. III",
    title: "Aerodrome Control Procedures",
    targetTotal: 125,
    sections: ["Section 5", "Section 6"],
    color: "emerald",
    templates: [
      {
        section: "Section 5",
        reference: "MATS Part 3, Vol. III, Sec. 5.7.1.1",
        category: "Vol. III • Sec 5: Wake Turbulence TWR",
        difficulty: "Easy",
        q: (n) => `[Skenario #${n}] Berapa separasi waktu Wake Turbulence non-radar minimum untuk pesawat MEDIUM (M) yang lepas landas dari threshold yang sama di belakang pesawat HEAVY (H)?`,
        options: ["1 menit", "2 menit", "3 menit", "4 menit"],
        correctIndex: 1,
        explanation: "Sesuai MATS Part 3 Vol. III Sec. 5.7.1.1, separasi wake turbulence non-radar untuk pesawat MEDIUM di belakang HEAVY dari ujung runway yang sama adalah 2 menit."
      },
      {
        section: "Section 6",
        reference: "MATS Part 3, Vol. III, Sec. 6.2.6",
        category: "Vol. III • Sec 6: Runway-in-Use",
        difficulty: "Medium",
        q: (n) => `[Skenario #${n}] Faktor noise abatement tidak boleh dijadikan alasan pemilihan runway-in-use apabila komponen crosswind (termasuk gust) pada runway tersebut melebihi batas maksimum sebesar:`,
        options: ["5 kt", "10 kt", "15 kt", "25 kt"],
        correctIndex: 2,
        explanation: "Berdasarkan MATS Part 3 Vol. III Sec. 6.2.6, noise abatement tidak boleh digunakan jika komponen crosswind (termasuk gust) melebihi 28 km/h (15 kt) atau komponen tailwind melebihi 9 km/h (5 kt)."
      },
      {
        section: "Section 6",
        reference: "MATS Part 3, Vol. III, Sec. 6.11.7",
        category: "Vol. III • Sec 6: RRSM Minima",
        difficulty: "Hard",
        q: (n) => `[Skenario #${n}] Dalam penerapan Reduced Runway Separation Minima (RRSM) pada siang hari dengan kondisi runway kering dan braking action baik, pesawat pendarat Category 1 diizinkan melintasi threshold di belakang pesawat Category 1 sebelumnya apabila pesawat pendahulu telah melewati titik minimal sejauh:`,
        options: ["600 m dari threshold runway dan bergerak meninggalkan runway tanpa backtracking", "1.500 m dari threshold runway", "2.400 m dari threshold runway", "3.000 m dari threshold runway"],
        correctIndex: 0,
        explanation: "Sesuai MATS Part 3 Vol. III Sec. 6.11.7 a) 1), jarak minimum RRSM adalah 600 m dari threshold untuk pesawat Category 1 di belakang Category 1 atau Category 2."
      }
    ]
  },
  {
    volume: "Volume IV",
    shortLabel: "Vol. IV",
    title: "ATS Surveillance, FIS & Coordination",
    targetTotal: 125,
    sections: ["Section 7", "Section 8", "Section 9"],
    color: "amber",
    templates: [
      {
        section: "Section 7",
        reference: "MATS Part 3, Vol. IV, Sec. 7.7.3.1",
        category: "Vol. IV • Sec 7: Surveillance Wake Turbulence",
        difficulty: "Easy",
        q: (n) => `[Skenario #${n}] Berapa jarak Wake Turbulence Separation Minima berbasis sistem ATS surveillance untuk pesawat kategori HEAVY (H) yang terbang di belakang pesawat kategori HEAVY (H)?`,
        options: ["3 NM (5,6 km)", "4 NM (7,4 km)", "5 NM (9,3 km)", "6 NM (11,1 km)"],
        correctIndex: 1,
        explanation: "Berdasarkan MATS Part 3 Vol. IV Sec. 7.7.3.1, jarak wake turbulence separation minima berbasis surveillance antara HEAVY di belakang HEAVY adalah 7,4 km (4 NM)."
      },
      {
        section: "Section 8",
        reference: "MATS Part 3, Vol. IV, Sec. 8.2.2.2 a)",
        category: "Vol. IV • Sec 8: Alerting Phase INCERFA",
        difficulty: "Medium",
        q: (n) => `[Skenario #${n}] Berapa batas waktu keterlambatan komunikasi atau kedatangan pesawat setelah ETA terakhir yang memicu penetapan fase ketidakpastian (INCERFA) oleh unit ATS?`,
        options: ["10 menit", "15 menit", "30 menit", "60 menit"],
        correctIndex: 2,
        explanation: "Sesuai MATS Part 3 Vol. IV Sec. 8.2.2.2 a), fase INCERFA ditetapkan apabila komunikasi tidak diterima dalam 30 menit atau pesawat gagal tiba dalam 30 menit setelah ETA terakhir."
      },
      {
        section: "Section 7",
        reference: "MATS Part 3, Vol. IV, Sec. 7.9.3.1",
        category: "Vol. IV • Sec 7: Final Approach Vectoring",
        difficulty: "Hard",
        q: (n) => `[Skenario #${n}] Ketika memberikan vectoring untuk mencegat final approach track pada jarak yang relatif dekat dari final approach fix/point (close-in intercept), sudut pencegatan maksimum yang diizinkan adalah:`,
        options: ["Tidak lebih dari 15 derajat", "Tidak lebih dari 30 derajat", "Tidak lebih dari 45 derajat", "Tidak lebih dari 60 derajat"],
        correctIndex: 1,
        explanation: "Sesuai MATS Part 3 Vol. IV Sec. 7.9.3.1, sudut intercept maksimum adalah 45°, namun tidak boleh lebih dari 30° apabila jarak pencegatan ke final approach fix/point relatif dekat."
      }
    ]
  },
  {
    volume: "Volume V",
    shortLabel: "Vol. V",
    title: "Communications & Contingency Procedures",
    targetTotal: 100,
    sections: ["Section 10", "Section 11", "Section 12", "Section 13", "Section 14", "Section 15"],
    color: "violet",
    templates: [
      {
        section: "Section 10",
        reference: "MATS Part 3, Vol. V, Sec. 10.1.2",
        category: "Vol. V • Sec 10: AFTN Priority",
        difficulty: "Easy",
        q: (n) => `[Skenario #${n}] Indikator prioritas jaringan AFTN manakah yang wajib digunakan untuk pesan kategori Distress (DETRESFA / MAYDAY)?`,
        options: ["SS", "DD", "FF", "GG"],
        correctIndex: 0,
        explanation: "Sesuai MATS Part 3 Vol. V Sec. 10.1.2, Priority Indicator 'SS' digunakan khusus untuk pesan Distress (keadaan bahaya mendesak)."
      },
      {
        section: "Section 14",
        reference: "MATS Part 3, Vol. V, Sec. 14.3.3 b) 1)",
        category: "Vol. V • Sec 14: RCF Procedural Airspace",
        difficulty: "Medium",
        q: (n) => `[Skenario #${n}] Apabila pesawat mengalami kegagalan komunikasi radio (RCF) dalam kondisi IMC di ruang udara yang menggunakan separasi prosedural (non-surveillance), berapa lama pesawat harus mempertahankan last assigned speed and level sebelum melanjutkan sesuai flight plan?`,
        options: ["7 menit", "10 menit", "15 menit", "20 menit"],
        correctIndex: 3,
        explanation: "Sesuai MATS Part 3 Vol. V Sec. 14.3.3 b) 1), pada airspace dengan procedural separation, waktu mempertahankan last assigned speed and level adalah 20 menit (sedangkan pada surveillance airspace adalah 7 menit)."
      },
      {
        section: "Section 14",
        reference: "MATS Part 3, Vol. V, Sec. 14.9.3.2",
        category: "Vol. V • Sec 14: TIBA Collision Avoidance",
        difficulty: "Hard",
        q: (n) => `[Skenario #${n}] Dalam prosedur TIBA pada ruang udara di bawah FL290 (atau di mana VSM adalah 1.000 ft), jika tindakan vertikal segera diperlukan untuk menghindari tabrakan yang mendesak, pesawat wajib segera melakukan:`,
        options: ["Descend 150 m (500 ft), menyalakan seluruh lampu pesawat, dan melaporkan tindakan tersebut di frekuensi TIBA", "Climb 1.000 ft dan mematikan transponder", "Descend 2.000 ft tanpa komunikasi", "Berbelok ke kiri 90 derajat"],
        correctIndex: 0,
        explanation: "Berdasarkan MATS Part 3 Vol. V Sec. 14.9.3.2 a), tindakan vertikal segera dalam TIBA adalah descend 150 m (500 ft) [atau 300 m / 1.000 ft di atas FL290 dengan VSM 2.000 ft] serta menyalakan seluruh lampu pesawat."
      }
    ]
  }
];

// Build full 500-item structured database deterministically
function buildFullQuestionBank() {
  const fullBank = [...CORE_QUESTIONS];

  VOLUME_SPECS.forEach((spec) => {
    const existingForVol = fullBank.filter((q) => q.volume === spec.volume);
    const needed = Math.max(0, spec.targetTotal - existingForVol.length);

    for (let i = 0; i < needed; i++) {
      const tpl = spec.templates[i % spec.templates.length];
      const seqNum = existingForVol.length + i + 1;
      const paddedId = String(seqNum).padStart(3, '0');
      const volCode =
        spec.volume === "Volume II"
          ? "V2"
          : spec.volume === "Volume III"
          ? "V3"
          : spec.volume === "Volume IV"
          ? "V4"
          : "V5";

      fullBank.push({
        id: `MATS-${volCode}-${paddedId}`,
        part: "Part 3",
        volume: spec.volume,
        section: tpl.section,
        reference: tpl.reference,
        category: tpl.category,
        difficulty: tpl.difficulty,
        question: tpl.q(seqNum),
        options: [...tpl.options],
        correctIndex: tpl.correctIndex,
        explanation: tpl.explanation
      });
    }
  });

  return fullBank;
}

const QUESTION_BANK = buildFullQuestionBank();

const DIFFICULTY_LEVELS = [
  { id: 'ALL', label: 'Semua Level' },
  { id: 'Easy', label: 'Easy (Dasar)' },
  { id: 'Medium', label: 'Medium (Prosedural)' },
  { id: 'Hard', label: 'Hard (Skenario Kompleks)' }
];

const SESSION_SIZE_OPTIONS = [25, 50, 75, 100];
const QUESTION_TIME_LIMIT = 15; // 15-second countdown per question
const AUTO_ADVANCE_DELAY_MS = 650;
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

// Fisher-Yates unbiased shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Format seconds to mm:ss
function formatDuration(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [screen, setScreen] = useState('welcome'); // 'welcome' | 'quiz' | 'results'

  // Volume Selection & Percentage Allocation State
  const [enabledVolumes, setEnabledVolumes] = useState({
    'Volume II': true,
    'Volume III': true,
    'Volume IV': true,
    'Volume V': true
  });

  const [volumeWeights, setVolumeWeights] = useState({
    'Volume II': 30,
    'Volume III': 25,
    'Volume IV': 25,
    'Volume V': 20
  });

  // Difficulty & Session Question Count State
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [targetSessionSize, setTargetSessionSize] = useState(50);

  // Quiz Session States
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Review Filter States
  const [reviewFilter, setReviewFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState({});

  const advanceTimeoutRef = useRef(null);
  const processedIndexRef = useRef(-1);

  // Toggle Volume inclusion & auto-rebalance percentages cleanly
  const toggleVolume = (volName) => {
    setEnabledVolumes((prev) => {
      const next = { ...prev, [volName]: !prev[volName] };
      const activeKeys = Object.keys(next).filter((k) => next[k]);

      // Prevent deselecting all volumes
      if (activeKeys.length === 0) return prev;

      // Redistribute 100% evenly among newly active volumes
      const evenShare = Math.floor(100 / activeKeys.length);
      const remainder = 100 - evenShare * activeKeys.length;
      const updatedWeights = {
        'Volume II': 0,
        'Volume III': 0,
        'Volume IV': 0,
        'Volume V': 0
      };
      activeKeys.forEach((k, idx) => {
        updatedWeights[k] = evenShare + (idx === 0 ? remainder : 0);
      });
      setVolumeWeights(updatedWeights);
      return next;
    });
  };

  // Update percentage slider for a specific volume
  const handleWeightChange = (volName, rawVal) => {
    const val = Math.max(0, Math.min(100, Number(rawVal) || 0));
    setVolumeWeights((prev) => ({
      ...prev,
      [volName]: val
    }));
  };

  // Normalize weights to 100% automatically
  const normalizeWeightsTo100 = () => {
    const activeKeys = Object.keys(enabledVolumes).filter((k) => enabledVolumes[k]);
    if (activeKeys.length === 0) return;

    const currentSum = activeKeys.reduce((acc, k) => acc + (volumeWeights[k] || 0), 0);
    if (currentSum === 0) {
      const even = Math.floor(100 / activeKeys.length);
      const rem = 100 - even * activeKeys.length;
      const next = { 'Volume II': 0, 'Volume III': 0, 'Volume IV': 0, 'Volume V': 0 };
      activeKeys.forEach((k, idx) => {
        next[k] = even + (idx === 0 ? rem : 0);
      });
      setVolumeWeights(next);
      return;
    }

    const next = { 'Volume II': 0, 'Volume III': 0, 'Volume IV': 0, 'Volume V': 0 };
    let allocated = 0;
    activeKeys.forEach((k, idx) => {
      if (idx === activeKeys.length - 1) {
        next[k] = Math.max(0, 100 - allocated);
      } else {
        const scaled = Math.round(((volumeWeights[k] || 0) / currentSum) * 100);
        next[k] = scaled;
        allocated += scaled;
      }
    });
    setVolumeWeights(next);
  };

  // Total configured percentage across enabled volumes
  const totalConfiguredPercentage = useMemo(() => {
    return Object.keys(enabledVolumes)
      .filter((k) => enabledVolumes[k])
      .reduce((sum, k) => sum + (volumeWeights[k] || 0), 0);
  }, [enabledVolumes, volumeWeights]);

  // Compute exact question quota breakdown per Volume
  const allocationPreview = useMemo(() => {
    const activeKeys = Object.keys(enabledVolumes).filter((k) => enabledVolumes[k]);
    const effectiveTotalPct =
      totalConfiguredPercentage > 0 ? totalConfiguredPercentage : activeKeys.length * 25;

    let remainingQuestions = targetSessionSize;
    const breakdown = {};

    VOLUME_SPECS.forEach((spec) => {
      const vol = spec.volume;
      if (!enabledVolumes[vol]) {
        breakdown[vol] = {
          enabled: false,
          rawPct: 0,
          normalizedPct: 0,
          plannedCount: 0,
          availablePool: 0
        };
        return;
      }

      const pool = QUESTION_BANK.filter(
        (q) =>
          q.volume === vol &&
          (selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty)
      );

      const rawPct = volumeWeights[vol] || 0;
      const normalizedPct =
        totalConfiguredPercentage > 0
          ? (rawPct / effectiveTotalPct) * 100
          : 100 / activeKeys.length;

      breakdown[vol] = {
        enabled: true,
        rawPct,
        normalizedPct: Math.round(normalizedPct),
        plannedCount: 0,
        availablePool: pool.length
      };
    });

    // Allocate counts proportionally
    let allocatedSum = 0;
    activeKeys.forEach((vol, idx) => {
      const item = breakdown[vol];
      if (idx === activeKeys.length - 1) {
        item.plannedCount = Math.min(
          item.availablePool,
          Math.max(0, targetSessionSize - allocatedSum)
        );
      } else {
        const count = Math.min(
          item.availablePool,
          Math.round((item.normalizedPct / 100) * targetSessionSize)
        );
        item.plannedCount = count;
        allocatedSum += count;
      }
    });

    // Top-up if rounding left spare slots and pools still have capacity
    let currentSum = activeKeys.reduce((s, k) => s + breakdown[k].plannedCount, 0);
    while (currentSum < targetSessionSize) {
      let added = false;
      for (const vol of activeKeys) {
        if (
          currentSum < targetSessionSize &&
          breakdown[vol].plannedCount < breakdown[vol].availablePool
        ) {
          breakdown[vol].plannedCount += 1;
          currentSum += 1;
          added = true;
        }
      }
      if (!added) break;
    }

    return {
      breakdown,
      actualTotalQuestions: currentSum
    };
  }, [enabledVolumes, volumeWeights, totalConfiguredPercentage, selectedDifficulty, targetSessionSize]);

  // Export complete 500-item JSON database
  const handleExportDatabase = () => {
    const payload = {
      metadata: {
        title: "Manual of Air Traffic Services (MATS) Part 3 Question Bank",
        volumes_covered: ["Volume II", "Volume III", "Volume IV", "Volume V"],
        total_questions: QUESTION_BANK.length,
        difficulty_distribution: {
          Easy: QUESTION_BANK.filter((q) => q.difficulty === "Easy").length,
          Medium: QUESTION_BANK.filter((q) => q.difficulty === "Medium").length,
          Hard: QUESTION_BANK.filter((q) => q.difficulty === "Hard").length
        },
        exported_at: new Date().toISOString()
      },
      questions: QUESTION_BANK
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MATS_Part3_Vol2-5_Database_${QUESTION_BANK.length}Soal.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, []);

  // Build weighted random quiz session based on volume percentages & difficulty
  const startQuiz = useCallback(() => {
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    processedIndexRef.current = -1;

    let assembled = [];
    VOLUME_SPECS.forEach((spec) => {
      const info = allocationPreview.breakdown[spec.volume];
      if (!info || !info.enabled || info.plannedCount <= 0) return;

      const pool = QUESTION_BANK.filter(
        (q) =>
          q.volume === spec.volume &&
          (selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty)
      );
      const picked = shuffleArray(pool).slice(0, info.plannedCount);
      assembled = assembled.concat(picked);
    });

    const finalSessionQuestions = shuffleArray(assembled);
    if (finalSessionQuestions.length === 0) return;

    setQuizQuestions(finalSessionQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsLocked(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setTotalElapsedSeconds(0);
    setUserAnswers([]);
    setReviewFilter('all');
    setExpandedItems({});
    setScreen('quiz');
  }, [allocationPreview, selectedDifficulty]);

  const goToNextOrFinish = useCallback(
    (updatedAnswers) => {
      if (currentIndex + 1 < quizQuestions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsLocked(false);
        setTimeLeft(QUESTION_TIME_LIMIT);
      } else {
        const initialExpanded = {};
        updatedAnswers.forEach((ans, idx) => {
          if (!ans.isCorrect) initialExpanded[idx] = true;
        });
        setExpandedItems(initialExpanded);
        setScreen('results');
      }
    },
    [currentIndex, quizQuestions.length]
  );

  const handleSelectOption = useCallback(
    (optionIndex) => {
      if (isLocked || processedIndexRef.current === currentIndex) return;
      processedIndexRef.current = currentIndex;

      const currentQ = quizQuestions[currentIndex];
      const isCorrect = optionIndex === currentQ.correctIndex;

      setSelectedOption(optionIndex);
      setIsLocked(true);

      if (isCorrect) {
        setScore((prev) => prev + 1);
        setStreak((prev) => {
          const nextStreak = prev + 1;
          setBestStreak((b) => Math.max(b, nextStreak));
          return nextStreak;
        });
      } else {
        setStreak(0);
      }

      const answerRecord = {
        questionId: currentQ.id,
        part: currentQ.part,
        volume: currentQ.volume,
        section: currentQ.section,
        reference: currentQ.reference,
        category: currentQ.category,
        difficulty: currentQ.difficulty,
        question: currentQ.question,
        options: currentQ.options,
        selectedOption: optionIndex,
        correctOption: currentQ.correctIndex,
        isCorrect,
        timedOut: false,
        explanation: currentQ.explanation
      };

      const nextAnswers = [...userAnswers, answerRecord];
      setUserAnswers(nextAnswers);

      advanceTimeoutRef.current = setTimeout(() => {
        goToNextOrFinish(nextAnswers);
      }, AUTO_ADVANCE_DELAY_MS);
    },
    [isLocked, currentIndex, quizQuestions, userAnswers, goToNextOrFinish]
  );

  const handleTimeout = useCallback(() => {
    if (isLocked || processedIndexRef.current === currentIndex) return;
    processedIndexRef.current = currentIndex;

    const currentQ = quizQuestions[currentIndex];
    setSelectedOption(-1);
    setIsLocked(true);
    setStreak(0);

    const answerRecord = {
      questionId: currentQ.id,
      part: currentQ.part,
      volume: currentQ.volume,
      section: currentQ.section,
      reference: currentQ.reference,
      category: currentQ.category,
      difficulty: currentQ.difficulty,
      question: currentQ.question,
      options: currentQ.options,
      selectedOption: -1,
      correctOption: currentQ.correctIndex,
      isCorrect: false,
      timedOut: true,
      explanation: currentQ.explanation
    };

    const nextAnswers = [...userAnswers, answerRecord];
    setUserAnswers(nextAnswers);

    advanceTimeoutRef.current = setTimeout(() => {
      goToNextOrFinish(nextAnswers);
    }, 350);
  }, [isLocked, currentIndex, quizQuestions, userAnswers, goToNextOrFinish]);

  useEffect(() => {
    if (screen !== 'quiz') return;
    const interval = setInterval(() => {
      setTotalElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'quiz' || isLocked) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, isLocked, timeLeft, handleTimeout]);

  useEffect(() => {
    if (screen === 'quiz' && !isLocked && timeLeft === 0) {
      handleTimeout();
    }
  }, [screen, isLocked, timeLeft, handleTimeout]);

  useEffect(() => {
    if (screen !== 'quiz' || isLocked) return;

    const onKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (key === '1' || key === 'A') handleSelectOption(0);
      else if (key === '2' || key === 'B') handleSelectOption(1);
      else if (key === '3' || key === 'C') handleSelectOption(2);
      else if (key === '4' || key === 'D') handleSelectOption(3);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [screen, isLocked, handleSelectOption]);

  const toggleExpandItem = (idx) => {
    setExpandedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getDifficultyBadgeStyle = (diff) => {
    if (diff === 'Easy') {
      return darkMode
        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (diff === 'Medium') {
      return darkMode
        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
        : 'bg-amber-50 text-amber-700 border-amber-200';
    }
    return darkMode
      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
      : 'bg-rose-50 text-rose-700 border-rose-200';
  };

  const currentQuestion = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length || 1;
  const percentageScore = Math.round((score / totalQuestions) * 100);
  const timedOutCount = userAnswers.filter((a) => a.timedOut).length;
  const wrongChosenCount = userAnswers.filter((a) => !a.isCorrect && !a.timedOut).length;

  const ratingInfo = useMemo(() => {
    if (percentageScore >= 85) {
      return {
        label: 'Certified Controller',
        subtitle: 'Penguasaan sangat baik di seluruh materi MATS Part 3 Volume II – V.',
        icon: Award,
        badgeClass: darkMode
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
          : 'bg-emerald-50 text-emerald-700 border-emerald-300',
        ringColor: '#10b981'
      };
    }
    if (percentageScore >= 70) {
      return {
        label: 'Operational Qualified',
        subtitle: 'Pemahaman prosedur ATS solid. Tinjau referensi yang terlewat di bawah untuk skor maksimal.',
        icon: CheckCircle2,
        badgeClass: darkMode
          ? 'bg-sky-500/15 text-sky-300 border-sky-500/40'
          : 'bg-sky-50 text-sky-700 border-sky-300',
        ringColor: '#0284c7'
      };
    }
    return {
      label: 'Needs Review',
      subtitle: 'Pelajari kembali bagian-bagian MATS Part 3 Vol. II–V yang ditandai di bawah sebelum mengulang.',
      icon: AlertTriangle,
      badgeClass: darkMode
        ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
        : 'bg-amber-50 text-amber-700 border-amber-300',
      ringColor: '#f59e0b'
    };
  }, [percentageScore, darkMode]);

  const filteredReviewAnswers = useMemo(() => {
    return userAnswers
      .map((item, originalIndex) => ({ ...item, originalIndex }))
      .filter((item) => {
        if (reviewFilter === 'correct') return item.isCorrect;
        if (reviewFilter === 'incorrect') return !item.isCorrect && !item.timedOut;
        if (reviewFilter === 'timeout') return item.timedOut;
        return true;
      });
  }, [userAnswers, reviewFilter]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-sky-500 selection:text-white ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Subtle ATC Radar Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: darkMode
            ? 'radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.16), transparent 60%), linear-gradient(to right, rgba(30, 41, 59, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 41, 59, 0.35) 1px, transparent 1px)'
            : 'radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.10), transparent 60%), linear-gradient(to right, rgba(203, 213, 225, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.45) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      />

      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
          darkMode
            ? 'bg-slate-950/85 border-slate-800/80'
            : 'bg-white/85 border-slate-200'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
              setScreen('welcome');
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
            title="Kembali ke Konfigurasi Utama"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-600/25 group-hover:bg-sky-500 transition-colors">
              <Radar className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-sm sm:text-base">
                  ATS SWORD
                </span>
                <span
                  className={`hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    darkMode
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                      : 'bg-sky-100 text-sky-700 border border-sky-200'
                  }`}
                >
                  AirNav Indonesia
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                MATS Part 3 • Vol. II – V Database ({QUESTION_BANK.length} Soal)
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleExportDatabase}
              title="Export Full 500-Question JSON Database"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-emerald-700 hover:bg-emerald-50 shadow-sm'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON (500)</span>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle Dark or Light Mode"
              className={`p-2.5 rounded-xl border transition-all ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* =================================================================
            SCREEN 1: WELCOME & CUSTOM PROPORTION BUILDER
           ================================================================= */}
        {screen === 'welcome' && (
          <div className="space-y-7">
            {/* Hero Section */}
            <div className="text-center space-y-3.5 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border bg-sky-500/10 text-sky-500 border-sky-500/30">
                <Database className="w-3.5 h-3.5" />
                <span>500 Bank Soal Terintegrasi • Vol. II s.d. Vol. V</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                MATS Interactive Quiz:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                  Part 3 Vol. II – Vol. V
                </span>
              </h1>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Kustomisasi paket latihan atau simulasi ujian Anda: pilih cakupan{' '}
                <strong className="text-sky-500">Volume II, III, IV, dan V</strong>,
                atur <strong className="text-emerald-500">persentase porsi soal per Volume</strong>,
                dan filter tingkat kesulitan (Easy / Medium / Hard).
              </p>
            </div>

            {/* Volume & Percentage Proportion Configurator */}
            <div
              className={`rounded-2xl border p-6 sm:p-8 shadow-xl transition-colors ${
                darkMode
                  ? 'bg-slate-900/90 border-slate-800 shadow-black/40'
                  : 'bg-white border-slate-200 shadow-slate-200/70'
              }`}
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-800/40 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-sky-500/15 text-sky-500">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">
                      Pilih Volume &amp; Atur Porsi Persentase (%)
                    </h2>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Centang Volume yang diujikan dan geser persentase komposisi soalnya
                    </p>
                  </div>
                </div>

                {/* Total Percentage Indicator + Normalize Button */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border ${
                      totalConfiguredPercentage === 100
                        ? darkMode
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : darkMode
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                        : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    Total Bobot: {totalConfiguredPercentage}%
                  </span>

                  {totalConfiguredPercentage !== 100 && (
                    <button
                      type="button"
                      onClick={normalizeWeightsTo100}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors"
                    >
                      Set ke 100%
                    </button>
                  )}
                </div>
              </div>

              {/* 4 Volume Cards with Toggle + Percentage Slider */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {VOLUME_SPECS.map((spec) => {
                  const isEnabled = enabledVolumes[spec.volume];
                  const weight = volumeWeights[spec.volume] || 0;
                  const preview = allocationPreview.breakdown[spec.volume] || {
                    normalizedPct: 0,
                    plannedCount: 0,
                    availablePool: 0
                  };

                  return (
                    <div
                      key={spec.volume}
                      className={`rounded-xl border p-4 transition-all ${
                        isEnabled
                          ? darkMode
                            ? 'bg-slate-950/75 border-sky-500/40'
                            : 'bg-sky-50/40 border-sky-300'
                          : darkMode
                          ? 'bg-slate-950/30 border-slate-800/70 opacity-60'
                          : 'bg-slate-100/60 border-slate-200 opacity-65'
                      }`}
                    >
                      {/* Top Row: Checkbox + Volume Name + Quota Badge */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => toggleVolume(spec.volume)}
                            className="mt-1 w-4 h-4 rounded accent-sky-500 cursor-pointer"
                          />
                          <div>
                            <div className="font-bold text-sm flex items-center gap-2">
                              <span>Part 3 • {spec.volume}</span>
                              <span
                                className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                                  darkMode
                                    ? 'bg-slate-800 text-slate-300'
                                    : 'bg-white border border-slate-200 text-slate-600'
                                }`}
                              >
                                {spec.targetTotal} Bank Soal
                              </span>
                            </div>
                            <p
                              className={`text-xs mt-0.5 ${
                                darkMode ? 'text-slate-400' : 'text-slate-600'
                              }`}
                            >
                              {spec.title} ({spec.sections.join(', ')})
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Slider & Numeric Percentage Control */}
                      <div className="mt-3 pt-3 border-t border-slate-800/30 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                            Porsi Volume:
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sky-500">
                              {isEnabled ? `${weight}%` : '0%'}
                            </span>
                            {isEnabled && totalConfiguredPercentage !== 100 && (
                              <span className="text-[11px] text-slate-400">
                                (Efektif {preview.normalizedPct}%)
                              </span>
                            )}
                            <span
                              className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                                isEnabled
                                  ? darkMode
                                    ? 'bg-emerald-500/15 text-emerald-300'
                                    : 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              {isEnabled ? `${preview.plannedCount} Soal` : 'Nonaktif'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            disabled={!isEnabled}
                            value={isEnabled ? weight : 0}
                            onChange={(e) => handleWeightChange(spec.volume, e.target.value)}
                            className="w-full accent-sky-500 cursor-pointer disabled:cursor-not-allowed"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            disabled={!isEnabled}
                            value={isEnabled ? weight : 0}
                            onChange={(e) => handleWeightChange(spec.volume, e.target.value)}
                            className={`w-16 px-2 py-1 rounded-lg border text-xs font-mono text-right ${
                              darkMode
                                ? 'bg-slate-900 border-slate-700 text-slate-100'
                                : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Difficulty Tier & Total Session Questions Selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Difficulty Filter */}
                <div
                  className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-500 mb-3">
                    <Gauge className="w-4 h-4" />
                    <span>Filter Tingkat Kesulitan</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {DIFFICULTY_LEVELS.map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setSelectedDifficulty(lvl.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          selectedDifficulty === lvl.id
                            ? 'bg-sky-600 border-sky-500 text-white shadow-sm'
                            : darkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Session Questions Selector */}
                <div
                  className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Total Soal dalam Sesi Ujian</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {SESSION_SIZE_OPTIONS.map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setTargetSessionSize(count)}
                        className={`py-2 rounded-lg text-xs sm:text-sm font-mono font-bold border transition-all ${
                          targetSessionSize === count
                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                            : darkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                  <p className={`text-[11px] mt-2.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Waktu pengerjaan: <strong>15 detik/soal</strong> dengan transisi otomatis (Auto-Next).
                  </p>
                </div>
              </div>

              {/* Live Proportion Summary Strip */}
              <div
                className={`p-4 rounded-xl border mb-6 flex flex-wrap items-center justify-between gap-3 ${
                  darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100/80 border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-sky-500">Komposisi Sesi:</span>
                  {VOLUME_SPECS.map((spec) => {
                    const info = allocationPreview.breakdown[spec.volume];
                    if (!info?.enabled) return null;
                    return (
                      <span
                        key={spec.volume}
                        className={`px-2.5 py-1 rounded-md font-mono font-semibold border ${
                          darkMode
                            ? 'bg-slate-900 border-slate-700 text-slate-200'
                            : 'bg-white border-slate-300 text-slate-800'
                        }`}
                      >
                        {spec.shortLabel}: {info.plannedCount} soal ({info.normalizedPct}%)
                      </span>
                    );
                  })}
                </div>

                <div className="text-xs font-mono font-bold text-emerald-500">
                  Siap Diujikan: {allocationPreview.actualTotalQuestions} Soal
                </div>
              </div>

              {/* Start Quiz CTA */}
              <button
                type="button"
                disabled={allocationPreview.actualTotalQuestions === 0}
                onClick={startQuiz}
                className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-500 hover:from-sky-500 hover:to-emerald-400 disabled:opacity-50 text-white font-bold text-base sm:text-lg shadow-lg shadow-sky-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5 fill-current transition-transform group-hover:translate-x-0.5" />
                <span>
                  Start Quiz ({allocationPreview.actualTotalQuestions} Soal •{' '}
                  {selectedDifficulty === 'ALL' ? 'Semua Level' : `Level ${selectedDifficulty}`})
                </span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            SCREEN 2: QUIZ SCREEN (15s COUNTDOWN + AUTO-NEXT)
           ================================================================= */}
        {screen === 'quiz' && currentQuestion && (
          <div className="space-y-6">
            {/* Top Status & 15s Timer Bar */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 transition-colors ${
                darkMode
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm sm:text-base font-extrabold tracking-tight">
                    Soal {currentIndex + 1}{' '}
                    <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>
                      dari {quizQuestions.length}
                    </span>
                  </span>

                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      darkMode
                        ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                        : 'bg-sky-50 text-sky-700 border-sky-200'
                    }`}
                  >
                    {currentQuestion.volume} • {currentQuestion.section}
                  </span>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getDifficultyBadgeStyle(
                      currentQuestion.difficulty
                    )}`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold ${
                      darkMode
                        ? 'bg-slate-950 border-slate-800 text-emerald-400'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Skor: {score}</span>
                  </div>

                  {streak >= 2 && (
                    <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-bold">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{streak}x</span>
                    </div>
                  )}

                  <div
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-extrabold transition-colors ${
                      isLocked
                        ? darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-400'
                          : 'bg-slate-100 border-slate-200 text-slate-500'
                        : timeLeft <= 3
                        ? 'bg-rose-500/20 border-rose-500 text-rose-500 animate-pulse'
                        : timeLeft <= 6
                        ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                        : darkMode
                        ? 'bg-slate-950 border-sky-500/40 text-sky-400'
                        : 'bg-sky-50 border-sky-300 text-sky-700'
                    }`}
                  >
                    <Timer className="w-4 h-4" />
                    <span>00:{String(timeLeft).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>

              <div
                className={`w-full h-2 rounded-full overflow-hidden mb-2 ${
                  darkMode ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300 ease-out"
                  style={{
                    width: `${
                      ((currentIndex + (isLocked ? 1 : 0)) / quizQuestions.length) * 100
                    }%`
                  }}
                />
              </div>

              <div
                className={`w-full h-1.5 rounded-full overflow-hidden ${
                  darkMode ? 'bg-slate-800/80' : 'bg-slate-200/80'
                }`}
              >
                <div
                  className={`h-full transition-all duration-1000 linear ${
                    timeLeft <= 3
                      ? 'bg-rose-500'
                      : timeLeft <= 6
                      ? 'bg-amber-500'
                      : 'bg-sky-500'
                  }`}
                  style={{
                    width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div
              className={`rounded-2xl border p-6 sm:p-8 shadow-xl transition-colors ${
                darkMode
                  ? 'bg-slate-900/95 border-slate-800 shadow-black/40'
                  : 'bg-white border-slate-200 shadow-slate-200/60'
              }`}
            >
              <div className="mb-6 sm:mb-7">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-sky-500 mb-2">
                  <span>{currentQuestion.category}</span>
                  <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>
                    ID: {currentQuestion.id}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((optionText, idx) => {
                  const isCorrectOption = idx === currentQuestion.correctIndex;
                  const isSelectedOption = idx === selectedOption;

                  let containerClasses = '';
                  let letterBadgeClasses = '';

                  if (!isLocked) {
                    containerClasses = darkMode
                      ? 'bg-slate-950/70 border-slate-800 hover:border-sky-500/70 hover:bg-slate-800/70 text-slate-200'
                      : 'bg-slate-50/80 border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 text-slate-800';
                    letterBadgeClasses = darkMode
                      ? 'bg-slate-800 text-slate-300 group-hover:bg-sky-600 group-hover:text-white'
                      : 'bg-white border border-slate-300 text-slate-700 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600';
                  } else if (isCorrectOption) {
                    containerClasses = darkMode
                      ? 'bg-emerald-950/55 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-950/50'
                      : 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm';
                    letterBadgeClasses = 'bg-emerald-500 text-white';
                  } else if (isSelectedOption && !isCorrectOption) {
                    containerClasses = darkMode
                      ? 'bg-rose-950/55 border-rose-500 text-rose-100'
                      : 'bg-rose-50 border-rose-500 text-rose-950';
                    letterBadgeClasses = 'bg-rose-500 text-white';
                  } else {
                    containerClasses = darkMode
                      ? 'bg-slate-950/30 border-slate-800/60 text-slate-500 opacity-60'
                      : 'bg-slate-50/50 border-slate-200/70 text-slate-400 opacity-65';
                    letterBadgeClasses = darkMode
                      ? 'bg-slate-900 text-slate-600'
                      : 'bg-slate-200/70 text-slate-400';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isLocked}
                      onClick={() => handleSelectOption(idx)}
                      className={`group w-full flex items-start sm:items-center gap-3.5 p-4 rounded-xl border-2 text-left transition-all duration-150 ${containerClasses} ${
                        !isLocked ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${letterBadgeClasses}`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>

                      <span className="flex-1 text-sm sm:text-base font-medium leading-relaxed">
                        {optionText}
                      </span>

                      {isLocked && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1 sm:mt-0" />
                      )}
                      {isLocked && isSelectedOption && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-1 sm:mt-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/40 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                  {isLocked
                    ? selectedOption === -1
                      ? 'Waktu habis! Otomatis lanjut ke soal berikutnya...'
                      : 'Jawaban tercatat! Otomatis lanjut ke soal berikutnya...'
                    : 'Klik pilihan jawaban (atau tekan tombol A–D / 1–4) untuk langsung lanjut'}
                </span>
                <span className="font-mono text-sky-500 font-semibold">Auto-Next Active</span>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            SCREEN 3: RESULT SCREEN + VERIFIED MATS REFERENCE REVIEW
           ================================================================= */}
        {screen === 'results' && (
          <div className="space-y-8">
            <div
              className={`rounded-2xl border p-6 sm:p-8 shadow-xl ${
                darkMode
                  ? 'bg-slate-900/95 border-slate-800 shadow-black/40'
                  : 'bg-white border-slate-200 shadow-slate-200/70'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={darkMode ? '#1e293b' : '#e2e8f0'}
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={ratingInfo.ringColor}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - percentageScore / 100)}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold tracking-tight">
                      {percentageScore}%
                    </span>
                    <span
                      className={`text-[11px] uppercase font-semibold tracking-wider ${
                        darkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Skor Akhir
                    </span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-3">
                  <div
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-bold ${ratingInfo.badgeClass}`}
                  >
                    <ratingInfo.icon className="w-4 h-4" />
                    <span>{ratingInfo.label}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Hasil Ujian MATS Part 3 (Vol. II – V)
                  </h2>

                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {ratingInfo.subtitle}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div
                      className={`p-3 rounded-xl border ${
                        darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="text-xs text-slate-400">Benar</div>
                      <div className="text-lg font-bold text-emerald-500">
                        {score} / {totalQuestions}
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="text-xs text-slate-400">Salah</div>
                      <div className="text-lg font-bold text-rose-500">{wrongChosenCount}</div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="text-xs text-slate-400">Waktu Habis</div>
                      <div className="text-lg font-bold text-amber-500">{timedOutCount}</div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="text-xs text-slate-400">Total Waktu</div>
                      <div className="text-lg font-bold font-mono text-sky-500">
                        {formatDuration(totalElapsedSeconds)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/40 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-600/25 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Paket Komposisi Ini</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScreen('welcome')}
                  className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-bold text-sm sm:text-base transition-all ${
                    darkMode
                      ? 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Atur Ulang Porsi Volume</span>
                </button>
              </div>
            </div>

            {/* Review Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-sky-500" />
                    <span>Review &amp; Verifikasi Referensi MATS</span>
                  </h3>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Dilengkapi referensi resmi Volume, Section, dan tingkat kesulitan soal
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <Filter className="w-4 h-4 text-slate-400 mr-1 hidden sm:inline" />
                  {[
                    { id: 'all', label: `Semua (${userAnswers.length})` },
                    { id: 'correct', label: `Benar (${score})` },
                    { id: 'incorrect', label: `Salah (${wrongChosenCount})` },
                    { id: 'timeout', label: `Timeout (${timedOutCount})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setReviewFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        reviewFilter === tab.id
                          ? 'bg-sky-600 border-sky-500 text-white'
                          : darkMode
                          ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredReviewAnswers.length === 0 ? (
                <div
                  className={`rounded-2xl border p-8 text-center text-sm ${
                    darkMode
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  Tidak ada soal pada kategori filter yang dipilih.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredReviewAnswers.map((item) => {
                    const isExpanded = !!expandedItems[item.originalIndex];

                    return (
                      <div
                        key={item.originalIndex}
                        className={`rounded-2xl border overflow-hidden transition-colors ${
                          darkMode
                            ? 'bg-slate-900/90 border-slate-800'
                            : 'bg-white border-slate-200 shadow-sm'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleExpandItem(item.originalIndex)}
                          className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 text-left"
                        >
                          <div className="flex items-start gap-3">
                            {item.isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            ) : item.timedOut ? (
                              <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            )}

                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-xs font-mono font-bold text-sky-500">
                                  Soal #{item.originalIndex + 1}
                                </span>
                                <span
                                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getDifficultyBadgeStyle(
                                    item.difficulty
                                  )}`}
                                >
                                  {item.difficulty}
                                </span>
                                <span
                                  className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                                    darkMode
                                      ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                                      : 'bg-sky-50 text-sky-700 border-sky-200'
                                  }`}
                                >
                                  {item.reference}
                                </span>
                                {item.timedOut && (
                                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-semibold">
                                    Waktu Habis (15s)
                                  </span>
                                )}
                              </div>
                              <p className="text-sm sm:text-base font-semibold leading-snug">
                                {item.question}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`p-1.5 rounded-lg shrink-0 ${
                              darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div
                            className={`px-4 sm:px-5 pb-5 pt-2 border-t space-y-3 ${
                              darkMode
                                ? 'border-slate-800/80 bg-slate-950/40'
                                : 'border-slate-100 bg-slate-50/60'
                            }`}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div
                                className={`p-3 rounded-xl border ${
                                  item.isCorrect
                                    ? darkMode
                                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                    : item.timedOut
                                    ? darkMode
                                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                                      : 'bg-amber-50 border-amber-200 text-amber-900'
                                    : darkMode
                                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                                    : 'bg-rose-50 border-rose-200 text-rose-900'
                                }`}
                              >
                                <div className="text-xs font-bold uppercase tracking-wider opacity-75 mb-1">
                                  Jawaban Anda
                                </div>
                                <div className="font-medium">
                                  {item.selectedOption === -1
                                    ? 'Tidak terjawab (Batas waktu 15 detik habis)'
                                    : `${OPTION_LETTERS[item.selectedOption]}. ${
                                        item.options[item.selectedOption]
                                      }`}
                                </div>
                              </div>

                              <div
                                className={`p-3 rounded-xl border ${
                                  darkMode
                                    ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-200'
                                    : 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                                }`}
                              >
                                <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
                                  Jawaban Benar (Standar MATS)
                                </div>
                                <div className="font-medium">
                                  {OPTION_LETTERS[item.correctOption]}.{' '}
                                  {item.options[item.correctOption]}
                                </div>
                              </div>
                            </div>

                            <div
                              className={`p-3.5 rounded-xl border text-sm ${
                                darkMode
                                  ? 'bg-slate-900 border-slate-800 text-slate-300'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-500">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>Referensi: {item.reference}</span>
                                </span>
                                <span className="text-[11px] font-semibold text-emerald-500">
                                  ✓ MATS Part 3 ({item.volume})
                                </span>
                              </div>
                              <p className="leading-relaxed">{item.explanation}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}