export interface StoryRound {
  id: number;
  title: string;
  situationTheme: string;
  story: string;
  question: string;
  phraseType: 'Simpulan Bahasa' | 'Peribahasa';
  options: {
    id: string;
    text: string;
    color: 'blue' | 'yellow' | 'green' | 'red';
  }[];
  correctAnswer: string;
  meaning: string;
  featuredCharacter: 'doraemon' | 'nobita' | 'shizuka' | 'gian' | 'suneo';
  characterEncouragement: {
    intro: string;
    correct: string;
    wrong: string;
  };
}

export const GAME_ROUNDS: StoryRound[] = [
  {
    id: 1,
    title: "Aktiviti Gotong-Royong di Padang Permainan",
    situationTheme: "Kerjasama Membersihkan Kawasan Kejiranan",
    story: "Pada hari Ahad yang lalu, penduduk Taman Impian mengadakan aktiviti gotong-royong untuk membersihkan padang permainan sekolah. Doraemon, Nobita, Shizuka, Gian dan Suneo menyertai aktiviti tersebut dengan penuh bersemangat. Mereka membahagikan tugas supaya kerja dapat diselesaikan dengan cepat. Nobita membantu menyapu daun kering manakala Shizuka mengumpulkan tin kosong. Gian dan Suneo pula mengecat pagar buaian yang berkarat. Semua orang bekerjasama dan saling membantu kerana mereka percaya bahawa berat sama dipikul, ringan sama dijinjing.",
    question: "Apakah peribahasa yang terdapat dalam cerita di atas?",
    phraseType: "Peribahasa",
    options: [
      { id: "A", text: "ringan tulang", color: "blue" },
      { id: "B", text: "besar hati", color: "yellow" },
      { id: "C", text: "berat sama dipikul, ringan sama dijinjing", color: "green" },
      { id: "D", text: "bulat air kerana pembetung", color: "red" }
    ],
    correctAnswer: "berat sama dipikul, ringan sama dijinjing",
    meaning: "Bekerjasama melakukan pekerjaan sama ada susah atau senang dan dihadapi bersama-sama.",
    featuredCharacter: "doraemon",
    characterEncouragement: {
      intro: "Hai kawan-kawan! Jom kita teliti cerita gotong-royong ini bersama-sama.",
      correct: "Wah! Tepat sekali! Kerja susah pun jadi senang bila dibuat bersama.",
      wrong: "Ganbatte! Cuba lagi! Teliti ayat bahagian akhir cerita itu."
    }
  },
  {
    id: 2,
    title: "Membantu Gerobak Sayur Pak Cik Muthu",
    situationTheme: "Membantu Jiran dalam Kesusahan",
    story: "Ketika Nobita dan Doraemon dalam perjalanan pulang ke rumah, tiba-tiba roda gerobak sayur Pak Cik Muthu patah berhampiran kedai runcit. Sayur kubis, lobak dan tomato bertaburan di atas jalan raya. Tanpa membuang masa, Nobita terus meluru membantu mengutip sayur-sayuran tersebut dengan cermat ke dalam bakul. Pak Cik Muthu berasa sangat terharu lalu memuji sikap Nobita yang ringan tulang kerana sentiasa pantas menolong orang yang ditimpa musibah.",
    question: "Apakah simpulan bahasa yang terdapat dalam cerita di atas?",
    phraseType: "Simpulan Bahasa",
    options: [
      { id: "A", text: "panjang tangan", color: "blue" },
      { id: "B", text: "ringan tulang", color: "yellow" },
      { id: "C", text: "berat hati", color: "green" },
      { id: "D", text: "buah mulut", color: "red" }
    ],
    correctAnswer: "ringan tulang",
    meaning: "Rajin bekerja atau suka membantu orang lain dengan rela hati.",
    featuredCharacter: "nobita",
    characterEncouragement: {
      intro: "Kasihannya Pak Cik Muthu! Mari kita cari sifat mulia yang dipuji oleh Pak Cik Muthu.",
      correct: "Wah! Betul! Saya gembira dapat membantu orang yang memerlukan.",
      wrong: "Belum tepat, kawan! Cari ungkapan ringkas yang menggambarkan sikap rajin menolong."
    }
  },
  {
    id: 3,
    title: "Pusat Perlindungan Mangsa Banjir",
    situationTheme: "Saling Membantu Semasa Kecemasan",
    story: "Hujan lebat tanpa henti menyebabkan beberapa buah rumah di kawasan rendah dinaiki air limpahan sungai. Penduduk kampung segera membuka dewan orang ramai sebagai tempat perlindungan sementara. Shizuka bersama ibunya bertungkus-lumus memasak bubur panas dan membungkus selimut untuk diserahkan kepada keluarga mangsa banjir. Penduduk kampung sentiasa bersatu hati bagai aur dengan tebing agar tiada siapa yang berasa tersisih sewaktu menghadapi ujian getir ini.",
    question: "Apakah peribahasa yang terdapat dalam cerita di atas?",
    phraseType: "Peribahasa",
    options: [
      { id: "A", text: "ada gula ada semut", color: "blue" },
      { id: "B", text: "bagai isi dengan kuku", color: "yellow" },
      { id: "C", text: "bagai aur dengan tebing", color: "green" },
      { id: "D", text: "langkah seribu", color: "red" }
    ],
    correctAnswer: "bagai aur dengan tebing",
    meaning: "Saling membantu, bekerjasama rapat dan lengkap-melengkapi antara satu sama lain.",
    featuredCharacter: "shizuka",
    characterEncouragement: {
      intro: "Kita mesti prihatin terhadap jiran tetangga. Teliti peribahasa yang digunakan dalam perenggan.",
      correct: "Syabas! Jawapan kamu tepat! Peribahasa ini melambangkan ikatan kejiranan yang kukuh.",
      wrong: "Jangan berputus asa! Ingat pepatah tentang tumbuhan buluh kecil di tepi tebing sungai."
    }
  },
  {
    id: 4,
    title: "Mengedarkan Risalah Kedai Roti",
    situationTheme: "Membantu Sahabat dengan Ikhlas",
    story: "Ibu Gian baru sahaja membuka sebuah kedai roti comel di pekan. Gian berhasrat membantu ibunya dengan mengedarkan risalah promosi ke rumah-rumah jiran pada waktu petang. Menyedari keletihan Gian, Suneo, Doraemon dan Nobita rela mengorbankan masa bermain mereka untuk bersama-sama mengagihkan risalah tersebut di setiap lorong. Melihat sokongan tulus kawan-kawannya, Gian berasa amat besar hati dan berterima kasih atas persahabatan mereka.",
    question: "Apakah simpulan bahasa yang terdapat dalam cerita di atas?",
    phraseType: "Simpulan Bahasa",
    options: [
      { id: "A", text: "besar hati", color: "blue" },
      { id: "B", text: "hidung tinggi", color: "yellow" },
      { id: "C", text: "hati waja", color: "green" },
      { id: "D", text: "anak emas", color: "red" }
    ],
    correctAnswer: "besar hati",
    meaning: "Berasa bangga, gembira, atau bersyukur atas bantuan dan penghargaan orang lain.",
    featuredCharacter: "gian",
    characterEncouragement: {
      intro: "Kawan-kawan saya memang terbaik! Apakah ungkapan yang menggambarkan perasaan gembira saya?",
      correct: "Hebat! Jawapan kamu mantap! Ini baru semangat berkawan sejati!",
      wrong: "Oit, cuba lagi! Ungkapan ini berkaitan dengan perasaan gembira dan bersyukur."
    }
  },
  {
    id: 5,
    title: "Bermesyuarat Membina Pondok Bacaan",
    situationTheme: "Mencapai Kata Sepakat Melalui Muafakat",
    story: "Penduduk Lorong Mawar bercadang membina sebuah pondok bacaan komuniti untuk kemudahan kanak-kanak mengulang kaji pelajaran. Semasa perjumpaan di balai raya, beberapa orang menyuarakan cadangan tapak dan reka bentuk yang berbeza-beza. Namun begitu, mereka mendengar pandangan setiap pihak dengan tenang sehingga keputusan bersama dapat dicapai. Orang tua-tua berpesan bahawa bulat air kerana pembetung, bulat manusia kerana muafakat demi melahirkan masyarakat yang harmoni.",
    question: "Apakah peribahasa yang terdapat dalam cerita di atas?",
    phraseType: "Peribahasa",
    options: [
      { id: "A", text: "bulat air kerana pembetung, bulat manusia kerana muafakat", color: "blue" },
      { id: "B", text: "ukur baju di badan sendiri", color: "yellow" },
      { id: "C", text: "ada udang di sebalik batu", color: "green" },
      { id: "D", text: "sudah jatuh ditimpa tangga", color: "red" }
    ],
    correctAnswer: "bulat air kerana pembetung, bulat manusia kerana muafakat",
    meaning: "Kata sepakat atau persetujuan bersama dapat dicapai melalui perbincangan dan mesyuarat.",
    featuredCharacter: "suneo",
    characterEncouragement: {
      intro: "Bermusyawarah itu amalan yang mulia! Mari kita cari pepatah yang lengkap di dalam cerita.",
      correct: "Kamu memang pandai! Perbincangan yang baik sentiasa membawa hasil yang terbaik!",
      wrong: "Cuba lagi ya! Peribahasa ini bercakap tentang air dan manusia yang sepakat."
    }
  },
  {
    id: 6,
    title: "Menziarahi Nenek Siti yang Uzur",
    situationTheme: "Menyayangi Warga Emas di Kejiranan",
    story: "Nenek Siti merupakan seorang warga emas yang tinggal bersendirian di hujung taman perumahan. Setiap hujung minggu, Suneo dan Gian akan berkunjung ke rumah Nenek Siti untuk menolong menyiram pokok bunga dan membawakan kuih buatan ibu mereka. Sikap berbudi bahasa dan keperihatinan yang ditunjukkan oleh kanak-kanak itu membuatkan mereka sentiasa menjadi buah hati kepada Nenek Siti dan sekalian penduduk.",
    question: "Apakah simpulan bahasa yang terdapat dalam cerita di atas?",
    phraseType: "Simpulan Bahasa",
    options: [
      { id: "A", text: "buah tangan", color: "blue" },
      { id: "B", text: "buah hati", color: "yellow" },
      { id: "C", text: "campur tangan", color: "green" },
      { id: "D", text: "kaki ayam", color: "red" }
    ],
    correctAnswer: "buah hati",
    meaning: "Orang yang amat disayangi, dikasihi atau menjadi pujaan ramai.",
    featuredCharacter: "doraemon",
    characterEncouragement: {
      intro: "Menyayangi warga emas amalan terpuji. Cari simpulan bahasa tentang orang yang sangat disayangi.",
      correct: "Tahniah! Betul sekali! Sikap prihatin menjadikan kita disayangi ramai orang.",
      wrong: "Belum betul lagi. Hati-hati, bezakan antara pemberian (buah tangan) dengan orang yang disayangi!"
    }
  },
  {
    id: 7,
    title: "Menghormati Adat Kejiranan Baharu",
    situationTheme: "Menyesuaikan Diri dalam Masyarakat",
    story: "Keluarga Nobita baru sahaja berpindah ke sebuah kawasan perkampungan yang kaya dengan tradisi gotong-royong dan kenduri kesyukuran. Sebelum menghadiri majlis ramah mesra bersama jiran tetangga, Doraemon mengingatkan Nobita supaya sentiasa bersopan santun dan mematuhi tata susila tempatan. Doraemon menegaskan bahawa di mana bumi dipijak, di situ langit dijunjung agar kita dapat hidup tenteram dan disenangi semua.",
    question: "Apakah peribahasa yang terdapat dalam cerita di atas?",
    phraseType: "Peribahasa",
    options: [
      { id: "A", text: "bagai menatang minyak yang penuh", color: "blue" },
      { id: "B", text: "tepuk dada tanya selera", color: "yellow" },
      { id: "C", text: "di mana bumi dipijak, di situ langit dijunjung", color: "green" },
      { id: "D", text: "harimau mati meninggalkan belang", color: "red" }
    ],
    correctAnswer: "di mana bumi dipijak, di situ langit dijunjung",
    meaning: "Mematuhi undang-undang, adat resam dan peraturan di tempat yang kita diami atau kunjungi.",
    featuredCharacter: "shizuka",
    characterEncouragement: {
      intro: "Doraemon memberikan nasihat yang sangat bermakna kepada Nobita. Teliti pesanan tersebut!",
      correct: "Bagusnya! Jawapan anda amat tepat! Kita perlu menghormati adat setempat.",
      wrong: "Cuba baca semula perenggan akhir. Ada peribahasa tentang bumi dan langit."
    }
  },
  {
    id: 8,
    title: "Majlis Kenduri Sekampung",
    situationTheme: "Kerjasama Menjayakan Majlis Kemasyarakatan",
    story: "Sempena majlis kesyukuran di balai raya kampung, seluruh warga penduduk berkumpul seawal jam tujuh pagi untuk melakukan persiapan. Kaum bapa bekerjasama memasang khemah dan menyusun kerusi, manakala kaum ibu sibuk menyediakan rencah lauk-pauk tradisional. Nobita, Gian, Suneo dan Shizuka pula berganding bahu menghidangkan air minuman dan mencuci pinggan mangkuk dengan riang sehingga majlis berjalan lancar.",
    question: "Apakah simpulan bahasa yang terdapat dalam cerita di atas?",
    phraseType: "Simpulan Bahasa",
    options: [
      { id: "A", text: "berganding bahu", color: "blue" },
      { id: "B", text: "gulung tikar", color: "yellow" },
      { id: "C", text: "berat mulut", color: "green" },
      { id: "D", text: "rambang mata", color: "red" }
    ],
    correctAnswer: "berganding bahu",
    meaning: "Bekerjasama rapat, tolong-menolong dan berganding tenaga melakukan sesuatu perkara.",
    featuredCharacter: "nobita",
    characterEncouragement: {
      intro: "Soalan terakhir kawan-kawan! Cari simpulan bahasa yang bermaksud bekerjasama rapat.",
      correct: "Luar biasa! Jawapan kamu tepat! Anda telah berjaya menyelesaikan semua cabaran!",
      wrong: "Sikit lagi! Cari ungkapan ringkas yang melibatkan bahagian anggota badan (bahu)."
    }
  }
];

export const NOTE_CONTENT = {
  title: "SIMPULAN BAHASA DENGAN PERIBAHASA",
  sections: [
    {
      heading: "SIMPULAN BAHASA",
      points: [
        "Biasanya terdiri daripada beberapa perkataan yang ringkas.",
        "Mempunyai maksud khusus.",
        "Contoh: ringan tulang",
        "Maksud: rajin membantu"
      ]
    },
    {
      heading: "PERIBAHASA",
      points: [
        "Biasanya berbentuk ungkapan yang lebih lengkap.",
        "Mengandungi nasihat, pengajaran atau perbandingan.",
        "Contoh: berat sama dipikul, ringan sama dijinjing",
        "Maksud: susah dan senang dihadapi bersama"
      ]
    }
  ]
};
