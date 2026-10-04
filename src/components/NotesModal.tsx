import React from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { soundEngine } from '../utils/audio';
import { NOTE_CONTENT } from '../data/gameData';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnToLabel?: string;
}

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  returnToLabel = '⬅️ KEMBALI KE MENU',
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    soundEngine.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Cartoon Notebook Container */}
      <div className="relative w-full max-w-2xl bg-amber-50 rounded-3xl border-4 border-sky-400 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Notebook Spiral Spine Header */}
        <div className="bg-sky-500 text-white px-5 py-3 flex items-center justify-between border-b-4 border-sky-600 relative">
          {/* Spirals */}
          <div className="absolute -top-3 left-6 right-6 flex justify-between pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-5 bg-slate-200 border-2 border-slate-400 rounded-full shadow-inner"
              />
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-2xl">📚</span>
            <div>
              <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold tracking-wide">
                BUKU NOTA PINTAR KARTUN
              </h2>
              <p className="text-xs text-sky-100 font-semibold">
                Panduan Rujukan Pantas Bahasa Melayu Tahun 5
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-xl transition-transform active:scale-95"
            aria-label="Tutup Nota"
          >
            ✕
          </button>
        </div>

        {/* Notebook Page Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 relative bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Decorative Futuristic Gadget & Cartoon Elements */}
          <div className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border-2 border-sky-200 shadow-sm">
            <div className="flex items-center gap-3">
              <CharacterAvatar character="doraemon" size="sm" animate />
              <div>
                <p className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Alat Nota Poket 4D Doraemon
                </p>
                <p className="text-xs text-slate-600">
                  Fahami perbezaan antara simpulan bahasa dan peribahasa di bawah!
                </p>
              </div>
            </div>
            {/* Take-copter & Magic Door Icon */}
            <div className="flex items-center gap-2 text-2xl select-none">
              <span title="Buku Terbuka">📖</span>
              <span title="Pensel">✏️</span>
              <span title="Bintang">⭐</span>
              <span title="Awan">☁️</span>
              <span title="Pintu Suka Hati">🚪</span>
            </div>
          </div>

          {/* EXACT TITLE */}
          <div className="text-center py-1">
            <h1 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-extrabold text-sky-900 underline decoration-amber-400 decoration-wavy decoration-2">
              {NOTE_CONTENT.title}
            </h1>
          </div>

          {/* TWO COLUMNS / SECTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Section 1: SIMPULAN BAHASA */}
            <div className="bg-sky-50 border-3 border-sky-300 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 text-2xl opacity-20">🪶</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-sm shadow">
                  1
                </span>
                <h3 className="font-['Fredoka',sans-serif] text-xl font-bold text-sky-800">
                  {NOTE_CONTENT.sections[0].heading}
                </h3>
              </div>

              <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                {NOTE_CONTENT.sections[0].points.map((pt, idx) => {
                  const isExample = pt.startsWith('Contoh:') || pt.startsWith('Maksud:');
                  return (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 ${
                        isExample
                          ? 'bg-white/90 p-2.5 rounded-xl border border-sky-200 font-medium'
                          : ''
                      }`}
                    >
                      <span className="text-sky-500 text-base mt-0.5">•</span>
                      <span>
                        {pt.startsWith('Contoh:') ? (
                          <>
                            Contoh: <strong className="text-sky-700 font-bold">{pt.replace('Contoh: ', '')}</strong>
                          </>
                        ) : pt.startsWith('Maksud:') ? (
                          <>
                            Maksud: <strong className="text-emerald-700 font-bold">{pt.replace('Maksud: ', '')}</strong>
                          </>
                        ) : (
                          pt
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Section 2: PERIBAHASA */}
            <div className="bg-amber-50 border-3 border-amber-300 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 text-2xl opacity-20">📜</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow">
                  2
                </span>
                <h3 className="font-['Fredoka',sans-serif] text-xl font-bold text-amber-900">
                  {NOTE_CONTENT.sections[1].heading}
                </h3>
              </div>

              <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                {NOTE_CONTENT.sections[1].points.map((pt, idx) => {
                  const isExample = pt.startsWith('Contoh:') || pt.startsWith('Maksud:');
                  return (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 ${
                        isExample
                          ? 'bg-white/90 p-2.5 rounded-xl border border-amber-200 font-medium'
                          : ''
                      }`}
                    >
                      <span className="text-amber-500 text-base mt-0.5">•</span>
                      <span>
                        {pt.startsWith('Contoh:') ? (
                          <>
                            Contoh: <strong className="text-amber-800 font-bold">{pt.replace('Contoh: ', '')}</strong>
                          </>
                        ) : pt.startsWith('Maksud:') ? (
                          <>
                            Maksud: <strong className="text-emerald-700 font-bold">{pt.replace('Maksud: ', '')}</strong>
                          </>
                        ) : (
                          pt
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Quick Tip Footer Box */}
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-xs sm:text-sm text-emerald-900 font-semibold">
              Petua Pintar: Simpulan bahasa lebih ringkas (biasanya 2 patah perkataan), manakala peribahasa lebih panjang dan mengandungi nasihat atau perbandingan!
            </p>
          </div>
        </div>

        {/* Notebook Footer with Back Button */}
        <div className="bg-slate-100 px-6 py-4 border-t-2 border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Doraemon</span>
            <span>·</span>
            <span>Nobita</span>
            <span>·</span>
            <span>Shizuka</span>
            <span>·</span>
            <span>Gian</span>
            <span>·</span>
            <span>Suneo</span>
          </div>

          <button
            onClick={handleClose}
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-['Fredoka',sans-serif] font-bold text-base shadow-md border-b-4 border-amber-600 transition-all flex items-center gap-2"
          >
            {returnToLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
