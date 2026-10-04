import React from 'react';

export type CharacterType = 'doraemon' | 'nobita' | 'shizuka' | 'gian' | 'suneo';

interface CharacterAvatarProps {
  character: CharacterType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'happy' | 'neutral' | 'cheering' | 'thinking';
  className?: string;
  animate?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  character,
  size = 'md',
  expression = 'happy',
  className = '',
  animate = false,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  }[size];

  const animationClass = animate
    ? expression === 'cheering'
      ? 'animate-bounce'
      : expression === 'thinking'
      ? 'animate-pulse'
      : 'hover:scale-105 transition-transform'
    : '';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses} ${animationClass} ${className}`}>
      {character === 'doraemon' && (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none">
          {/* Doraemon Head */}
          <circle cx="50" cy="50" r="44" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
          {/* White Face Mask */}
          <ellipse cx="50" cy="55" rx="36" ry="32" fill="#ffffff" />
          {/* Red Nose */}
          <circle cx="50" cy="45" r="7.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
          <circle cx="48" cy="43" r="2" fill="#ffffff" />
          {/* Vertical nose-mouth line */}
          <line x1="50" y1="52.5" x2="50" y2="72" stroke="#1e293b" strokeWidth="2" />
          {/* Big Smiling Mouth */}
          <path
            d={
              expression === 'cheering'
                ? "M24 64 Q50 90 76 64 Z"
                : "M26 64 Q50 82 74 64"
            }
            fill={expression === 'cheering' ? '#dc2626' : 'none'}
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {expression === 'cheering' && (
            <path d="M38 74 Q50 68 62 74 Q50 84 38 74 Z" fill="#fb923c" />
          )}
          {/* Whiskers */}
          <line x1="16" y1="50" x2="38" y2="52" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="58" x2="38" y2="58" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="66" x2="38" y2="64" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="84" y1="50" x2="62" y2="52" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="86" y1="58" x2="62" y2="58" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="84" y1="66" x2="62" y2="64" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          {/* Eyes */}
          <ellipse cx="41" cy="30" rx="9" ry="12" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <ellipse cx="59" cy="30" rx="9" ry="12" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          {/* Pupils */}
          {expression === 'cheering' ? (
            <>
              {/* Joyful crescent eyes */}
              <path d="M35 32 Q41 24 47 32" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M53 32 Q59 24 65 32" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="43" cy="32" r="3.5" fill="#1e293b" />
              <circle cx="44" cy="31" r="1.2" fill="#ffffff" />
              <circle cx="57" cy="32" r="3.5" fill="#1e293b" />
              <circle cx="58" cy="31" r="1.2" fill="#ffffff" />
            </>
          )}
          {/* Red Collar & Golden Bell */}
          <path d="M26 86 Q50 94 74 86" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" />
          <circle cx="50" cy="91" r="7" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
          <line x1="44" y1="90" x2="56" y2="90" stroke="#713f12" strokeWidth="1.2" />
          <circle cx="50" cy="93" r="1.8" fill="#713f12" />
        </svg>
      )}

      {character === 'nobita' && (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none">
          {/* Yellow Shirt Collar Backdrop */}
          <path d="M22 84 Q50 98 78 84 L74 98 L26 98 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <path d="M42 85 L50 94 L58 85 Z" fill="#ffffff" />
          {/* Ears */}
          <circle cx="21" cy="52" r="7" fill="#fed7aa" stroke="#fb923c" strokeWidth="1.5" />
          <circle cx="79" cy="52" r="7" fill="#fed7aa" stroke="#fb923c" strokeWidth="1.5" />
          {/* Face */}
          <circle cx="50" cy="50" r="33" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
          {/* Black Bob Hair */}
          <path d="M18 45 C18 20, 82 20, 82 45 C78 30, 68 22, 50 22 C32 22, 22 30, 18 45 Z" fill="#1e293b" />
          <path d="M22 35 Q40 40 48 34 Q58 42 78 35 C70 20, 30 20, 22 35 Z" fill="#1e293b" />
          {/* Round Glasses */}
          <circle cx="37" cy="46" r="13" fill="#ffffff" fillOpacity="0.4" stroke="#334155" strokeWidth="3" />
          <circle cx="63" cy="46" r="13" fill="#ffffff" fillOpacity="0.4" stroke="#334155" strokeWidth="3" />
          <line x1="49" y1="46" x2="51" y2="46" stroke="#334155" strokeWidth="3" />
          {/* Eyes behind glasses */}
          {expression === 'cheering' ? (
            <>
              <path d="M31 46 Q37 40 43 46" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M57 46 Q63 40 69 46" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="37" cy="46" r="3.2" fill="#1e293b" />
              <circle cx="63" cy="46" r="3.2" fill="#1e293b" />
            </>
          )}
          {/* Nose and Smile */}
          <ellipse cx="50" cy="56" rx="2" ry="1.5" fill="#f97316" />
          <path
            d={expression === 'cheering' ? "M36 64 Q50 78 64 64 Z" : "M38 64 Q50 72 62 64"}
            fill={expression === 'cheering' ? '#ef4444' : 'none'}
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}

      {character === 'shizuka' && (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none">
          {/* Pink Dress Collar */}
          <path d="M24 85 Q50 96 76 85 L73 98 L27 98 Z" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
          {/* Pigtails with Pink Ribbons */}
          <path d="M12 40 C6 50, 10 68, 20 62 C18 52, 18 45, 12 40 Z" fill="#332421" />
          <ellipse cx="18" cy="46" rx="4" ry="6" fill="#f43f5e" />
          <path d="M88 40 C94 50, 90 68, 80 62 C82 52, 82 45, 88 40 Z" fill="#332421" />
          <ellipse cx="82" cy="46" rx="4" ry="6" fill="#f43f5e" />
          {/* Face */}
          <circle cx="50" cy="52" r="30" fill="#fef08a" fillOpacity="0.4" stroke="#f472b6" strokeWidth="1.5" />
          <circle cx="50" cy="52" r="29" fill="#ffedd5" />
          {/* Hair Front and Bangs */}
          <path d="M22 45 C22 22, 78 22, 78 45 C70 30, 60 26, 50 26 C40 26, 30 30, 22 45 Z" fill="#332421" />
          <path d="M28 36 Q38 42 46 36 Q56 42 72 36 C64 24, 36 24, 28 36 Z" fill="#332421" />
          {/* Cheeks Blush */}
          <circle cx="32" cy="58" r="4.5" fill="#fb7185" fillOpacity="0.5" />
          <circle cx="68" cy="58" r="4.5" fill="#fb7185" fillOpacity="0.5" />
          {/* Big Sparkling Eyes */}
          <ellipse cx="37" cy="48" rx="6" ry="8" fill="#1e293b" />
          <circle cx="35" cy="46" r="2.2" fill="#ffffff" />
          <circle cx="39" cy="51" r="1.2" fill="#ffffff" />
          <ellipse cx="63" cy="48" rx="6" ry="8" fill="#1e293b" />
          <circle cx="61" cy="46" r="2.2" fill="#ffffff" />
          <circle cx="65" cy="51" r="1.2" fill="#ffffff" />
          {/* Eyelashes */}
          <path d="M32 42 L29 39" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M68 42 L71 39" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
          {/* Sweet Smile */}
          <path
            d={expression === 'cheering' ? "M38 63 Q50 75 62 63 Z" : "M40 64 Q50 71 60 64"}
            fill={expression === 'cheering' ? '#f43f5e' : 'none'}
            stroke="#1e293b"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {character === 'gian' && (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none">
          {/* Orange Striped Shirt */}
          <path d="M16 82 Q50 96 84 82 L80 98 L20 98 Z" fill="#ea580c" stroke="#c2410c" strokeWidth="2" />
          <line x1="22" y1="88" x2="78" y2="88" stroke="#ffffff" strokeWidth="4" />
          {/* Face */}
          <circle cx="50" cy="48" r="34" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
          {/* Spiky Black Hair */}
          <path d="M18 42 C14 26, 32 16, 50 16 C68 16, 86 26, 82 42 C74 34, 66 32, 50 32 C34 32, 26 34, 18 42 Z" fill="#0f172a" />
          {/* Big Broad Nose */}
          <ellipse cx="50" cy="54" rx="7" ry="5.5" fill="#f97316" stroke="#ea580c" strokeWidth="1.2" />
          {/* Confident Eyes */}
          <circle cx="34" cy="44" r="3.8" fill="#0f172a" />
          <circle cx="66" cy="44" r="3.8" fill="#0f172a" />
          <path d="M28 38 L40 40" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 38 L60 40" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Big Hearty Smile */}
          <path
            d="M32 64 Q50 82 68 64 Z"
            fill="#b91c1c"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          <path d="M40 70 Q50 64 60 70 Q50 78 40 70 Z" fill="#fb923c" />
        </svg>
      )}

      {character === 'suneo' && (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md select-none">
          {/* Teal Shirt */}
          <path d="M20 84 Q50 96 80 84 L76 98 L24 98 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          {/* Face with Fox-like Chin */}
          <path d="M22 46 C22 28, 78 28, 78 46 C78 68, 62 76, 50 76 C38 76, 22 68, 22 46 Z" fill="#fed7aa" stroke="#0284c7" strokeWidth="1.8" />
          {/* Signature Three-Spike Hairstyle */}
          <path d="M20 40 C16 18, 44 14, 52 20 C62 10, 84 16, 88 32 C92 26, 96 36, 86 45 C78 30, 60 28, 50 28 C36 28, 26 32, 20 40 Z" fill="#1e293b" />
          {/* Sharp Eyes */}
          <path d="M30 46 Q38 41 44 47" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="46" r="2.8" fill="#0f172a" />
          <path d="M56 47 Q62 41 70 46" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="62" cy="46" r="2.8" fill="#0f172a" />
          {/* Pointy Nose */}
          <polygon points="50,48 53,55 47,55" fill="#f97316" />
          {/* Cheeky Smile */}
          <path
            d="M38 62 Q52 72 64 61"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};
