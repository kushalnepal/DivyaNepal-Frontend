/**
 * Generate a unique, natural-looking SVG pandit portrait illustration.
 * Uses the pandit's name as a seed for deterministic generation.
 */

interface PanditAvatarProps {
  name: string;
  size?: number;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const skinTones = [
  "#D2956A", "#C67B4F", "#E8B878", "#D4A36A", "#C48B5A",
  "#B87A4A", "#DAA56E", "#C8915A", "#D68E52", "#B57340"
];
const turbanColors = [
  "#FF9933", "#FF6B35", "#E8432A", "#C62828", "#7B1FA2",
  "#1565C0", "#00695C", "#4E342E", "#5D4037", "#FF9800"
];
const shirtColors = [
  "#F5F5F5", "#E8E0D0", "#FFF8E1", "#FBE9E7", "#E8F5E9",
  "#F3E5F5", "#E3F2FD", "#E0F2F1", "#FFF3E0", "#FCE4EC"
];
const clothColors = [
  "#FF9933", "#FDD835", "#F9A825", "#FF6F00", "#E65100",
  "#00695C", "#1565C0", "#4A148C", "#6D4C41", "#8E24AA"
];
const beardColors = [
  "#3E2723", "#4E342E", "#5D4037", "#6D4C41", "#795548",
  "#8D6E63", "#4A3728", "#3E2723"
];
const hairColors = [
  "#3E2723", "#4E342E", "#5D4037", "#1A1A1A", "#6D4C41"
];

export function PanditAvatar({ name, size = 200 }: PanditAvatarProps) {
  const seed = hashCode(name);
  const rand = seededRandom(seed);

  const skinTone = skinTones[Math.floor(rand() * skinTones.length)];
  const turbanColor = turbanColors[Math.floor(rand() * turbanColors.length)];
  const shirtColor = shirtColors[Math.floor(rand() * shirtColors.length)];
  const clothColor = clothColors[Math.floor(rand() * clothColors.length)];
  const beardColor = beardColors[Math.floor(rand() * beardColors.length)];
  const hairColor = hairColors[Math.floor(rand() * hairColors.length)];

  // Body proportions
  const headRadius = size * 0.22;
  const headY = size * 0.18;
  const centerX = size / 2;
  const turbanHeight = size * 0.25;
  const turbanTopY = headY - headRadius - turbanHeight * 0.6;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Skin gradient */}
        <radialGradient id={`skin-${seed}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={skinTone} stopOpacity="1" />
          <stop offset="100%" stopColor={skinTone} stopOpacity="0.9" />
        </radialGradient>
        {/* Turban gradient */}
        <linearGradient id={`turban-${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={turbanColor} />
          <stop offset="50%" stopColor={turbanColor} />
          <stop offset="100%" stopColor={turbanColor} stopOpacity="0.95" />
        </linearGradient>
        {/* Turban highlight */}
        <linearGradient id={`turban-hi-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Body shadow */}
        <radialGradient id={`body-${seed}`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={shirtColor} />
          <stop offset="100%" stopColor={shirtColor} stopOpacity="0.95" />
        </radialGradient>
        {/* Cloth/dhoti gradient */}
        <linearGradient id={`cloth-${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={clothColor} />
          <stop offset="100%" stopColor={clothColor} stopOpacity="0.85" />
        </linearGradient>
        {/* Skin shadow */}
        <radialGradient id={`face-shadow-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
        </radialGradient>
        {/* Mala beads */}
        <radialGradient id={`mala-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
        {/* Earrings */}
        <radialGradient id={`earring-${seed}`} cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
      </defs>

      <g>
        {/* === Background aura/glow === */}
        <circle
          cx={centerX}
          cy={size * 0.45}
          r={size * 0.48}
          fill={clothColor}
          opacity="0.08"
        />

        {/* === Body/Shirt === */}
        <path
          d={`M${centerX - size * 0.35},${size * 0.92} 
               Q${centerX - size * 0.2},${size * 0.55} 
               ${centerX - size * 0.12},${size * 0.42} 
               Q${centerX - size * 0.05},${headY + headRadius * 0.6} 
               ${centerX},${headY + headRadius * 0.8} 
               Q${centerX + size * 0.05},${size * 0.42} 
               ${centerX + size * 0.12},${size * 0.42} 
               Q${centerX + size * 0.2},${size * 0.55} 
               ${centerX + size * 0.35},${size * 0.92}Z`}
          fill={`url(#body-${seed})`}
        />

        {/* === Dhoti/Cloth draping === */}
        <path
          d={`M${centerX - size * 0.15},${size * 0.7} 
               Q${centerX},${size * 0.95} 
               ${centerX + size * 0.15},${size * 0.7}
               Q${centerX + size * 0.2},${size * 0.55}
               ${centerX + size * 0.15},${size * 0.65}
               Q${centerX},${size * 0.92}
               ${centerX - size * 0.15},${size * 0.65}
               Q${centerX - size * 0.2},${size * 0.55}
               Z`}
          fill={`url(#cloth-${seed})`}
          opacity="0.7"
        />

        {/* === Neck === */}
        <rect
          x={centerX - headRadius * 0.35}
          y={headY + headRadius * 0.65}
          width={headRadius * 0.7}
          height={headRadius * 0.4}
          rx={headRadius * 0.1}
          fill={skinTone}
        />

        {/* === Neck shadow lines === */}
        <path
          d={`M${centerX - headRadius * 0.3},${headY + headRadius * 0.7} 
               Q${centerX},${headY + headRadius * 0.9} 
               ${centerX + headRadius * 0.3},${headY + headRadius * 0.7}`}
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
        />

        {/* === Shoulders === */}
        <ellipse
          cx={centerX - size * 0.15}
          cy={size * 0.48}
          rx={size * 0.1}
          ry={size * 0.06}
          fill={shirtColor}
          transform={`rotate(-15, ${centerX - size * 0.15}, ${size * 0.48})`}
        />
        <ellipse
          cx={centerX + size * 0.15}
          cy={size * 0.48}
          rx={size * 0.1}
          ry={size * 0.06}
          fill={shirtColor}
          transform={`rotate(15, ${centerX + size * 0.15}, ${size * 0.48})`}
        />

        {/* === Arms === */}
        <path
          d={`M${centerX - size * 0.18},${size * 0.48} 
               Q${centerX - size * 0.28},${size * 0.62} 
               ${centerX - size * 0.25},${size * 0.82}
               Q${centerX - size * 0.23},${size * 0.88} 
               ${centerX - size * 0.18},${size * 0.9}`}
          stroke={shirtColor}
          strokeWidth={size * 0.06}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M${centerX + size * 0.18},${size * 0.48} 
               Q${centerX + size * 0.28},${size * 0.62} 
               ${centerX + size * 0.25},${size * 0.82}
               Q${centerX + size * 0.23},${size * 0.88} 
               ${centerX + size * 0.18},${size * 0.9}`}
          stroke={shirtColor}
          strokeWidth={size * 0.06}
          strokeLinecap="round"
          fill="none"
        />
        {/* Forearms (slightly darker) */}
        <path
          d={`M${centerX - size * 0.23},${size * 0.85} 
               Q${centerX - size * 0.22},${size * 0.88} 
               ${centerX - size * 0.2},${size * 0.92}
               Q${centerX - size * 0.18},${size * 0.9} 
               ${centerX - size * 0.19},${size * 0.86}`}
          stroke={shirtColor}
          strokeWidth={size * 0.045}
          strokeLinecap="round"
          fill={shirtColor}
          opacity="0.9"
        />
        <path
          d={`M${centerX + size * 0.23},${size * 0.85} 
               Q${centerX + size * 0.22},${size * 0.88} 
               ${centerX + size * 0.2},${size * 0.92}
               Q${centerX + size * 0.18},${size * 0.9} 
               ${centerX + size * 0.19},${size * 0.86}`}
          stroke={shirtColor}
          strokeWidth={size * 0.045}
          strokeLinecap="round"
          fill={shirtColor}
          opacity="0.9"
        />

        {/* === Head === */}
        <circle
          cx={centerX}
          cy={headY}
          r={headRadius}
          fill={skinTone}
        />

        {/* Head shadow */}
        <circle
          cx={centerX + 2}
          cy={headY + 3}
          r={headRadius}
          fill="url(#face-shadow-${seed})"
        />

        {/* === Ears === */}
        <ellipse
          cx={centerX - headRadius * 0.85}
          cy={headY + headRadius * 0.15}
          rx={headRadius * 0.18}
          ry={headRadius * 0.12}
          fill={skinTone}
        />
        <ellipse
          cx={centerX + headRadius * 0.85}
          cy={headY + headRadius * 0.15}
          rx={headRadius * 0.18}
          ry={headRadius * 0.12}
          fill={skinTone}
        />

        {/* Earring */}
        <circle
          cx={centerX - headRadius * 0.92}
          cy={headY + headRadius * 0.35}
          r={headRadius * 0.06}
          fill="url(#earring-${seed})"
        />

        {/* === Eyes === */}
        {/* Left eye */}
        <ellipse
          cx={centerX - headRadius * 0.35}
          cy={headY - headRadius * 0.05}
          rx={headRadius * 0.1}
          ry={headRadius * 0.06}
          fill="white"
        />
        <circle
          cx={centerX - headRadius * 0.35}
          cy={headY - headRadius * 0.05}
          r={headRadius * 0.05}
          fill={hairColor}
        />
        <circle
          cx={centerX - headRadius * 0.33}
          cy={headY - headRadius * 0.07}
          r={headRadius * 0.02}
          fill="white"
        />
        {/* Right eye */}
        <ellipse
          cx={centerX + headRadius * 0.35}
          cy={headY - headRadius * 0.05}
          rx={headRadius * 0.1}
          ry={headRadius * 0.06}
          fill="white"
        />
        <circle
          cx={centerX + headRadius * 0.35}
          cy={headY - headRadius * 0.05}
          r={headRadius * 0.05}
          fill={hairColor}
        />
        <circle
          cx={centerX + headRadius * 0.33}
          cy={headY - headRadius * 0.07}
          r={headRadius * 0.02}
          fill="white"
        />

        {/* === Eyebrows === */}
        <path
          d={`M${centerX - headRadius * 0.5},${headY - headRadius * 0.15} 
               Q${centerX - headRadius * 0.35},${headY - headRadius * 0.2} 
               ${centerX - headRadius * 0.18},${headY - headRadius * 0.13}`}
          stroke={beardColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M${centerX + headRadius * 0.5},${headY - headRadius * 0.15} 
               Q${centerX + headRadius * 0.35},${headY - headRadius * 0.2} 
               ${centerX + headRadius * 0.18},${headY - headRadius * 0.13}`}
          stroke={beardColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* === Nose === */}
        <path
          d={`M${centerX},${headY - headRadius * 0.05} 
               Q${centerX - headRadius * 0.06},${headY + headRadius * 0.08} 
               ${centerX - headRadius * 0.03},${headY + headRadius * 0.15}
               Q${centerX},${headY + headRadius * 0.18} 
               ${centerX + headRadius * 0.03},${headY + headRadius * 0.15}
               Q${centerX + headRadius * 0.06},${headY + headRadius * 0.08} 
               ${centerX},${headY - headRadius * 0.05}`}
          fill={skinTone}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="0.5"
        />

        {/* === Mustache === */}
        <path
          d={`M${centerX - headRadius * 0.2},${headY + headRadius * 0.12} 
               Q${centerX - headRadius * 0.1},${headY + headRadius * 0.18} 
               ${centerX},${headY + headRadius * 0.2}
               Q${centerX + headRadius * 0.1},${headY + headRadius * 0.18} 
               ${centerX + headRadius * 0.2},${headY + headRadius * 0.12}`}
          fill={beardColor}
          opacity="0.7"
          stroke="none"
        />

        {/* === Mouth === */}
        <path
          d={`M${centerX - headRadius * 0.12},${headY + headRadius * 0.2} 
               Q${centerX},${headY + headRadius * 0.25} 
               ${centerX + headRadius * 0.12},${headY + headRadius * 0.2}`}
          fill="none"
          stroke={beardColor}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* === Chin === */}
        <path
          d={`M${centerX - headRadius * 0.4},${headY + headRadius * 0.5} 
               Q${centerX},${headY + headRadius * 0.65} 
               ${centerX + headRadius * 0.4},${headY + headRadius * 0.5}`}
          fill="none"
          stroke={beardColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* === Hair (top/behind turban) === */}
        <ellipse
          cx={centerX}
          cy={headY - headRadius * 0.1}
          rx={headRadius * 0.85}
          ry={headRadius * 0.75}
          fill={hairColor}
        />

        {/* === Turban === */}
        {/* Main turban wrapping */}
        <path
          d={`M${centerX - headRadius * 0.9},${headY - headRadius * 0.2} 
Q${centerX},${turbanTopY - turbanHeight * 0.1} 
                ${centerX + headRadius * 0.9},${headY - headRadius * 0.2}
                Q${centerX + headRadius * 0.8},${headY - turbanHeight * 0.5} 
                Q${centerX},${turbanTopY - turbanHeight * 0.7}
               ${centerX - headRadius * 0.8},${headY - turbanHeight * 0.5}
               Z`}
          fill={`url(#turban-${seed})`}
        />

        {/* Turban top knot/bundle */}
        <circle
          cx={centerX}
          cy={turbanTopY - turbanHeight * 0.55}
          r={headRadius * 0.2}
          fill={turbanColor}
        />
        <circle
          cx={centerX}
          cy={turbanTopY - turbanHeight * 0.6}
          r={headRadius * 0.15}
          fill={`url(#turban-hi-${seed})`}
        />

        {/* Turban decorative jewel/pin */}
        <circle
          cx={centerX}
          cy={headY - turbanHeight * 0.3}
          r={headRadius * 0.06}
          fill="#FFD700"
          stroke="#B8860B"
          strokeWidth="0.5"
        />
        <circle
          cx={centerX}
          cy={headY - turbanHeight * 0.3}
          r={headRadius * 0.03}
          fill="#FF6F00"
        />

        {/* Turban folds decoration */}
        <path
          d={`M${centerX - headRadius * 0.8},${headY - headRadius * 0.15} 
               Q${centerX - headRadius * 0.4},${headY - turbanHeight * 0.4} 
               ${centerX},${headY - turbanHeight * 0.45}`}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <path
          d={`M${centerX + headRadius * 0.8},${headY - headRadius * 0.15} 
               Q${centerX + headRadius * 0.4},${headY - turbanHeight * 0.4} 
               ${centerX},${headY - turbanHeight * 0.45}`}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* === Mala Beads (necklace) === */}
        <circle
          cx={centerX - headRadius * 0.35}
          cy={headY + headRadius * 0.5}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX - headRadius * 0.22}
          cy={headY + headRadius * 0.55}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX - headRadius * 0.08}
          cy={headY + headRadius * 0.58}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX + headRadius * 0.08}
          cy={headY + headRadius * 0.58}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX + headRadius * 0.22}
          cy={headY + headRadius * 0.55}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX + headRadius * 0.35}
          cy={headY + headRadius * 0.5}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX - headRadius * 0.3}
          cy={headY + headRadius * 0.42}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX - headRadius * 0.1}
          cy={headY + headRadius * 0.4}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX + headRadius * 0.1}
          cy={headY + headRadius * 0.4}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />
        <circle
          cx={centerX + headRadius * 0.3}
          cy={headY + headRadius * 0.42}
          r={headRadius * 0.04}
          fill="url(#mala-${seed})"
        />

        {/* === Sacred thread (Janeu) === */}
        <path
          d={`M${centerX - headRadius * 0.2},${headY + headRadius * 0.35} 
               Q${centerX - headRadius * 0.15},${headY + headRadius * 0.75} 
               ${centerX - headRadius * 0.05},${headY + headRadius * 0.85}`}
          stroke="#C8B896"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M${centerX + headRadius * 0.2},${headY + headRadius * 0.35} 
               Q${centerX + headRadius * 0.15},${headY + headRadius * 0.75} 
               ${centerX + headRadius * 0.05},${headY + headRadius * 0.85}`}
          stroke="#C8B896"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}