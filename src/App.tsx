import React, { useState, useEffect } from 'react';
import { GAME_ROUNDS, StoryRound } from './data/gameData';
import { soundEngine } from './utils/audio';
import { CharacterAvatar, CharacterType } from './components/CharacterAvatar';
import { NotesModal } from './components/NotesModal';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import {
  Volume2,
  VolumeX,
  Music,
  BookOpen,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Play,
  HelpCircle,
  Download,
  Award,
} from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'game' | 'result'>('home');
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answeredRounds, setAnsweredRounds] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]);
  const [notesOpen, setNotesOpen] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [bgmActive, setBgmActive] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [characterSpeech, setCharacterSpeech] = useState<string>('');

  const currentRound: StoryRound = GAME_ROUNDS[currentRoundIdx] || GAME_ROUNDS[0];

  // Set initial character speech on round change
  useEffect(() => {
    if (screen === 'game' && currentRound) {
      setCharacterSpeech(currentRound.characterEncouragement.intro);
      setSelectedOption(null);
      setIsCorrect(null);
      setWrongAttempts([]);
    }
  }, [currentRoundIdx, screen]);

  // Audio mute toggle
  const handleToggleAudio = () => {
    const next = soundEngine.toggleSound();
    setAudioEnabled(next);
    if (!next) {
      setBgmActive(false);
    }
  };

  // BGM toggle
  const handleToggleBgm = () => {
    soundEngine.playClick();
    const active = soundEngine.toggleBgm();
    setBgmActive(active);
  };

  const handleStartGame = () => {
    soundEngine.playClick();
    setScreen('game');
    setCurrentRoundIdx(0);
    setScore(0);
    setAnsweredRounds([]);
    setSelectedOption(null);
    setIsCorrect(null);
    setWrongAttempts([]);
    setShowConfetti(false);
  };

  const handleOpenNotes = () => {
    soundEngine.playClick();
    setNotesOpen(true);
  };

  const handleOptionClick = (optionText: string) => {
    if (isCorrect) return; // already solved

    setSelectedOption(optionText);

    if (optionText === currentRound.correctAnswer) {
      // CORRECT ANSWER!
      setIsCorrect(true);
      soundEngine.playCorrect();
      setShowConfetti(true);

      // Award points only if not already answered in this round
      if (!answeredRounds.includes(currentRound.id)) {
        setScore((prev) => prev + 10);
        setAnsweredRounds((prev) => [...prev, currentRound.id]);
      }

      const speech = currentRound.characterEncouragement.correct;
      setCharacterSpeech(speech);
      soundEngine.speak(speech);
    } else {
      // WRONG ANSWER!
      setIsCorrect(false);
      soundEngine.playWrong();
      if (!wrongAttempts.includes(optionText)) {
        setWrongAttempts((prev) => [...prev, optionText]);
      }
      const speech = currentRound.characterEncouragement.wrong;
      setCharacterSpeech(speech);
      soundEngine.speak(speech);
    }
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    setShowConfetti(false);

    if (currentRoundIdx < GAME_ROUNDS.length - 1) {
      setCurrentRoundIdx((prev) => prev + 1);
    } else {
      soundEngine.playVictory();
      setScreen('result');
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setScreen('home');
    setCurrentRoundIdx(0);
    setScore(0);
    setAnsweredRounds([]);
    setSelectedOption(null);
    setIsCorrect(null);
    setWrongAttempts([]);
    setShowConfetti(false);
  };

  // Export as single self-contained HTML file for offline classroom use
  const handleDownloadSingleHtml = () => {
    soundEngine.playClick();
    const singleHtmlContent = `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Susah Senang Kita Bersama - Permainan Simpulan Bahasa & Peribahasa</title>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Nunito', sans-serif; background: #e0f2fe; color: #1e293b; min-height: 100vh; padding: 16px; }
    .container { max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 24px; border: 4px solid #38bdf8; box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
    h1, h2, h3 { font-family: 'Fredoka', sans-serif; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; background: #fef08a; color: #854d0e; font-weight: bold; margin-bottom: 8px; }
    .story-box { background: #f8fafc; border: 2px dashed #94a3b8; border-radius: 16px; padding: 20px; font-size: 1.15rem; line-height: 1.8; margin: 16px 0; }
    .options-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin: 16px 0; }
    .option-btn { font-size: 1.1rem; font-weight: 700; padding: 14px; border-radius: 16px; border: 3px solid #cbd5e1; background: #f1f5f9; cursor: pointer; text-align: left; transition: all 0.2s; }
    .option-btn:hover { background: #e2e8f0; transform: translateY(-2px); }
    .correct-btn { background: #86efac !important; border-color: #16a34a !important; color: #14532d; }
    .wrong-btn { background: #fca5a5 !important; border-color: #dc2626 !important; color: #7f1d1d; }
    .banner { padding: 16px; border-radius: 16px; font-weight: 800; font-size: 1.2rem; text-align: center; margin: 16px 0; }
    .banner-correct { background: #dcfce7; color: #15803d; border: 2px solid #86efac; }
    .banner-wrong { background: #fee2e2; color: #b91c1c; border: 2px solid #fca5a5; }
    .nav-btn { display: inline-block; padding: 12px 24px; font-size: 1.1rem; font-weight: 800; border-radius: 16px; cursor: pointer; border: none; background: #f59e0b; color: #ffffff; text-decoration: none; box-shadow: 0 4px #b45309; }
    .nav-btn:hover { background: #d97706; }
    .nav-btn:active { transform: translateY(2px); box-shadow: 0 2px #b45309; }
    .header-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-bar">
      <h2>SUSAH SENANG KITA BERSAMA</h2>
      <div style="font-weight: 800; font-size: 1.2rem; color: #0284c7;">⭐ SKOR: <span id="scoreText">0</span> | <span id="roundText">SOALAN 1/8</span></div>
    </div>
    <div id="gameContent"></div>
  </div>
  <script>
    const rounds = ${JSON.stringify(GAME_ROUNDS)};
    let curIdx = 0;
    let totalScore = 0;
    let answered = [];

    function renderQuestion() {
      const q = rounds[curIdx];
      document.getElementById('scoreText').innerText = totalScore;
      document.getElementById('roundText').innerText = 'SOALAN ' + (curIdx + 1) + '/' + rounds.length;
      
      let html = '<div class="badge">Topik: Kemasyarakatan - ' + q.situationTheme + '</div>';
      html += '<h3>' + q.title + '</h3>';
      html += '<div class="story-box">' + q.story + '</div>';
      html += '<div style="font-weight: 800; margin: 12px 0;">🔎 ' + q.question + '</div>';
      html += '<div class="options-grid">';
      q.options.forEach(opt => {
        html += '<button class="option-btn" id="btn_' + opt.id + '" onclick="checkAnswer(\\'' + opt.text.replace(/'/g, "\\\\'") + '\\', \\'' + opt.id + '\\')">' + opt.id + '. ' + opt.text + '</button>';
      });
      html += '</div>';
      html += '<div id="feedback"></div>';
      document.getElementById('gameContent').innerHTML = html;
    }

    function checkAnswer(chosen, btnId) {
      const q = rounds[curIdx];
      const feedback = document.getElementById('feedback');
      const btn = document.getElementById('btn_' + btnId);
      
      if (chosen === q.correctAnswer) {
        if (!answered.includes(q.id)) {
          totalScore += 10;
          answered.push(q.id);
          document.getElementById('scoreText').innerText = totalScore;
        }
        btn.className = 'option-btn correct-btn';
        feedback.innerHTML = '<div class="banner banner-correct">🎉 SYABAS, JAWAPAN ANDA TEPAT!<br><small>' + q.meaning + '</small></div><button class="nav-btn" onclick="nextQuestion()">➡️ SOALAN SETERUSNYA</button>';
      } else {
        btn.className = 'option-btn wrong-btn';
        feedback.innerHTML = '<div class="banner banner-wrong">❌ SALAH, SILA CUBA LAGI!</div>';
      }
    }

    function nextQuestion() {
      if (curIdx < rounds.length - 1) {
        curIdx++;
        renderQuestion();
      } else {
        let msg = totalScore >= 80 ? '🌟 Hebat! Anda sangat mahir mengenal pasti simpulan bahasa dan peribahasa!' :
                  totalScore >= 60 ? '👏 Bagus! Teruskan berlatih untuk menjadi lebih hebat!' :
                  '💪 Usaha yang baik! Cuba lagi untuk meningkatkan skor anda!';
        document.getElementById('gameContent').innerHTML = '<div style="text-align: center; padding: 40px 10px;"><h2>🏆 TAHNIAH! Permainan Tamat!</h2><p style="font-size: 1.5rem; font-weight: 800; margin: 16px 0;">⭐ Skor Anda: ' + totalScore + '/80</p><p style="margin-bottom: 24px; font-size: 1.2rem;">' + msg + '</p><button class="nav-btn" onclick="location.reload()">🔄 MAIN SEMULA</button></div>';
      }
    }
    renderQuestion();
  </script>
</body>
</html>`;

    const blob = new Blob([singleHtmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Susah_Senang_Kita_Bersama_BM_Tahun5.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Get score message
  const getScoreFeedback = (points: number) => {
    if (points >= 80) {
      return {
        icon: '🌟',
        title: 'Hebat!',
        desc: 'Anda sangat mahir mengenal pasti simpulan bahasa dan peribahasa!',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      };
    } else if (points >= 60) {
      return {
        icon: '👏',
        title: 'Bagus!',
        desc: 'Teruskan berlatih untuk menjadi lebih hebat!',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
      };
    } else if (points >= 40) {
      return {
        icon: '💪',
        title: 'Usaha yang baik!',
        desc: 'Cuba lagi untuk meningkatkan skor anda!',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      };
    } else {
      return {
        icon: '🌟',
        title: 'Teruskan Berusaha!',
        desc: 'Ulangkaji semula nota dan cuba lagi ya!',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 text-slate-800 flex flex-col justify-between selection:bg-amber-300 selection:text-slate-900 relative overflow-x-hidden">
      {/* Dynamic Celebration Confetti */}
      <ConfettiCanvas active={showConfetti} />

      {/* Interactive Notes Drawer/Modal */}
      <NotesModal
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
        returnToLabel={screen === 'game' ? '⬅️ KEMBALI KE PERMAINAN' : '⬅️ KEMBALI KE MENU'}
      />

      {/* TOP FLOATING CLOUDS DECORATION */}
      <div className="absolute top-2 left-8 text-white/70 select-none text-5xl pointer-events-none animate-float hidden md:block">
        ☁️
      </div>
      <div className="absolute top-8 right-12 text-white/70 select-none text-6xl pointer-events-none animate-float-reverse hidden md:block">
        ☁️
      </div>

      {/* UNIVERSAL HEADER NAVIGATION */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-sky-300 px-4 py-2.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Brand & Title */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setScreen('home');
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-500 border-2 border-sky-600 flex items-center justify-center text-white text-xl shadow-sm group-hover:scale-105 transition-transform">
              🎒
            </div>
            <div>
              <span className="font-['Fredoka',sans-serif] font-bold text-base sm:text-lg text-sky-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                SUSAH SENANG KITA BERSAMA
              </span>
              <p className="text-[11px] font-bold text-sky-600 uppercase tracking-wider hidden sm:block">
                Bahasa Melayu Tahun 5 · Seni Bahasa
              </p>
            </div>
          </button>

          {/* Center Info: Score & Question tracker when in game */}
          {screen === 'game' && (
            <div className="flex items-center gap-2 sm:gap-4 bg-sky-50 px-3 py-1.5 rounded-2xl border-2 border-sky-200">
              <div className="flex items-center gap-1 text-xs sm:text-sm font-extrabold text-amber-700">
                <span className="text-base">⭐</span>
                <span>SKOR: {score}</span>
              </div>
              <span className="text-slate-300 font-bold">|</span>
              <div className="text-xs sm:text-sm font-extrabold text-sky-800">
                SOALAN {currentRoundIdx + 1}/{GAME_ROUNDS.length}
              </div>
            </div>
          )}

          {/* Right Controls: Notes, BGM, Audio */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Notes Button */}
            <button
              onClick={handleOpenNotes}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-bold text-xs sm:text-sm border-b-2 border-amber-600 shadow-sm flex items-center gap-1.5 transition-all"
              title="Buka Nota Simpulan Bahasa & Peribahasa"
            >
              <BookOpen className="w-4 h-4" />
              <span>NOTA</span>
            </button>

            {/* BGM Toggle */}
            <button
              onClick={handleToggleBgm}
              className={`p-2 rounded-xl border-b-2 transition-all ${
                bgmActive
                  ? 'bg-emerald-400 text-emerald-950 border-emerald-600'
                  : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
              }`}
              title={bgmActive ? 'Matikan Muzik Latar' : 'Pasang Muzik Latar (BGM)'}
            >
              <Music className={`w-4 h-4 ${bgmActive ? 'animate-bounce' : ''}`} />
            </button>

            {/* Audio Master Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border-b-2 transition-all ${
                audioEnabled
                  ? 'bg-sky-400 text-white border-sky-600'
                  : 'bg-rose-100 text-rose-700 border-rose-300'
              }`}
              title={audioEnabled ? 'Matikan Bunyi (Mute)' : 'Hidupkan Bunyi (Unmute)'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {/* ================= SCREEN 1: HALAMAN UTAMA ================= */}
        {screen === 'home' && (
          <div className="space-y-6 sm:space-y-8 animate-pop">
            {/* Hero Card */}
            <div className="bg-white/95 rounded-3xl border-4 border-sky-300 shadow-xl p-6 sm:p-10 relative overflow-hidden text-center">
              {/* Decorative Background Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-200/50 rounded-full blur-2xl pointer-events-none" />

              {/* Title Section */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
                <span>📘 Bahasa Melayu Tahun 5</span>
                <span>·</span>
                <span>Tema: Kemasyarakatan</span>
              </div>

              <h1 className="font-['Fredoka',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-black text-sky-900 tracking-tight leading-tight">
                "SUSAH SENANG KITA BERSAMA"
              </h1>

              <p className="font-['Fredoka',sans-serif] text-xl sm:text-3xl font-bold text-amber-600 mt-2">
                "Jom Cari Simpulan Bahasa & Peribahasa!"
              </p>

              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
                Sertai pengembaraan ceria bersama Doraemon, Nobita, Shizuka, Gian dan Suneo dalam aktiviti gotong-royong dan kemasyarakatan di kawasan kejiranan!
              </p>

              {/* Doraemon Playground World Scene Illustration */}
              <div className="my-6 py-4 px-3 bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 rounded-2xl border-2 border-sky-200 relative">
                {/* Dokodemo Door (Pintu Suka Hati) */}
                <div className="absolute left-4 sm:left-10 bottom-4 w-12 sm:w-16 h-20 sm:h-28 bg-rose-400 rounded-t-xl border-3 border-rose-600 shadow-md flex items-center justify-end pr-1 sm:pr-2 select-none group">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-amber-300 border border-amber-600" />
                  <span className="absolute -top-6 left-0 right-0 text-[10px] font-extrabold text-rose-700 bg-white/90 px-1 py-0.5 rounded shadow">
                    Pintu Suka Hati
                  </span>
                </div>

                {/* Character line-up */}
                <div className="flex items-end justify-center gap-2 sm:gap-6 pt-3 pb-2">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] sm:text-xs font-bold text-sky-800 bg-white/80 px-2 py-0.5 rounded-full mb-1">
                      Doraemon
                    </span>
                    <CharacterAvatar character="doraemon" size="lg" expression="cheering" animate />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] sm:text-xs font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded-full mb-1">
                      Nobita
                    </span>
                    <CharacterAvatar character="nobita" size="md" expression="happy" />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] sm:text-xs font-bold text-pink-800 bg-white/80 px-2 py-0.5 rounded-full mb-1">
                      Shizuka
                    </span>
                    <CharacterAvatar character="shizuka" size="md" expression="happy" />
                  </div>

                  <div className="flex flex-col items-center hidden sm:flex">
                    <span className="text-[10px] sm:text-xs font-bold text-orange-800 bg-white/80 px-2 py-0.5 rounded-full mb-1">
                      Gian
                    </span>
                    <CharacterAvatar character="gian" size="md" expression="cheering" />
                  </div>

                  <div className="flex flex-col items-center hidden sm:flex">
                    <span className="text-[10px] sm:text-xs font-bold text-teal-800 bg-white/80 px-2 py-0.5 rounded-full mb-1">
                      Suneo
                    </span>
                    <CharacterAvatar character="suneo" size="md" expression="happy" />
                  </div>
                </div>

                {/* Playground Cement Pipes (Paip Simen Ikonik) */}
                <div className="flex items-center justify-center gap-1 mt-2 text-xs font-extrabold text-slate-500">
                  <div className="px-3 py-1 bg-slate-300 border border-slate-400 rounded-full shadow-inner">
                    🛝 Padang Permainan Kejiranan
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS (MULA BERMAIN & NOTA) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleStartGame}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold shadow-lg border-b-6 border-emerald-700 btn-3d flex items-center justify-center gap-3 transition-transform"
                >
                  <Play className="w-7 h-7 fill-white" />
                  <span>MULA BERMAIN</span>
                </button>

                <button
                  onClick={handleOpenNotes}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold shadow-lg border-b-6 border-amber-600 btn-3d flex items-center justify-center gap-3 transition-transform"
                >
                  <BookOpen className="w-7 h-7" />
                  <span>NOTA</span>
                </button>
              </div>
            </div>

            {/* LEARNING OBJECTIVES & SKILL FOCUS CARD */}
            <div className="bg-white/80 rounded-2xl border-2 border-sky-200 p-5 shadow-sm">
              <h3 className="font-['Fredoka',sans-serif] text-lg font-bold text-sky-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Objektif Pembelajaran Permainan Ini:</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-700">
                <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Murid dapat membezakan antara simpulan bahasa dengan peribahasa.</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Mengenal pasti ungkapan yang terselit dalam teks cerita kemasyarakatan.</span>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Memahami maksud ungkapan berdasarkan konteks situasi sebenar.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCREEN 2: BAHAGIAN PERMAINAN ================= */}
        {screen === 'game' && currentRound && (
          <div className="space-y-4 sm:space-y-5 animate-pop">
            {/* Top Progress Track */}
            <div className="bg-white/90 rounded-2xl p-3 border-2 border-sky-200 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5">
                {GAME_ROUNDS.map((r, idx) => {
                  const isCurrent = idx === currentRoundIdx;
                  const isAnswered = answeredRounds.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentRoundIdx(idx);
                      }}
                      className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-900 border-2 border-amber-600 scale-110 shadow'
                          : isAnswered
                          ? 'bg-emerald-500 text-white border border-emerald-600'
                          : 'bg-slate-100 text-slate-500 border border-slate-300 hover:bg-slate-200'
                      }`}
                      title={`Pusingan ${idx + 1}: ${r.title}`}
                    >
                      {isAnswered ? '✓' : idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="text-xs font-bold text-sky-800 whitespace-nowrap bg-sky-100 px-3 py-1 rounded-xl">
                Cabaran {currentRoundIdx + 1} daripada {GAME_ROUNDS.length}
              </div>
            </div>

            {/* Main Interactive Story Card */}
            <div className="bg-white rounded-3xl border-4 border-sky-300 shadow-xl overflow-hidden">
              {/* Story Header */}
              <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 text-white p-4 sm:p-5 flex items-center justify-between border-b-4 border-sky-600">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
                    📖
                  </span>
                  <div>
                    <h2 className="font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold">
                      {currentRound.title}
                    </h2>
                    <p className="text-xs text-sky-100 font-semibold">
                      Tema Kemasyarakatan: {currentRound.situationTheme}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20">
                    Fokus: Seni Bahasa
                  </span>
                </div>
              </div>

              {/* Story Reading Box with Character Assistant */}
              <div className="p-5 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Left: Character Avatar & Speech Bubble */}
                  <div className="lg:col-span-3 flex lg:flex-col items-center gap-3 bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-200">
                    <CharacterAvatar
                      character={currentRound.featuredCharacter}
                      size="lg"
                      expression={isCorrect ? 'cheering' : isCorrect === false ? 'thinking' : 'happy'}
                      animate={isCorrect === true}
                    />
                    <div className="flex-1 text-left lg:text-center">
                      <p className="text-xs font-bold text-sky-800 uppercase capitalize">
                        {currentRound.featuredCharacter}
                      </p>
                      <div className="relative mt-1 bg-white p-2.5 rounded-xl border border-sky-200 text-xs text-slate-700 italic shadow-sm">
                        "{characterSpeech}"
                        <button
                          onClick={() => soundEngine.speak(characterSpeech)}
                          className="mt-1 block text-[11px] text-sky-600 hover:text-sky-800 font-bold not-italic"
                        >
                          🔊 Sebut Suara
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: The Community Story Text (No obvious hints - pupils must read attentively!) */}
                  <div className="lg:col-span-9 bg-amber-50/70 p-5 sm:p-6 rounded-2xl border-2 border-amber-200 relative">
                    <div className="absolute top-2 right-3 text-xs font-extrabold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md select-none">
                      Teks Cerita
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-slate-800 text-justify">
                      {currentRound.story}
                    </p>
                  </div>
                </div>

                {/* INSTRUCTION BANNER (As specified by user prompt) */}
                <div className="bg-sky-100 border-2 border-sky-300 rounded-2xl p-4 flex items-center gap-3 shadow-inner">
                  <span className="text-2xl select-none">🔎</span>
                  <p className="font-['Fredoka',sans-serif] text-base sm:text-lg font-bold text-sky-950">
                    "Teliti cerita di atas. Cari simpulan bahasa atau peribahasa yang terdapat dalam cerita tersebut."
                  </p>
                </div>

                {/* QUESTION PROMPT */}
                <div className="border-t-2 border-slate-100 pt-3">
                  <h3 className="font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-sky-500" />
                    <span>{currentRound.question}</span>
                  </h3>
                </div>

                {/* 4 INTERACTIVE ANSWER OPTION CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentRound.options.map((opt) => {
                    const isSelected = selectedOption === opt.text;
                    const isWrong = wrongAttempts.includes(opt.text);
                    const isRight = isCorrect && isSelected;

                    // Color theme presets
                    const colorStyles = {
                      blue: 'border-sky-400 bg-sky-50 hover:bg-sky-100 text-sky-950',
                      yellow: 'border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-950',
                      green: 'border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-950',
                      red: 'border-rose-400 bg-rose-50 hover:bg-rose-100 text-rose-950',
                    }[opt.color];

                    let finalClass = colorStyles;
                    if (isRight) {
                      finalClass = 'border-emerald-500 bg-emerald-100 text-emerald-950 ring-4 ring-emerald-300';
                    } else if (isWrong) {
                      finalClass = 'border-rose-400 bg-rose-100 text-rose-900 opacity-60 line-through';
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={isCorrect === true}
                        onClick={() => handleOptionClick(opt.text)}
                        className={`p-4 rounded-2xl border-3 text-left font-['Fredoka',sans-serif] text-base sm:text-lg font-bold transition-all shadow-sm flex items-center justify-between gap-3 active:scale-98 cursor-pointer ${finalClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-white/80 border border-current flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {isRight && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
                        {isWrong && !isRight && <XCircle className="w-6 h-6 text-rose-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* FEEDBACK STATUS BANNER */}
                {/* 1. WRONG FEEDBACK (Allows retrying, non-scary, does NOT hide question) */}
                {isCorrect === false && (
                  <div className="bg-rose-100 border-3 border-rose-300 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 animate-shake shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl select-none">❌</span>
                      <div>
                        <h4 className="font-['Fredoka',sans-serif] text-lg sm:text-xl font-black text-rose-700">
                          SALAH, SILA CUBA LAGI!
                        </h4>
                        <p className="text-xs sm:text-sm text-rose-800 font-semibold">
                          Jangan putus asa! Baca semula ayat dalam cerita dan pilih jawapan lain.
                        </p>
                      </div>
                    </div>
                    <CharacterAvatar character="doraemon" size="sm" expression="thinking" />
                  </div>
                )}

                {/* 2. CORRECT FEEDBACK (Celebration, explanation of meaning, NEXT button) */}
                {isCorrect === true && (
                  <div className="bg-emerald-50 border-3 border-emerald-400 rounded-2xl p-5 sm:p-6 space-y-4 animate-pop shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl select-none">🎉</span>
                        <div>
                          <h4 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-black text-emerald-800">
                            SYABAS, JAWAPAN ANDA TEPAT!
                          </h4>
                          <p className="text-sm sm:text-base text-emerald-900 font-bold">
                            "Hebat! Anda berjaya menemui ungkapan yang terdapat dalam cerita."
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-3xl select-none">
                        <span>🏆</span>
                        <span>⭐</span>
                      </div>
                    </div>

                    {/* Expression Breakdown */}
                    <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                          {currentRound.phraseType}
                        </span>
                        <strong className="text-emerald-900 font-['Fredoka',sans-serif] text-lg">
                          "{currentRound.correctAnswer}"
                        </strong>
                      </div>
                      <p className="text-sm text-slate-700">
                        <strong className="text-slate-900">Maksud:</strong> {currentRound.meaning}
                      </p>
                    </div>

                    {/* Next Question Button */}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold shadow-md border-b-4 border-emerald-700 btn-3d flex items-center gap-2 transition-transform"
                      >
                        <span>
                          {currentRoundIdx < GAME_ROUNDS.length - 1
                            ? 'SOALAN SETERUSNYA'
                            : 'LIHAT KEPUTUSAN PENUH'}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= SCREEN 3: PAPARAN TAMAT PERMAINAN ================= */}
        {screen === 'result' && (
          <div className="space-y-6 sm:space-y-8 animate-pop">
            <div className="bg-white rounded-3xl border-4 border-sky-300 shadow-xl p-6 sm:p-10 text-center relative overflow-hidden">
              {/* Confetti and trophy graphics */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-4xl sm:text-5xl shadow-md mb-4 animate-bounce-slight">
                🏆
              </div>

              <h1 className="font-['Fredoka',sans-serif] text-3xl sm:text-5xl font-black text-sky-900">
                TAHNIAH!
              </h1>
              <p className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold text-slate-600 mt-1">
                Permainan Tamat!
              </p>

              {/* Score Display */}
              <div className="my-5 inline-block bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-900 px-8 py-4 rounded-3xl border-4 border-amber-600 shadow-lg">
                <span className="text-base sm:text-lg font-bold block uppercase tracking-wider text-amber-950">
                  Skor Anda
                </span>
                <span className="font-['Fredoka',sans-serif] text-4xl sm:text-6xl font-black">
                  ⭐ {score} / 80
                </span>
              </div>

              {/* Feedback Based on Achievement */}
              {(() => {
                const fb = getScoreFeedback(score);
                return (
                  <div className={`max-w-xl mx-auto p-4 sm:p-5 rounded-2xl border-2 ${fb.badgeColor} shadow-xs mb-6`}>
                    <p className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold mb-1">
                      {fb.icon} {fb.title}
                    </p>
                    <p className="text-sm sm:text-base font-medium">
                      {fb.desc}
                    </p>
                  </div>
                );
              })()}

              {/* Character Celebration Row */}
              <div className="flex items-center justify-center gap-3 sm:gap-6 my-6">
                <CharacterAvatar character="doraemon" size="md" expression="cheering" animate />
                <CharacterAvatar character="nobita" size="md" expression="cheering" animate />
                <CharacterAvatar character="shizuka" size="md" expression="cheering" animate />
                <CharacterAvatar character="gian" size="md" expression="cheering" animate />
                <CharacterAvatar character="suneo" size="md" expression="cheering" animate />
              </div>

              {/* Main Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-['Fredoka',sans-serif] text-xl font-bold shadow-lg border-b-6 border-sky-700 btn-3d flex items-center justify-center gap-2.5 transition-transform"
                >
                  <RotateCcw className="w-6 h-6" />
                  <span>MAIN SEMULA</span>
                </button>

                <button
                  onClick={handleOpenNotes}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-['Fredoka',sans-serif] text-xl font-bold shadow-lg border-b-6 border-amber-600 btn-3d flex items-center justify-center gap-2.5 transition-transform"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>LIHAT NOTA</span>
                </button>

                <button
                  onClick={handleDownloadSingleHtml}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-['Fredoka',sans-serif] text-base sm:text-lg font-bold shadow-lg border-b-6 border-emerald-700 btn-3d flex items-center justify-center gap-2 transition-transform"
                  title="Simpan sebagai fail HTML tunggal untuk dibuka luar talian"
                >
                  <Download className="w-5 h-5" />
                  <span>MUAT TURUN FAIL HTML</span>
                </button>
              </div>
            </div>

            {/* REVIEW OF ALL 8 UNGKAPAN LEARNED */}
            <div className="bg-white/90 rounded-3xl border-2 border-sky-200 p-6 shadow-sm">
              <h3 className="font-['Fredoka',sans-serif] text-xl font-bold text-sky-950 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                <span>Rumusan Ungkapan Bahasa yang Telah Dipelajari:</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {GAME_ROUNDS.map((r, idx) => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-left space-y-1 hover:bg-sky-100/60 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-sky-700">Soalan {idx + 1}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          r.phraseType === 'Simpulan Bahasa'
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-amber-200 text-amber-800'
                        }`}
                      >
                        {r.phraseType}
                      </span>
                    </div>
                    <p className="font-['Fredoka',sans-serif] font-bold text-base text-slate-900">
                      "{r.correctAnswer}"
                    </p>
                    <p className="text-xs text-slate-600 leading-snug">
                      <strong>Maksud:</strong> {r.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* UNIVERSAL FOOTER */}
      <footer className="mt-8 border-t border-sky-300 bg-white/70 py-4 px-4 text-center text-xs text-slate-600 font-medium">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Modul Pembelajaran Interaktif Bahasa Melayu Tahun 5 · Tema: Kemasyarakatan
          </p>
          <p className="flex items-center gap-1 text-sky-700 font-bold">
            <span>Doraemon</span>
            <span>·</span>
            <span>Nobita</span>
            <span>·</span>
            <span>Shizuka</span>
            <span>·</span>
            <span>Gian</span>
            <span>·</span>
            <span>Suneo</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
